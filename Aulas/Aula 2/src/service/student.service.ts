import { prisma } from '../database/prisma.database';
import {
	Student as StudentPrisma,
	Assessment as AssessmentsPrisma,
} from '@prisma/client';

import {
	CreateStudentDto,
	QueryFilterDto,
	StudentDto,
	updateStudentDto,
} from '../dtos';
import { ResponseApi } from '../types';

export class StudentService {
	public async create(createStudent: CreateStudentDto): Promise<ResponseApi> {
		const { name, email, password, type, age, cpf } = createStudent;

		const student = await prisma.student.findFirst({
			where: {
				OR: [{ email }, { cpf }],
			},
		});

		if (student) {
			if (student.email === email) {
				return {
					success: true,
					code: 409,
					message: 'Email já está em uso !!!',
				};
			}

			if (student.cpf === cpf) {
				return {
					success: true,
					code: 409,
					message: 'Cpf já está em uso !!!',
				};
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

		return {
			success: true,
			code: 201,
			message: 'Estudante cadastrado com sucesso !',
			data: this.mapToDto(studentsCreated),
		};
	}

	public async findAll(query: QueryFilterDto): Promise<ResponseApi> {
		const { name, cpf } = query;

		const students = await prisma.student.findMany({
			where: {
				...(name && { name: { contains: name, mode: 'insensitive' } }),
				...(cpf && { cpf: { contains: cpf } }),
			},
		});

		return {
			success: true,
			code: 200,
			message: 'Estudantes buscados com sucesso !!!',
			data: students.map((student) => this.mapToDto(student)),
		};
	}

	public async findOneById(id: string): Promise<ResponseApi> {
		const student = await prisma.student.findUnique({
			where: { id },
			include: { assessments: true },
		});

		if (!student) {
			return {
				success: false,
				code: 404,
				message: 'Estudante não encontrado !!!',
			};
		}

		return {
			success: true,
			code: 200,
			message: 'Estudante encontrado!',
			data: this.mapToDto(student),
		};
	}

	public async update(id: string, updateStudentDto: updateStudentDto): Promise<ResponseApi> {
		const student = await prisma.student.findUnique({
			where: { id },
		});

		if (!student) {
			return {
				success: false,
				code: 404,
				message: 'Estudante não encontrado !',
			};
		}

		const studentUpdated = await prisma.student.update({
			where: { id },
			data: { ...updateStudentDto },
		});

		return {
			success: true,
			code: 200,
			message: 'Estudante atualizado com sucesso !',
			data: this.mapToDto(studentUpdated),
		};
	}

	public async remove(id: string): Promise<ResponseApi> {
		const student = await prisma.student.findUnique({
			where: { id },
		});

		// await prisma.assessment.deleteMany({
		// 	where: { studentId: id },
		// });

		if (!student) {
			return {
				success: false,
				code: 404,
				message: 'Estudante não encontrado !',
			};
		}

		const studentDeleted = await prisma.student.delete({
			where: { id },
		});

		return {
			success: true,
			code: 200,
			message: 'Estudante deletado com sucesso',
			data: this.mapToDto(studentDeleted),
		};
	}

	private mapToDto(
		student: StudentPrisma & { assessments?: AssessmentsPrisma[] }
	): StudentDto {
		return {
			id: student.id,
			name: student.name,
			cpf: student.cpf,
			email: student.email,
			type: student.type,
			age: student.age,
			assessments: student.assessments?.map((assessment) => ({
				id: assessment.id,
				title: assessment.title,
				grade: Number(assessment.grade),
				description: assessment?.description,
			})),
		};
	}
}
