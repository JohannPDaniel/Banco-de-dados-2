import { prisma } from '../database/prisma.database';
import { Student, Student as StudentPrisma } from '@prisma/client';
import { CreateStudentDto, QueryFilterDto, StudentDto } from '../dtos';
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
		console.log(query);

		const students = await prisma.student.findMany({
			where: { name: query.name },
		});

		return {
			success: true,
			code: 200,
			message: 'Estudantes buscados com sucesso !!!',
			data: students.map((student) => this.mapToDto(student)),
		};
	}

	private mapToDto(student: StudentPrisma): StudentDto {
		return {
			id: student.id,
			name: student.name,
			cpf: student.cpf,
			email: student.email,
			type: student.type,
			age: student.age,
		};
	}
}
