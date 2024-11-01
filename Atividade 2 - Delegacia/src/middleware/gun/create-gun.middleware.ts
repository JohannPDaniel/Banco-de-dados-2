import { TypeCaliber, TypeGun, TypeState } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class CreateGunMiddleware {
	public static validateRequired(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { serialNumber, registrationCode, crimesId } = req.body;

		if (!serialNumber) {
			res.status(400).json({
				success: false,
				message: 'O atributo número de série é obrigatório !',
			});
			return;
		}

		if (!registrationCode) {
			res.status(400).json({
				success: false,
				message: 'O atributo codigo de registro é obrigatório !',
			});
			return;
		}

		if (!crimesId) {
			res.status(400).json({
				success: false,
				message: 'O atributo crimesId que é a Foreign Key é obrigatória !!!',
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
		const { serialNumber, registrationCode, type, caliber, state, crimesId } =
			req.body;

		if (typeof serialNumber !== 'string') {
			res.status(400).json({
				success: false,
				message: 'Número de série deve vir em formato de texto !',
			});
			return;
		}

		if (typeof registrationCode !== 'string') {
			res.status(400).json({
				success: false,
				message: 'Código de registro deve vir em formato de texto !',
			});
			return;
		}

		if (
			type &&
			type !== TypeGun.firearm &&
			type !== TypeGun.bladed_weapon &&
			type !== TypeGun.improvised_weapons &&
			type !== TypeGun.undefined
		) {
			res.status(400).json({
				success: false,
				message:
					'O Tipo da arma deve ser Armas de fogo, Armas Brancas, Armas Improvisadas ou indefinido caso não se saiba !',
			});
			return;
		}

		if (
			caliber &&
			caliber !== TypeCaliber.Nove_milimetros &&
			caliber !== TypeCaliber.Ponto_22 &&
			caliber !== TypeCaliber.Ponto_38 &&
			caliber !== TypeCaliber.undefined
		) {
			res.status(400).json({
				success: false,
				message:
					'O Calibre da arma deve ser Nove milimetros, ponto 22, ponto 38 ou undefined caso não se saiba ou seja outro tipo de calibre !',
			});
			return;
		}

		if (
			state &&
			state !== TypeState.confiscated &&
			state !== TypeState.in_possession
		) {
			res.status(400).json({
				success: false,
				message: 'O Tipo de estado deve ser confiscada ou em posse !',
			});
			return;
		}

		if (typeof crimesId !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O identificador do crime deve vir em formato de texto !',
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
		const { serialNumber, registrationCode, crimesId } = req.body;
        
		const uuidRegex =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

		if (serialNumber.length < 6 || serialNumber.length >= 13) {
			res.status(400).json({
				success: false,
				message: 'O número de série deve conter entre 6 a 12 números !',
			});
			return;
		}

		if (registrationCode.length < 6 || registrationCode.length >= 13) {
			res.status(400).json({
				success: false,
				message: 'O código de registro deve conter entre 6 a 12 números !',
			});
			return;
		}

		if (!uuidRegex.test(crimesId)) {
			res.status(400).json({
				success: false,
				message:
					'O atributo criminalId que é a Foreign Key precisa ser um UUID !!!',
			});
			return;
		}

		next();
	}
}
