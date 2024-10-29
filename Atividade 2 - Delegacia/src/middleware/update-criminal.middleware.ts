import { NextFunction, Request, Response } from 'express';

export class UpdateCriminalMiddleware {
	public static validateTypes(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { name, dateOfBirth, nationality, gender, address, recidivist } =
			req.body;

		if (name && typeof name !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O nome deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (dateOfBirth && typeof dateOfBirth !== 'string') {
			res.status(400).json({
				success: false,
				message:
					'A data de nascimento deve ser enviada em formato de texto !!!',
			});
			return;
		}

		if (nationality && typeof nationality !== 'string') {
			res.status(400).json({
				success: false,
				message: 'A nacionalidade deve ser enviada em formato de texto !!!',
			});
			return;
		}

		if (gender && typeof gender !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O genero deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (address && typeof address !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O endereço deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (recidivist && typeof recidivist !== 'boolean') {
			res.status(400).json({
				success: false,
				message: 'Reincidente deve ser true ou false !!!',
			});
			return;
		}

		next();
	}

	public static validateData(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { name, dateOfBirth, nationality, gender, address, recidivist } =
			req.body;

		if (name && name.length < 3) {
			res.status(400).json({
				success: false,
				message: 'O nome deve ter pelo menos 3 caracteres',
			});
			return;
		}

		if (
			(dateOfBirth && isNaN(Date.parse(dateOfBirth))) 
		) {
			res.status(400).json({
				success: false,
				message: 'A data de nascimento deve estar no formato YYYY-MM-DD.',
			});
			return;
		}

		

		if (nationality && nationality.length < 5) {
			res.status(400).json({
				success: false,
				message: 'A nacionalidade precisa ter no minimo 5 caracteres !!!',
			});
			return;
		}

		if (gender && gender.length < 4) {
			res.status(400).json({
				success: false,
				message: 'O genero precisa ter no minimo 5 caracteres !!!',
			});
			return;
		}

		if (address && address.length < 8) {
			res.status(400).json({
				success: false,
				message: 'O endereço precisa ter no minimo 8 caracteres !!!',
			});
			return;
		}

		if (recidivist && recidivist !== true && recidivist !== false) {
			res.status(400).json({
				success: false,
				message: 'O campo "recidivist" deve ser true ou false.',
			});
			return;
		}
		next();
	}	
}
