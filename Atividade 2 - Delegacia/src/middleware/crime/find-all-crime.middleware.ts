import { NextFunction, Request, Response } from "express";

export class FindAllCrimeMiddleware {
	public static validateTypes(req: Request, res: Response, next: NextFunction) {
		const { caseNumber } = req.query;

		if (caseNumber && typeof caseNumber !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo numero do caso deve ser passado como um texto !!!',
			});
		}

		next();
	}
}
