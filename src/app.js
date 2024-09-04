import express from 'express';
import usuarioRouter from './routes/usuarioRoutes.js';
import produtoRouter from './routes/produtoRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRouter);
app.use('/api/produtos', produtoRouter);

app.get("/health", (req, res) => {
  res.status(200).json("message: ok");
});

export default app;
