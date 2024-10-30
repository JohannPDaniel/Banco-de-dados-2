import { randomUUID } from 'crypto';
import { prisma } from '../database/prisma.database';
import { LoginDto } from '../dtos';
import { ResponseApi } from '../types';
import { Bcrypt } from '../utils/bcript';
import { Student } from '@prisma/client';

export class AuthService {
	public async login(data: LoginDto): Promise<ResponseApi> {
		const { email, password } = data;
		const student = await prisma.student.findUnique({
			where: { email: data.email },
		});

		if (!student) {
			return {
				success: false,
				code: 404,
				message: 'E-mail ou senha inconrretas (e-mail) !!! ',
			};
		}
		const hash = student.password;

		const bcrypt = new Bcrypt();

		const isValid = await bcrypt.verify(password, hash);

		if (!isValid) {
			return {
				success: false,
				code: 404,
				message: 'E-mail ou senha inconrretas (password) !!! ',
			};
		}

		const token = randomUUID();

		await prisma.student.update({
			where: { id: student.id },
			data: {
				authToken: token,
			},
		});

		return {
			success: true,
			code: 200,
			message: 'Login efetuado com sucesso !',
			data: { token },
		};
	}

	public async validateToken(token: string): Promise<Student | null> {
		const student = await prisma.student.findFirst({
			where: { authToken: token },
		});
		return student;
	}
}
