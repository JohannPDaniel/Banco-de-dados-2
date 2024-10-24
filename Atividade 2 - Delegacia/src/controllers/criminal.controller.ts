import { Request, Response } from 'express';
import { CreateCriminalDto } from "../dtos";
import { CriminalService } from "../services/criminal.service";

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
				dateOfBirth,
				cpf,
				rg,
				criminalRecord,
				nationality,
				gender,
				address,
				recidivist
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
}
