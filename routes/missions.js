const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const missionsData = require('../data/missions-data');

// Middleware de autenticação
function requireAuth(req, res, next) {
  if (!req.session.alunoId) return res.redirect('/');
  next();
}

// GET /mission/:id — carrega a missão
router.get('/:id', requireAuth, async (req, res) => {
  const missaoId = parseInt(req.params.id);
  const missao = missionsData.find(m => m.id === missaoId);

  if (!missao) return res.redirect('/game');

  try {
    const conn = await pool.getConnection();

    // Busca ou cria registro de progresso
    const [prog] = await conn.execute(
      'SELECT * FROM progresso WHERE aluno_id = ? AND missao_id = ?',
      [req.session.alunoId, missaoId]
    );

    if (prog.length === 0) {
      await conn.execute(
        `INSERT INTO progresso (aluno_id, missao_id, status, iniciada_em)
         VALUES (?, ?, 'em_andamento', NOW())`,
        [req.session.alunoId, missaoId]
      );
    } else if (prog[0].status === 'nao_iniciada') {
      await conn.execute(
        `UPDATE progresso SET status = 'em_andamento', iniciada_em = NOW()
         WHERE aluno_id = ? AND missao_id = ?`,
        [req.session.alunoId, missaoId]
      );
    }

    // Busca respostas já dadas nesta missão
    const [tentativas] = await conn.execute(
      `SELECT pergunta_id, resposta, correta, pontos_ganhos
       FROM tentativas
       WHERE aluno_id = ? AND missao_id = ?`,
      [req.session.alunoId, missaoId]
    );

    conn.release();

    const respondidas = {};
    tentativas.forEach(t => {
      respondidas[t.pergunta_id] = {
        resposta: t.resposta,
        correta: t.correta,
        pontos: t.pontos_ganhos
      };
    });

    const allAnswered = missao.perguntas.every(p => respondidas[p.id] !== undefined);
    const progAtual = prog[0] || { status: 'em_andamento', pontos_obtidos: 0 };

    res.render('mission', {
      missao,
      respondidas,
      allAnswered,
      progresso: progAtual,
      session: req.session,
      totalMissoes: missionsData.length
    });

  } catch (err) {
    console.error('[mission GET]', err);
    res.redirect('/game');
  }
});

