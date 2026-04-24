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
];

module.exports = missionsData;
