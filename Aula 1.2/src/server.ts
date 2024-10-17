import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { repository } from './repository.prisma';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
	response.status(200).json({
		success: true,
		message: 'Bem-vindo a API',
	});
});

app.get('/users', async (request: Request, response: Response) => {
	const user = await repository.user.findMany();
	response.status(200).json({
		success: true,
		message: 'Mensagem enviada com sucesso',
		data: user,
	});
});

app.listen(port, () => {
	console.log(`Server running at port http://localhost:${port}`);
});
