import { Request, Response } from 'express';
import { prisma } from '../database/prisma.database';

export class AssementController {
	public static async create(request: Request, response: Response) {
		const { title, grade, studentId } = request.body;

		const assessmentCreated = await prisma.assessment.create({
			data: {
				title,
				grade,
				student: {
					connect: {
						id: studentId, 
					},
				},
			},
		});

		response.status(201).json({
			success: true,
			message: 'Avaliação cadastrada com sucesso!',
			data: assessmentCreated,
		});
	}
}
