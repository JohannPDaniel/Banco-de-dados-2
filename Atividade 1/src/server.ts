import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { repository } from './repository.prisma';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.get('/', (request: Request, response: Response) => {
	response.status(200).json({
		success: true,
		message: 'Bem-vindo a Atividade 1'
	});
	return;
});

app.get(
	'/atividade1',
	async (request: Request, response: Response) => {
		const user = await repository.user.findMany();

		response.status(200).json({
			success: true,
			message: 'Sistema de Compras criado com sucesso',
			data: user,
		});
	}
);

app.listen(port, () => {
	console.log(`Servidor rodando na porta http://localhost:${port}`);
});
