import { Request, Response } from 'express';
import { ResponseApi } from '../types';
import { CreateAssessmentDto } from '../dtos';
import { prisma } from '../database/prisma.database';

export class AssementsService {
	public async create(
		createAssementDto: CreateAssessmentDto
	): Promise<ResponseApi> {
		const { title, description, grade, studentId } = createAssementDto;

		const studentsCreated = await prisma.assessment.create({
			data: {
				title,
				description,
				grade,
				studentId,
			},
		});

		return {
			success: true,
			code: 201,
			message: 'Avaliação criada com sucesso !',
			data: studentsCreated,
		};
	}
	public async findAll(): Promise<ResponseApi> {
		return {
			success: true,
			code: 200,
			message: 'Avaliação buscada com sucesso !',
		};
	}
	public async findOneById(): Promise<ResponseApi> {
		return {
			success: true,
			code: 200,
			message: 'Avaliação encontrada com sucesso !',
		};
	}
	public async update(): Promise<ResponseApi> {
		return {
			success: true,
			code: 200,
			message: 'Avaliação atualizada com sucesso !',
		};
	}
	public async remove(): Promise<ResponseApi> {
		return {
			success: true,
			code: 200,
			message: 'Avaliação deletada com sucesso !',
		};
	}
}
