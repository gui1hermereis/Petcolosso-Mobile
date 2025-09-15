# PetColosso Mobile
Aplicativo para gestão de serviço e compra de produtos para petshop.

## 🚀 Como Rodar o Projeto

## 1. Clone o repositório
```bash
git clone https://github.com/gui1hermereis/Petcolosso-Mobile.git
cd Petcolosso-Mobile
```

## 2. Crie o banco de dados
É necessário criar manualmente um banco de dados vazio no MySQL.

Crie o banco de dados executando o comando:
```bash
CREATE DATABASE petcolossomobile;
```

## 3. Configure as variáveis de ambiente .env
Crie um arquivo .env dentro da pasta API com o seguinte conteúdo:
```bash
DATABASE_URL="mysql://root:root@localhost:3306/petcolossomobile"
FOLDER="C:/ArquivosPetColosso" 
   
EMAIL_USER=seu_email # usado para envio de notificações
EMAIL_PASS=sua_senha_de_app
```

## 4. Backend
```bash
cd backend

npm install

npx prisma migrate dev # cria o schema no banco

yarn dev
```

## 5. Frontend
```bash
cd frontend

npm install

npm start
```

## 📬 Contato
Desenvolvido por Guilherme Reis 🚀