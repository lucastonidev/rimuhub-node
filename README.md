# RimuHub - Organizador de Listas

Um site para organizar uma lista colocando em categorias, integrado com Google Sheets.

## 🚀 Tecnologias

- **Node.js** com Express
- **EJS** para templates
- **Google Sheets Parser** para leitura de dados
- **SheetDB** para escrita de dados

## 📦 Instalação Local

```bash
npm install
npm start
```

Acesse `http://localhost:3000`

## 🌐 Deploy no Vercel

### Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Repositório no GitHub

### Passos para Deploy

1. **Fazer Push no GitHub:**
   ```bash
   git add .
   git commit -m "Preparar para Vercel"
   git push origin main
   ```

2. **Conectar ao Vercel:**
   - Acesse https://vercel.com/new
   - Selecione seu repositório
   - Clique em "Import"
   - Vercel detectará a configuração automaticamente

3. **Variáveis de Ambiente (se necessário):**
   - Vá para "Settings" → "Environment Variables"
   - Adicione qualquer variável necessária
   - Redeploy após adicionar variáveis

### Estrutura do Projeto para Vercel

```
rimuhub-node/
├── src/
│   ├── routes/
│   │   ├── api/
│   │   └── website/
│   └── server/
│       ├── app.js
│       └── server.js
├── views/
├── public/
├── package.json
└── vercel.json
```

## 📝 Notas

- O arquivo `vercel.json` configura o build e as rotas
- O arquivo `.vercelignore` especifica o que não fazer upload
- A porta é automaticamente atribuída pelo Vercel via `process.env.PORT`

## 🔗 Links Úteis

- [Documentação Vercel Node.js](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Express no Vercel](https://vercel.com/guides/using-express-with-vercel)
