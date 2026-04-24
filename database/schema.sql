-- ============================================================
-- Ethical Hacker Game — Schema do Banco de Dados
-- Execute este script no MySQL para criar o banco e tabelas
-- ============================================================

CREATE DATABASE IF NOT EXISTS ethical_hacker_game
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ethical_hacker_game;

-- ============================================================
-- TABELA: alunos
-- ============================================================
CREATE TABLE IF NOT EXISTS alunos (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome_completo   VARCHAR(255) NOT NULL,
  criado_em       DATETIME     DEFAULT CURRENT_TIMESTAMP,
  ultima_sessao   DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nome  (nome_completo)
) ENGINE=InnoDB;

-- ============================================================
-- TABELA: missoes
-- ============================================================
CREATE TABLE IF NOT EXISTS missoes (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo          VARCHAR(255) NOT NULL,
  descricao       TEXT,
  dificuldade     ENUM('Fácil','Médio','Difícil') DEFAULT 'Fácil',
  pontos_maximos  INT          DEFAULT 100,
  ordem           INT          DEFAULT 0
) ENGINE=InnoDB;

-- ============================================================
-- TABELA: tentativas
-- Registra cada resposta do aluno para cada pergunta
-- ============================================================
CREATE TABLE IF NOT EXISTS tentativas (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  aluno_id        INT UNSIGNED NOT NULL,
  missao_id       INT UNSIGNED NOT NULL,
  pergunta_id     INT          NOT NULL,
  resposta        VARCHAR(10)  NOT NULL,
  correta         TINYINT(1)   DEFAULT 0,
  pontos_ganhos   INT          DEFAULT 0,
  data_tentativa  DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id)  REFERENCES alunos(id)  ON DELETE CASCADE,
  FOREIGN KEY (missao_id) REFERENCES missoes(id) ON DELETE CASCADE,
  INDEX idx_aluno_missao (aluno_id, missao_id)
) ENGINE=InnoDB;

-- ============================================================
-- TABELA: pontuacoes
-- Pontuação total acumulada por aluno
-- ============================================================
CREATE TABLE IF NOT EXISTS pontuacoes (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  aluno_id            INT UNSIGNED NOT NULL UNIQUE,
  pontuacao_total     INT          DEFAULT 0,
  missoes_concluidas  INT          DEFAULT 0,
  ultima_atualizacao  DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- TABELA: progresso
-- Status de cada missão para cada aluno
-- ============================================================
CREATE TABLE IF NOT EXISTS progresso (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  aluno_id        INT UNSIGNED NOT NULL,
  missao_id       INT UNSIGNED NOT NULL,
  status          ENUM('nao_iniciada','em_andamento','concluida') DEFAULT 'nao_iniciada',
  pontos_obtidos  INT          DEFAULT 0,
  perguntas_certas INT         DEFAULT 0,
  iniciada_em     DATETIME     NULL,
  concluida_em    DATETIME     NULL,
  UNIQUE KEY uq_aluno_missao (aluno_id, missao_id),
  FOREIGN KEY (aluno_id)  REFERENCES alunos(id)  ON DELETE CASCADE,
  FOREIGN KEY (missao_id) REFERENCES missoes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- DADOS INICIAIS: missões
-- ============================================================
INSERT INTO missoes (titulo, descricao, dificuldade, pontos_maximos, ordem) VALUES
('Senhas Vulneráveis',    'Identifique senhas fracas em um sistema fictício e analise logs de acesso suspeito.',               'Fácil',  100, 1),
('Detectando Phishing',   'Analise um e-mail suspeito e identifique todos os indicadores de phishing.',                        'Fácil',  100, 2),
('Análise de Logs',       'Investigue logs de autenticação para detectar um ataque em andamento.',                             'Médio',  150, 3),
('Permissões Incorretas', 'Audite e corrija permissões incorretas de arquivos em um servidor web.',                            'Médio',  150, 4),
('Dados Sensíveis Expostos', 'Encontre credenciais e dados sensíveis expostos indevidamente na aplicação.',                   'Médio',  150, 5),
('Força Bruta — Defesa',  'Responda a um ataque de credential stuffing em larga escala tomando decisões de defesa.',           'Difícil',200, 6),
('DDoS — Mitigação',      'Analise e responda a um ataque DDoS volumétrico de 47 Gbps em tempo real.',                       'Difícil',200, 7),
('Autenticação Insegura', 'Realize code review de segurança em um sistema de login com múltiplas vulnerabilidades críticas.',  'Difícil',200, 8);
