import { NextFunction, Request, Response } from 'express';

export class createAssementsMiddleware {
	public static validateRequired(
		request: Request,
		response: Response,
		next: NextFunction
	): void {
		const { title, grade } = request.body;

		if (!title) {
			response.status(400).json({
				success: false,
				message: 'Título é obrigatório !!!',
			});
		}

		if (!grade) {
			response.status(400).json({
				success: false,
				message: 'Nota é obrigatório !!!',
			});
		}

		next();
	}

	public static validateTypes(
		request: Request,
		response: Response,
		next: NextFunction
	): void {
		const { title, description, grade } = request.body;

		if (typeof title !== 'string') {
			response.status(400).json({
				success: false,
				message: 'O titulo deve ser um caracter !!!',
			});
		}

		if (description) {
			if (typeof description !== 'string') {
				response.status(400).json({
					success: false,
					message: 'A descrição deve ser um caracter !!!',
				});
			}
		}

		if (typeof grade !== 'number') {
			response.status(400).json({
				success: false,
				message: 'A nota deve ser um número',
			});
		}

		next();
	}
	public static validateData(
		request: Request,
		response: Response,
		next: NextFunction
	): void {
		const { title, description, grade } = request.body;

		if (title.length < 5) {
			response.status(400).json({
				success: false,
				message: 'O titulo deve ter pelo menos 5 caracteres',
			});
		}

		if (description) {
			if (description.length) {
				response.status(400).json({
					success: false,
					message: 'A descrição deve ter pelo menos 10 caracteres',
				});
			}
		}

		if (grade > 0 || grade < 10) {
			response.status(400).json({
				success: false,
				message:
					'A nota não deve ser negativa e também não pode ser maior que 10 !!!',
			});
		}
		next();
	}
}
