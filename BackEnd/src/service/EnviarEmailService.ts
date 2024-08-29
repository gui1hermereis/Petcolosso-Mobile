import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendRecoveryEmail(email: string, userCript: string) {
  const htmlContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
        }
        p {
          color: #555555;
        }
        .code {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Código de Recuperação de Senha</h1>
        <p>Olá,</p>
        <p>Seu código de recuperação é:</p>
        <p class="code">${userCript}</p>
        <p>Utilize este código para redefinir sua senha. Caso não tenha solicitado esta recuperação, desconsidere este e-mail.</p>
        <div class="footer">
          <p>Atenciosamente,</p>
          <p>Equipe de Suporte</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Código de Recuperação de Senha',
      html: htmlContent,
    });
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    throw new Error('Erro ao enviar o e-mail');
  }
}

transporter.verify((error, success) => {
  if (error) {
    console.error('Erro de conexão:', error);
  } else {
    console.log('Servidor pronto para enviar mensagens:', success);
  }
});