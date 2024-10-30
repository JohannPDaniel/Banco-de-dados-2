import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../service';

export class AuthMiddleware {
	public static async validate(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const token = req.headers.authorization;

		if (!token) {
			res.status(401).json({
				success: false,
				message: 'Token não autenticado !',
			});
			return;
		}

		const service = new AuthService();
		const isValidStudent = await service.validateToken(token);

		if (!isValidStudent) {
			res.status(401).json({
				success: false,
				message: 'Estudante não autenticado !',
			});
			return;
		}

        req.body.student = isValidStudent;

		next();
	}
}
