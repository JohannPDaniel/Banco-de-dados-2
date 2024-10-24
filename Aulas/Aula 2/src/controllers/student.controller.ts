import { Request, Response } from 'express';
import { StudentService } from '../service/student.service';
import { CreateStudentDto } from '../dtos';

export class StudentController {
	public static async create(req: Request, res: Response): Promise<void> {
		try {
			const { name, email, password, type, age, cpf } = req.body;

			const data: CreateStudentDto = {
				name,
				email,
				password,
				type,
				age,
				cpf,
			};
			const service = new StudentService();
			const result = await service.create(data);

			const { code, ...response } = result;

			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor: ${error.message}`,
			});
		}
	}

	public static async findAll(req: Request, res: Response): Promise<void> {
		try {
			const { name, cpf } = req.query;

			const service = new StudentService();
			const result = await service.findAll({
				name: name as string,
				cpf: cpf as string,
			});

			const { code, ...response } = result;

			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor: ${error.message}`,
			});
		}
	}
}