// POST /mission/:id/answer — submete uma resposta
router.post('/:id/answer', requireAuth, async (req, res) => {
  const missaoId = parseInt(req.params.id);
  const { pergunta_id, resposta } = req.body;
  const missao = missionsData.find(m => m.id === missaoId);

  if (!missao) return res.json({ error: 'Missão não encontrada' });

  const pergId = parseInt(pergunta_id);
  const pergunta = missao.perguntas.find(p => p.id === pergId);

  if (!pergunta) return res.json({ error: 'Pergunta não encontrada' });

  try {
    const conn = await pool.getConnection();

    // Verifica se já respondeu esta pergunta
    const [jaRespondeu] = await conn.execute(
      'SELECT id FROM tentativas WHERE aluno_id = ? AND missao_id = ? AND pergunta_id = ?',
      [req.session.alunoId, missaoId, pergId]
    );

    if (jaRespondeu.length > 0) {
      conn.release();
      return res.json({ error: 'Pergunta já respondida' });
    }

    const correta = resposta === pergunta.correta;
    const pontosGanhos = correta ? pergunta.pontos : -Math.floor(pergunta.pontos * 0.1);

    // Registra tentativa
    await conn.execute(
      `INSERT INTO tentativas (aluno_id, missao_id, pergunta_id, resposta, correta, pontos_ganhos)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.session.alunoId, missaoId, pergId, resposta, correta ? 1 : 0, Math.max(0, pontosGanhos)]
    );

    // Verifica se completou todas as perguntas
    const [total] = await conn.execute(
      'SELECT COUNT(*) as cnt FROM tentativas WHERE aluno_id = ? AND missao_id = ?',
      [req.session.alunoId, missaoId]
    );

    const totalRespondidas = total[0].cnt;
    const totalPerguntas = missao.perguntas.length;
    const missaoConcluida = totalRespondidas >= totalPerguntas;

    // Calcula pontos totais da missão
    const [pontosMissao] = await conn.execute(
      'SELECT SUM(pontos_ganhos) as total FROM tentativas WHERE aluno_id = ? AND missao_id = ?',
      [req.session.alunoId, missaoId]
    );

    const pontosAtuais = pontosMissao[0].total || 0;

    if (missaoConcluida) {
      // Marca missão como concluída
      await conn.execute(
        `UPDATE progresso SET status = 'concluida', pontos_obtidos = ?, perguntas_certas = ?,
         concluida_em = NOW()
         WHERE aluno_id = ? AND missao_id = ?`,
        [pontosAtuais, missao.perguntas.filter((p, i) => {
          return true; // será calculado abaixo
        }).length, req.session.alunoId, missaoId]
      );

      // Conta certas
      const [certas] = await conn.execute(
        'SELECT COUNT(*) as cnt FROM tentativas WHERE aluno_id = ? AND missao_id = ? AND correta = 1',
        [req.session.alunoId, missaoId]
      );

      await conn.execute(
        `UPDATE progresso SET perguntas_certas = ?, pontos_obtidos = ?
         WHERE aluno_id = ? AND missao_id = ?`,
        [certas[0].cnt, pontosAtuais, req.session.alunoId, missaoId]
      );

      // Atualiza pontuação total
      const [pontuacaoExiste] = await conn.execute(
        'SELECT id FROM pontuacoes WHERE aluno_id = ?',
        [req.session.alunoId]
      );

      if (pontuacaoExiste.length > 0) {
        await conn.execute(
          `UPDATE pontuacoes
           SET pontuacao_total = pontuacao_total + ?,
               missoes_concluidas = missoes_concluidas + 1
           WHERE aluno_id = ?`,
          [Math.max(0, pontosAtuais), req.session.alunoId]
        );
      } else {
        await conn.execute(
          'INSERT INTO pontuacoes (aluno_id, pontuacao_total, missoes_concluidas) VALUES (?, ?, 1)',
          [req.session.alunoId, Math.max(0, pontosAtuais)]
        );
      }
    }

    conn.release();

    res.json({
      correta,
      pontosGanhos: Math.max(0, pontosGanhos),
      feedback: correta ? pergunta.feedback_correto : pergunta.feedback_errado,
      missaoConcluida,
      pontosAtuais
    });

  } catch (err) {
    console.error('[mission answer]', err);
    res.json({ error: 'Erro interno do servidor' });
  }
});

// POST /mission/:id/chat — chat de engenharia social com IA
router.post('/:id/chat', requireAuth, async (req, res) => {
  const missaoId = parseInt(req.params.id);
  const missao = missionsData.find(m => m.id === missaoId);

  if (!missao || missao.tipo !== 'chat') {
    return res.json({ error: 'Missão de chat não encontrada' });
  }

  const { personagem, mensagem, historico } = req.body;
  if (!personagem || !mensagem) {
    return res.json({ error: 'Dados incompletos' });
  }

  const persona = missao.personas.find(p => p.id === personagem);
  if (!persona) return res.json({ error: 'Personagem não encontrado' });

  if (!persona.online) {
    return res.json({ resposta: `${persona.nome} está offline no momento.`, credencial_exposta: false });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Fallback sem OpenAI: respostas genéricas baseadas no nível
    const fallbacks = {
      muito_baixo: `Olá! Claro, como posso ajudar? Se precisar de acesso, pode me perguntar. 😊`,
      baixo: `Oi! Pode me falar mais sobre o problema? Quero resolver logo isso aqui.`,
      medio: `Olá. Preciso confirmar sua identidade antes de qualquer coisa. Pode abrir um ticket no sistema?`,
      alto: `Identifico que você está tentando obter informações de acesso via chat. Isso é contra nossa política de segurança e vou registrar este incidente. Acesso legítimo só via sistema de ticket.`
    };
    const resposta = fallbacks[persona.nivel] || fallbacks.medio;
    const credencial_exposta = false;
    return res.json({ resposta, credencial_exposta });
  }

  try {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey });

    const messages = [
      { role: 'system', content: persona.system_prompt },
      ...(Array.isArray(historico) ? historico.slice(-10) : []),
      { role: 'user', content: mensagem }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 250,
      temperature: 0.8
    });

    const resposta = completion.choices[0].message.content;

    const credencial_exposta = persona.palavras_chave_sucesso.some(kw =>
      resposta.toLowerCase().includes(kw.toLowerCase())
    );

    res.json({ resposta, credencial_exposta });

  } catch (err) {
    console.error('[chat OpenAI]', err.message);
    res.json({ error: 'Serviço de chat temporariamente indisponível. Verifique OPENAI_API_KEY no .env' });
  }
});

// GET /mission/:id/conclusion — retorna conclusão da missão
router.get('/:id/conclusion', requireAuth, (req, res) => {
  const missaoId = parseInt(req.params.id);
  const missao = missionsData.find(m => m.id === missaoId);
  if (!missao) return res.json({ error: 'Missão não encontrada' });
  res.json({ conclusao: missao.conclusao });
});

module.exports = router;
