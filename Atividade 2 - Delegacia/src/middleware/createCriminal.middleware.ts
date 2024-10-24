import { NextFunction, Request, Response } from 'express';

export class createCriminalMiddleware {
	public static validateRequired(
		req: Request<
			ParamsDictionary,
			any,
			any,
			QueryString.ParsedQs,
			Record<string, any>
		>,
		res: Response<any, Record<string, any>>,
		next: NextFunction
	) {
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
			return res.status(400).json({
				success: false,
				message: 'Passe o nome por favor !!!',
			});
		}

		if (!dateOfBirth) {
			return res.status(400).json({
				success: false,
				message: 'Passe a data de nascimento por favor !!!',
			});
		}

		if (!cpf) {
			return res.status(400).json({
				success: false,
				message: 'Passe o cpf por favor !!!',
			});
		}

		if (!rg) {
			return res.status(400).json({
				success: false,
				message: 'Passe o rg por favor !!!',
			});
		}

		if (!criminalRecord) {
			return res.status(400).json({
				success: false,
				message: 'Passe o registro criminal por favor !!!',
			});
		}

		if (!nationality) {
			return res.status(400).json({
				success: false,
				message: 'Passe a nacionalidade por favor !!!',
			});
		}

		if (!recidivist) {
			return res.status(400).json({
				success: false,
				message: 'Passe a nacionalidade por favor !!!',
			});
		}

		return next();
	}
	public static validateTypes(
		req: Request,
		res: Response<any, Record<string, any>>,
		next: NextFunction
	) {
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
			return res.status(400).json({
				success: false,
				message: 'O nome deve ser enviado em formato de texto !!!',
			});
		}

		if (typeof dateOfBirth !== 'string') {
			return res.status(400).json({
				success: false,
				message:
					'A data de nascimento deve ser enviada em formato de texto !!!',
			});
		}

		if (typeof cpf !== 'string') {
			return res.status(400).json({
				success: false,
				message: 'O cpf deve ser enviado em formato de texto !!!',
			});
		}

		if (typeof rg !== 'string') {
			return res.status(400).json({
				success: false,
				message: 'O rg deve ser enviado em formato de texto !!!',
			});
		}

		if (typeof criminalRecord !== 'string') {
			return res.status(400).json({
				success: false,
				message: 'O registro criminal deve ser enviado em formato de texto !!!',
			});
		}

		if (typeof nationality !== 'string') {
			return res.status(400).json({
				success: false,
				message: 'O nacionalidade deve ser enviada em formato de texto !!!',
			});
		}

		if (gender) {
			if (typeof gender !== 'string') {
				return res.status(400).json({
					success: false,
					message: 'O genero deve ser enviado em formato de texto !!!',
				});
			}
			return;
		}

		if (address) {
			if (typeof address !== 'string') {
				return res.status(400).json({
					success: false,
					message: 'O endereço deve ser enviado em formato de texto !!!',
				});
			}
			return;
		}

		if (typeof recidivist !== 'string') {
			return res.status(400).json({
				success: false,
				message: 'Reincidente deve ser enviado em formato de texto !!!',
			});
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

		if (cpf.length < 11 && cpf.length >= 12) {
			res.status(400).json({
				success: false,
				message: 'O cpf precisa ter 11 caracteres !!!',
			});
			return;
		}

		if (rg.length < 9 && rg.length >= 10) {
			res.status(400).json({
				success: false,
				message: 'O cpf precisa ter 9 caracteres !!!',
			});
			return;
		}

		if (criminalRecord.length < 8 && criminalRecord.length >= 13) {
			res.status(400).json({
				success: false,
				message: 'O cpf precisa ter entre 8 a 12 caracteres !!!',
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

		if (gender.length < 5) {
			res.status(400).json({
				success: false,
				message: 'O genero precisa ter no minimo 5 caracteres !!!',
			});
			return;
		}

		if (address.length < 8) {
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
