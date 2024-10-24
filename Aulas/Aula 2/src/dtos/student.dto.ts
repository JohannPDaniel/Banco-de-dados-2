import { StudentType } from '@prisma/client';

export interface CreateStudentDto {
	name: string;
	email: string;
	password: string;
	type: StudentType;
	age?: number;
	cpf: string;
}

export interface StudentDto {
	id: string;
	name: string;
	email: string;
	type: StudentType;
	age?: number | null;
	cpf: string;
}

export interface QueryFilterDto {
	name?: string;
	cpf?: string;
}
