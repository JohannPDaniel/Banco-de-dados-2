import { Request, Response } from 'express';
import { CreateCriminalDto, updateCriminalDto } from '../dtos';
import { CriminalService } from '../services/criminal.service';

export class CriminalController {
	public static async create(req: Request, res: Response): Promise<void> {
		try {
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

			const data: CreateCriminalDto = {
				name,
				dateOfBirth: new Date(`${dateOfBirth}T00:00:00.000Z`),
				cpf,
				rg,
				criminalRecord,
				nationality,
				gender,
				address,
				recidivist,
			};

			const service = new CriminalService();
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
			const { name, gender } = req.query;

			const service = new CriminalService();

			const result = await service.findAll({
				name: name as string,
				gender: gender as string,
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

			const service = new CriminalService();
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
			const { name, dateOfBirth, nationality, gender, address, recidivist } =
				req.body;

			const service = new CriminalService();
			const result = await service.update(id, {
				name,
				dateOfBirth,
				nationality,
				gender,
				address,
				recidivist,
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

	public static async remove(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			const service = new CriminalService()
			const result = await service.remove(id)

			const {code, ...response} = result

			res.status(code).json(response)
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
}
