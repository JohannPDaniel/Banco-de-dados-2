import { TypeCaliber, TypeGun, TypeState } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class UpdateGunMiddleware {
	public static validateTypes(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { type, caliber, state } = req.body;

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

		next();
	}

}
