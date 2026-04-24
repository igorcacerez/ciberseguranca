const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// POST /player/register — cria ou recupera aluno pelo nome completo
router.post('/register', async (req, res) => {
  const { nome_completo } = req.body;

  if (!nome_completo || nome_completo.trim().length < 3) {
    return res.redirect('/?error=nome_invalido');
  }

  const nome = nome_completo.trim();

  try {
    const conn = await pool.getConnection();

    // Verifica se aluno já existe (case-insensitive)
    const [rows] = await conn.execute(
      'SELECT id FROM alunos WHERE LOWER(nome_completo) = LOWER(?)',
      [nome]
    );

    let alunoId;

    if (rows.length > 0) {
      alunoId = rows[0].id;
      // Atualiza última sessão
      await conn.execute(
        'UPDATE alunos SET ultima_sessao = NOW() WHERE id = ?',
        [alunoId]
      );
    } else {
      // Cria novo aluno
      const [result] = await conn.execute(
        'INSERT INTO alunos (nome_completo) VALUES (?)',
        [nome]
      );
      alunoId = result.insertId;

      // Cria registro de pontuação zerado
      await conn.execute(
        'INSERT INTO pontuacoes (aluno_id, pontuacao_total, missoes_concluidas) VALUES (?, 0, 0)',
        [alunoId]
      );
    }

    conn.release();

    req.session.alunoId = alunoId;
    req.session.nomeCompleto = nome;
    res.redirect('/game');

  } catch (err) {
    console.error('[register]', err);
    res.redirect('/?error=erro_servidor');
  }
});

// GET /player/profile — dados do perfil do aluno
router.get('/profile', async (req, res) => {
  if (!req.session.alunoId) return res.redirect('/');

  try {
    const conn = await pool.getConnection();

    const [aluno] = await conn.execute(
      `SELECT a.nome_completo, a.criado_em, a.ultima_sessao,
              COALESCE(p.pontuacao_total, 0) AS pontuacao_total,
              COALESCE(p.missoes_concluidas, 0) AS missoes_concluidas
       FROM alunos a
       LEFT JOIN pontuacoes p ON p.aluno_id = a.id
       WHERE a.id = ?`,
      [req.session.alunoId]
    );

    const [progresso] = await conn.execute(
      `SELECT pr.missao_id, pr.status, pr.pontos_obtidos, pr.perguntas_certas,
              pr.iniciada_em, pr.concluida_em, m.titulo, m.dificuldade, m.pontos_maximos
       FROM progresso pr
       JOIN missoes m ON m.id = pr.missao_id
       WHERE pr.aluno_id = ?
       ORDER BY pr.missao_id`,
      [req.session.alunoId]
    );

    const [historico] = await conn.execute(
      `SELECT t.missao_id, t.pergunta_id, t.resposta, t.correta,
              t.pontos_ganhos, t.data_tentativa, m.titulo
       FROM tentativas t
       JOIN missoes m ON m.id = t.missao_id
       WHERE t.aluno_id = ?
       ORDER BY t.data_tentativa DESC
       LIMIT 50`,
      [req.session.alunoId]
    );

    conn.release();

    res.render('profile', {
      aluno: aluno[0],
      progresso,
      historico,
      session: req.session
    });

  } catch (err) {
    console.error('[profile]', err);
    res.redirect('/game');
  }
});

// POST /player/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
