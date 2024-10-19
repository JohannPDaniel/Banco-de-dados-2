import { PrismaClient, StudentType } from '@prisma/client';
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000; // Defina uma porta padrão
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (_request: Request, response: Response) => {
	return response.status(200).json({
		success: true,
		message: 'Bem-vindo a aula 2 -- Academy API 🚀 --',
	});
});

app.post(
	'/students',
	async (request: Request, response: Response) => {
		try {
			const { name, email, password, type, cpf } = request.body;

			if (!name) {
				return response.status(400).json({
					success: false,
					message: 'Nome é obrigatório !!!',
				});
			}

			if (typeof name !== 'string') {
				return response.status(400).json({
					success: false,
					message: 'Nome deve ser uma string !!!',
				});
			}

			if (!email) {
				return response.status(400).json({
					success: false,
					message: 'E-mail é obrigatório !!!',
				});
			}

			if (typeof email !== 'string') {
				return response.status(400).json({
					success: false,
					message: 'Email deve ser uma string !!!',
				});
			}

			if (!email.includes('@') || !email.includes('.')) {
				return response.status(400).json({
					success: false,
					message: 'E-mail inválido',
				});
			}

			if (!password) {
				return response.status(400).json({
					success: false,
					message: 'Password é obrigatório !!!',
				});
			}

			if (typeof password !== 'string') {
				return response.status(400).json({
					success: false,
					message: 'Password deve ser uma string !!!',
				});
			}

			if (password.length < 4) {
				return response.status(400).json({
					success: false,
					message: 'Senha deve ter no mínimo 4 caracteres !!!',
				});
			}

			if (!type) {
				return response.status(400).json({
					success: false,
					message: 'Type é obrigatório !!!',
				});
			}

			if (typeof type !== 'string') {
				return response.status(400).json({
					success: false,
					message: 'Type deve ser uma string !!!',
				});
			}

			if (
				type !== StudentType.F &&
				type !== StudentType.M &&
				type !== StudentType.T
			) {
				return response.status(400).json({
					success: false,
					message: 'Type deve ser um dos valores: F, M ou T !!!',
				});
			}

			if (!cpf) {
				return response.status(400).json({
					success: false,
					message: 'CPF é obrigatório !!!',
				});
			}

			if (typeof cpf !== 'string') {
				return response.status(400).json({
					success: false,
					message: 'CPF deve ser uma string !!!',
				});
			}

			if (cpf.length < 11) {
				return response.status(400).json({
					success: false,
					message: 'CPF deve ter no mínimo 11 caracteres !!!',
				});
			}

			const existingStudent = await prisma.student.findUnique({
				where: { email },
			});

			if (existingStudent) {
				return response.status(400).json({
					success: false,
					message: 'E-mail já cadastrado !!!',
				});
			}

			const student = await prisma.student.create({
				data: {
					name,
					email,
					password,
					type,
					cpf,
				},
			});

			return response
				.status(201)
				.json({ success: true, message: 'Criado com sucesso', data: student });
		} catch (error) {
			console.error('Erro ao processar a requisição:', error);
			response.status(500).json({
				success: false,
				message: 'Erro interno do servidor',
			});
		}
	}
);

// Iniciar o servidor
app.listen(port, () => {
	console.log(`Servidor rodando na porta http://localhost:${port}`);
});
