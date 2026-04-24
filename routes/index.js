const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const missionsData = require('../data/missions-data');

// GET / — página de login
router.get('/', (req, res) => {
  if (req.session.alunoId) return res.redirect('/game');
  const error = req.query.error;
  res.render('index', { error });
});

// GET /game — tela principal do jogo
router.get('/game', async (req, res) => {
  if (!req.session.alunoId) return res.redirect('/');

  try {
    const conn = await pool.getConnection();

    const [pontuacao] = await conn.execute(
      `SELECT COALESCE(pontuacao_total, 0) AS pontuacao_total,
              COALESCE(missoes_concluidas, 0) AS missoes_concluidas
       FROM pontuacoes WHERE aluno_id = ?`,
      [req.session.alunoId]
    );

    const [progresso] = await conn.execute(
      `SELECT missao_id, status, pontos_obtidos, perguntas_certas
       FROM progresso WHERE aluno_id = ?`,
      [req.session.alunoId]
    );

    conn.release();

    const progressoMap = {};
    progresso.forEach(p => { progressoMap[p.missao_id] = p; });

    const pts = pontuacao[0] || { pontuacao_total: 0, missoes_concluidas: 0 };

    res.render('game', {
      missoes: missionsData,
      progressoMap,
      pontuacaoTotal: pts.pontuacao_total,
      missoesConcluidas: pts.missoes_concluidas,
      session: req.session
    });

  } catch (err) {
    console.error('[game]', err);
    res.render('game', {
      missoes: missionsData,
      progressoMap: {},
      pontuacaoTotal: 0,
      missoesConcluidas: 0,
      session: req.session
    });
  }
});

// GET /leaderboard — placar
router.get('/leaderboard', async (req, res) => {
  if (!req.session.alunoId) return res.redirect('/');

  try {
    const conn = await pool.getConnection();

    const [ranking] = await conn.execute(
      `SELECT a.nome_completo,
              COALESCE(p.pontuacao_total, 0) AS pontuacao_total,
              COALESCE(p.missoes_concluidas, 0) AS missoes_concluidas,
              a.ultima_sessao
       FROM alunos a
       LEFT JOIN pontuacoes p ON p.aluno_id = a.id
       ORDER BY pontuacao_total DESC, missoes_concluidas DESC
       LIMIT 20`
    );

    conn.release();

    res.render('leaderboard', { ranking, session: req.session });

  } catch (err) {
    console.error('[leaderboard]', err);
    res.render('leaderboard', { ranking: [], session: req.session });
  }
});

module.exports = router;
