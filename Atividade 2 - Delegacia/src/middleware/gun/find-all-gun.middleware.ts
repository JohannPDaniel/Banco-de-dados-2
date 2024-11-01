import { NextFunction, Request, Response } from 'express';

export class FindAllGunMiddleware {
	public static validateTypes(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { type, caliber, state } = req.query;

		if (type && typeof type !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo tipo da arma deve vir como um texto !',
			});
			return;
		}

		if (caliber && typeof caliber !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo tipo do calibre da arma deve vir como um texto !',
			});
			return;
		}

		if (state && typeof state !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo tipo de estado da arma deve vir como um texto !',
			});
			return;
		}

		next();
	}
}
