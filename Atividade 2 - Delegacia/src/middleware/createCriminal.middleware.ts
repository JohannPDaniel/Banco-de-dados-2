import { NextFunction, Request, Response } from 'express';

export class createCriminalMiddleware {
	public static validateRequired(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const {
			name,
			dateOfBirth,
			cpf,
			rg,
			criminalRecord,
			nationality,
			recidivist,
		} = req.body;

		if (!name) {
			res.status(400).json({
				success: false,
				message: 'Passe o nome por favor !!!',
			});
			return;
		}

		if (!dateOfBirth) {
			res.status(400).json({
				success: false,
				message: 'Passe a data de nascimento por favor !!!',
			});
			return;
		}

		if (!cpf) {
			res.status(400).json({
				success: false,
				message: 'Passe o cpf por favor !!!',
			});
			return;
		}

		if (!rg) {
			res.status(400).json({
				success: false,
				message: 'Passe o rg por favor !!!',
			});
			return;
		}

		if (!criminalRecord) {
			res.status(400).json({
				success: false,
				message: 'Passe o registro criminal por favor !!!',
			});
			return;
		}

		if (!nationality) {
			res.status(400).json({
				success: false,
				message: 'Passe a nacionalidade por favor !!!',
			});
			return;
		}

		if (recidivist === undefined) {
			res.status(400).json({
				success: false,
				message: 'Passe o reincidente por favor !!!',
			});
			return;
		}

		next();
	}

	public static validateTypes(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const {
			name,
			dateOfBirth,
			cpf,
			rg,
			criminalRecord,
			nationality,
			gender,
			address,
			recidivist,
		} = req.body;

		if (typeof name !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O nome deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (typeof dateOfBirth !== 'string') {
			res.status(400).json({
				success: false,
				message:
					'A data de nascimento deve ser enviada em formato de texto !!!',
			});
			return;
		}

		if (typeof cpf !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O cpf deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (typeof rg !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O rg deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (typeof criminalRecord !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O registro criminal deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (typeof nationality !== 'string') {
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

		if (typeof recidivist !== "boolean") {
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
		const {
			name,
			dateOfBirth,
			cpf,
			rg,
			criminalRecord,
			nationality,
			gender,
			address,
			recidivist,
		} = req.body;

		if (name.length < 3) {
			res.status(400).json({
				success: false,
				message: 'O nome precisa ter no minimo 3 caracteres !!!',
			});
			return;
		}

		if (
			isNaN(Date.parse(dateOfBirth)) ||
			!dateOfBirth.match(/^\d{4}-\d{2}-\d{2}$/)
		) {
			res.status(400).json({
				success: false,
				message: 'A data de nascimento deve estar no formato YYYY-MM-DD.',
			});
			return;
		}

		if (cpf.length !== 11) {
			res.status(400).json({
				success: false,
				message: 'O cpf precisa ter 11 caracteres !!!',
			});
			return;
		}

		if (rg.length !== 9) {
			res.status(400).json({
				success: false,
				message: 'O rg precisa ter 9 caracteres !!!',
			});
			return;
		}

		if (criminalRecord.length < 8 || criminalRecord.length > 12) {
			res.status(400).json({
				success: false,
				message: 'O registro criminal precisa ter entre 8 a 12 caracteres !!!',
			});
			return;
		}

		if (nationality.length < 5) {
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

		if (recidivist !== true && recidivist !== false) {
			res.status(400).json({
				success: false,
				message: 'O campo "recidivist" deve ser true ou false.',
			});
			return;
		}

		next();
	}
}
