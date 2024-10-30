import { Request, Response } from 'express';
import { CreateCrimeDto } from '../dtos';
import { CrimeService } from '../services/crime.service';

export class CrimeController {
	public static async create(req: Request, res: Response): Promise<void> {
		try {
			const {
				status,
				dateOfOccurrence,
				caseNumber,
				priority,
				witnesses,
				motivation,
				criminalId,
			} = req.body;

			const data: CreateCrimeDto = {
				status,
				dateOfOccurrence,
				caseNumber,
				priority,
				witnesses,
				motivation,
				criminalId,
			};

			const service = new CrimeService();
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
			const { caseNumber } = req.query;

			const service = new CrimeService();

			const result = await service.findAll(caseNumber as string);

			const { code, ...response } = result;

			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor: ${error.message}`,
			});
		}
	}
	public static async findOneById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			const service = new CrimeService();
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
			const { status, dateOfOccurrence, priority, witnesses, motivation } =
				req.body;

			const service = new CrimeService();
			const result = await service.update(id, {
				status,
				dateOfOccurrence,
				priority,
				witnesses,
				motivation,
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

			const service = new CrimeService();
			const result = await service.remove(id);

			const { code, ...response } = result;

			res.status(code).json(response);
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
}
