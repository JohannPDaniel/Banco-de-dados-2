import { NextFunction, Request, Response } from 'express';

export class FindAllCriminalMiddleware {
	public static validateTypes(req: Request, res: Response, next: NextFunction) {
		const { name, gender } = req.query;

		if (name && typeof name !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O nome deve ser uma string',
			});
		}

		if (gender && typeof gender !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O genero deve ser uma string',
			});
		}

		next();
	}
}
