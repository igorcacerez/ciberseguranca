-- ============================================================
-- Ethical Hacker Game - Schema do Banco de Dados
-- Execute este script no MySQL para criar ou atualizar banco e tabelas
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
-- Pontuacao total acumulada por aluno
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
-- Status de cada missao para cada aluno
-- ============================================================
CREATE TABLE IF NOT EXISTS progresso (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  aluno_id          INT UNSIGNED NOT NULL,
  missao_id         INT UNSIGNED NOT NULL,
  status            ENUM('nao_iniciada','em_andamento','concluida') DEFAULT 'nao_iniciada',
  pontos_obtidos    INT          DEFAULT 0,
  perguntas_certas  INT          DEFAULT 0,
  iniciada_em       DATETIME     NULL,
  concluida_em      DATETIME     NULL,
  UNIQUE KEY uq_aluno_missao (aluno_id, missao_id),
  FOREIGN KEY (aluno_id)  REFERENCES alunos(id)  ON DELETE CASCADE,
  FOREIGN KEY (missao_id) REFERENCES missoes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- DADOS INICIAIS: missoes
-- Reexecutavel: atualiza as missoes existentes pelo id e cria as novas.
-- ============================================================
INSERT INTO missoes (id, titulo, descricao, dificuldade, pontos_maximos, ordem) VALUES
(1, 'Senhas Vulneráveis', 'Identifique senhas fracas em um sistema fictício e analise logs de acesso suspeito.', 'Fácil', 100, 1),
(2, 'Detectando Phishing', 'Analise um e-mail suspeito e identifique todos os indicadores de phishing.', 'Fácil', 100, 2),
(3, 'Análise de Logs', 'Investigue logs de autenticação para detectar um ataque em andamento.', 'Médio', 150, 3),
(4, 'Permissões Incorretas', 'Audite e corrija permissões incorretas de arquivos em um servidor web.', 'Médio', 150, 4),
(5, 'Dados Sensíveis Expostos', 'Encontre credenciais e dados sensíveis expostos indevidamente na aplicação.', 'Médio', 150, 5),
(6, 'Força Bruta - Defesa', 'Responda a um ataque de credential stuffing em larga escala tomando decisões de defesa.', 'Difícil', 200, 6),
(7, 'DDoS - Mitigação', 'Analise e responda a um ataque DDoS volumétrico de 47 Gbps em tempo real.', 'Difícil', 200, 7),
(8, 'Autenticação Insegura', 'Realize code review de segurança em um sistema de login com múltiplas vulnerabilidades críticas.', 'Difícil', 200, 8),
(9, 'Firewall com iptables', 'Proteja um servidor Linux com regras de firewall e princípio do menor privilégio.', 'Médio', 200, 9),
(10, 'DNS e Certificado SSL', 'Configure DNS e HTTPS para publicar um site com certificado válido.', 'Médio', 200, 10),
(11, 'OSINT - Reconhecimento Passivo', 'Colete inteligência aberta antes de um pentest autorizado.', 'Médio', 150, 11),
(12, 'XSS - Cross-Site Scripting', 'Identifique e corrija injeção de scripts em aplicação web.', 'Médio', 150, 12),
(13, 'Operação Interpol - Takedown de Pirataria', 'Colete evidências e acione takedown legal contra servidor de pirataria.', 'Difícil', 250, 13),
(14, 'Firewall de Rede Corporativa', 'Crie uma política de firewall por zonas para uma rede corporativa.', 'Médio', 180, 14),
(15, 'Publicar Site com DNS e SSL', 'Deixe um site online configurando DNS, certificado SSL e redirect HTTPS.', 'Médio', 180, 15),
(16, 'Interpol: Takedown Legal', 'Derrube infraestrutura criminosa por vias legais, sem ataques.', 'Difícil', 220, 16),
(17, 'Interpol: Localização com Base Legal', 'Correlacione evidências para estimar jurisdição sem doxxing.', 'Difícil', 220, 17),
(18, 'Teste de Engenharia Social', 'Converse com funcionário simulado por IA em treinamento autorizado.', 'Difícil', 220, 18),
(19, 'Contrato e Escopo de Pentest', 'Revise autorização, regras de engajamento e limites legais.', 'Fácil', 150, 19),
(20, 'Reconhecimento Ético', 'Mapeie OSINT e superfície de ataque sem tocar agressivamente no alvo.', 'Médio', 180, 20),
(21, 'Gestão de Vulnerabilidades', 'Priorize vulnerabilidades por contexto, exposição e impacto real.', 'Médio', 180, 21),
(22, 'Relatório de Pentest', 'Comunique evidências, impacto e recomendações para times técnicos e gestores.', 'Médio', 180, 22),
(23, 'Código de Conduta do Hacker Ético', 'Feche a trilha com princípios profissionais de hacking ético.', 'Fácil', 150, 23)
ON DUPLICATE KEY UPDATE
  titulo = VALUES(titulo),
  descricao = VALUES(descricao),
  dificuldade = VALUES(dificuldade),
  pontos_maximos = VALUES(pontos_maximos),
  ordem = VALUES(ordem);
