# Ethical Hacker Game

Jogo educacional de Cibersegurança e Ethical Hacking, com interface de terminal Linux simulado.

## Objetivo

Simular um ambiente seguro e controlado onde o aluno assume o papel de um hacker ético,
identificando vulnerabilidades, analisando riscos e propondo correções em sistemas fictícios.
Nenhuma ação executada no jogo afeta sistemas reais — tudo é simulado.

## Tecnologias

- **Backend:** Node.js + Express
- **Templates:** EJS
- **Banco de dados:** MySQL 8
- **Frontend:** HTML5 + CSS3 + JavaScript (sem frameworks)
- **Sessões:** express-session
- **ORM/Driver:** mysql2

## Missões

| # | Título | Dificuldade | Pts |
|---|--------|-------------|-----|
| 1 | Senhas Vulneráveis | Fácil | 100 |
| 2 | Detectando Phishing | Fácil | 100 |
| 3 | Análise de Logs | Médio | 150 |
| 4 | Permissões Incorretas | Médio | 150 |
| 5 | Dados Sensíveis Expostos | Médio | 150 |
| 6 | Força Bruta — Defesa | Difícil | 200 |
| 7 | DDoS — Mitigação | Difícil | 200 |
| 8 | Autenticação Insegura | Difícil | 200 |

**Pontuação máxima total: 1.250 pontos**

## Pré-requisitos

- Node.js 18+
- MySQL 8+
- npm

## Instalação

### 1. Clonar / copiar o projeto

```
cd ethical-hacker-game
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco de dados MySQL

Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`):

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=ethical_hacker_game
DB_PORT=3306
SESSION_SECRET=uma_chave_aleatoria_longa_aqui
PORT=3000
```

### 4. Criar o banco de dados e tabelas

No MySQL, execute o script SQL:

```bash
mysql -u root -p < database/schema.sql
```

Ou manualmente no MySQL Workbench / DBeaver:
1. Abra o arquivo `database/schema.sql`
2. Execute o script completo

Isso criará:
- Banco de dados `ethical_hacker_game`
- Tabelas: `alunos`, `missoes`, `tentativas`, `pontuacoes`, `progresso`
- Dados iniciais: 8 missões prontas

### 5. Iniciar o servidor

```bash
# Produção
npm start

# Desenvolvimento (com auto-reload)
npm run dev
```

### 6. Acessar o jogo

Abra o navegador em: **http://localhost:3000**

## Estrutura do Projeto

```
ethical-hacker-game/
├── server.js               # Servidor Express principal
├── package.json
├── .env.example            # Template de configuração
├── config/
│   └── database.js         # Pool de conexão MySQL
├── routes/
│   ├── index.js            # Rotas principais (/, /game, /leaderboard)
│   ├── player.js           # Registro e perfil do jogador
│   └── missions.js         # Lógica das missões e respostas
├── data/
│   └── missions-data.js    # Conteúdo completo das 8 missões
├── database/
│   └── schema.sql          # Script de criação do banco
├── views/
│   ├── index.ejs           # Tela de login com animação de boot
│   ├── game.ejs            # Desktop principal
│   ├── mission.ejs         # Página de missão
│   ├── leaderboard.ejs     # Placar global
│   ├── profile.ejs         # Perfil do jogador
│   └── partials/
│       ├── terminal.ejs    # Componente terminal Linux
│       ├── email.ejs       # Componente cliente de e-mail
│       ├── browser.ejs     # Componente navegador simulado
│       └── conclusion.ejs  # Painel de conclusão/aprendizado
└── public/
    └── css/
        └── style.css       # Todos os estilos (tema dark)
```

## Como Jogar

1. Acesse http://localhost:3000
2. Informe seu **nome completo** — ele será salvo para registrar seu progresso
3. No Desktop, selecione uma missão pelo menu lateral ou pelos cards
4. Leia o **briefing** da missão
5. Use as ferramentas simuladas:
   - **Terminal:** digite comandos Linux para explorar o ambiente
   - **E-mail:** analise mensagens suspeitas de phishing
   - **Navegador:** inspecione código-fonte com vulnerabilidades
6. Responda às perguntas de análise
7. Receba **feedback educativo** a cada resposta
8. Ao concluir, leia a **Análise Final** com lições de segurança

## Comandos do Terminal Simulado

| Comando | Descrição |
|---------|-----------|
| `help` | Lista comandos disponíveis |
| `ls [dir]` | Lista arquivos e diretórios |
| `ls -la [dir]` | Listagem detalhada com permissões |
| `cd [dir]` | Navega para diretório |
| `cat [arquivo]` | Exibe conteúdo de arquivo |
| `grep [padrão] [arquivo]` | Busca padrão em arquivo |
| `pwd` | Mostra diretório atual |
| `whoami` | Mostra usuário atual |
| `clear` | Limpa o terminal |

> Comandos de ataque real (`nmap`, `ssh`, `ping`, `rm`) são bloqueados pelo sandbox.

## Banco de Dados — Tabelas

| Tabela | Descrição |
|--------|-----------|
| `alunos` | Cadastro dos jogadores |
| `missoes` | Catálogo das missões |
| `tentativas` | Cada resposta dada por cada aluno |
| `pontuacoes` | Pontuação total acumulada |
| `progresso` | Status de cada missão por aluno |

## Troubleshooting

**Erro de conexão MySQL:**
- Verifique se o serviço MySQL está ativo
- Confirme as credenciais no arquivo `.env`
- Execute o script `database/schema.sql` primeiro

**Porta 3000 em uso:**
- Mude `PORT=3001` no `.env`

**Sessão perdida ao reiniciar:**
- Normal — sessões são em memória. Informe o nome novamente.
