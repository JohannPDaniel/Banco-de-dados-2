import { Request, Response } from 'express';
import { prisma } from '../database/prisma.database';

export class StudentController {
	public static async create(request: Request, response: Response) {
		const { name, email, password, type, age, cpf } = request.body;

		const student = await prisma.student.findFirst({
			where: {
				OR: [{ email }, { cpf }],
			},
		});

		if (student) {
			if (student.email === email) {
				response.status(409).json({
					success: false,
					message: 'E-mail já está em uso',
				});
				return;
			}

			if (student.cpf === cpf) {
				response.status(409).json({
					success: false,
					message: 'CPF já está em uso',
				});
				return;
			}
		}

		const studentsCreated = await prisma.student.create({
			data: {
				name,
				email,
				password,
				age,
				cpf,
			},
		});

		response.status(201).json({
			success: true,
			message: 'Estudante cadastrado com sucesso !',
			data: studentsCreated,
		});
	}
}
