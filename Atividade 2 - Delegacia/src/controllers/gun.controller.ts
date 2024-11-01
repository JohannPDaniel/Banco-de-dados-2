import { Request, Response } from 'express';
import { CreateGunDto } from '../dtos';
import { GunService } from '../services/gun.service';
import { TypeCaliber, TypeGun, TypeState } from '@prisma/client';

export class GunController {
	public static async create(req: Request, res: Response): Promise<void> {
		try {
			const { serialNumber, registrationCode, type, caliber, state, crimesId } =
				req.body;

			const data: CreateGunDto = {
				serialNumber,
				registrationCode,
				type,
				caliber,
				state,
				crimesId,
			};

			const service = new GunService();
			const result = await service.create(data);

			const { code, ...response } = result;
			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public static async findAll(req: Request, res: Response): Promise<void> {
		try {
			const { type, caliber, state } = req.query;

			const service = new GunService();
			const result = await service.findAll({
				type: type as TypeGun,
				caliber: caliber as TypeCaliber,
				state: state as TypeState,
			});

			const { code, ...response } = result;

			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public static async findOneById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			const service = new GunService();
			const result = await service.findOneById(id);

			const { code, ...response } = result;
			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public static async update(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const { type, caliber, state } = req.body;

			const service = new GunService();
			const result = await service.update(id, { type, caliber, state });

			const {code, ...response } = result

			res.status(code).json(response)
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public static async remove(req: Request, res: Response): Promise<void> {
		try {
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
}
