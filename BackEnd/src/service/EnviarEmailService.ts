import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export async function sendRecoveryEmail(email: string, userCript: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to: email,
      subject: 'Código de Recuperação de Senha',
      text: `Seu código de recuperação é: ${userCript}`,
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
