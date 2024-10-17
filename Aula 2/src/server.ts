import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
	response.status(200).json({
		success: true,
		message: 'Bem-vindo a aula 2',
	});
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta http://localhost:${port}`);
});
