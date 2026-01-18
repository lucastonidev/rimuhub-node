import app from "./app.js";
const PORT = 5500 || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});