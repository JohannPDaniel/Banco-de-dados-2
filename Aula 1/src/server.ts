import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { repository } from './repository.prisma';

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
	response.status(200).json({ message: 'Bem-vindo a API do Johann 🚀' });
});

app.get('/alunos', async (request: Request, response: Response) => {
	const alunos = await repository.aluno.findMany();

	response
		.status(200)
		.json({
			success: true,
			message: 'alunos buscados com sucesso',
			data: alunos,
		});
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta http://localhost:${port} 🚀`);
});
