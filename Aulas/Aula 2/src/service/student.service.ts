import { prisma } from '../database/prisma.database';
import { Student, Student as StudentPrisma } from '@prisma/client';
import { CreateStudentDto, StudentDto } from '../dtos';
import { ResponseApi } from '../types/response.type';

export class StudentService {
	public async create(createStudent: CreateStudentDto): Promise<ResponseApi> {
		try {
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
						message: 'Email já está em uso',
					};
				}

				if (student.cpf === cpf) {
					return {
						success: true,
						code: 409,
						message: 'Cpf já está em uso',
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
		} catch (error: any) {
			return {
				success: true,
				code: 500,
				message: `Erro do servidor: ${error.message}`,
			};
		}
	}

	private mapToDto(student: StudentPrisma): StudentDto {
        return {
            id: student.id,
            name: student.name,
            cpf: student.cpf,
            email: student.email,
            type: student.type,
            age: student.age
        }
    }
}
