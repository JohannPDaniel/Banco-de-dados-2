import { Request, Response } from 'express';

export class GunController {
	public async create(req: Request, res: Response): Promise<void> {
		try {
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public async findAll(req: Request, res: Response): Promise<void> {
		try {
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public async findOneById(req: Request, res: Response): Promise<void> {
		try {
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public async update(req: Request, res: Response): Promise<void> {
		try {
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
	public async remove(req: Request, res: Response): Promise<void> {
		try {
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: `Erro no servidor ${error.message}`,
			});
		}
	}
}
