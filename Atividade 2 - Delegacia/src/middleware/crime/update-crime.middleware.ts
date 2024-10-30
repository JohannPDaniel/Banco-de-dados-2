import { StatusOffense, TypePriority } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class UpdateCrimeMiddleware {
	public static validateTypes(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { status, dateOfOccurrence, priority, witnesses, motivation } =
			req.body;

		if (status && typeof status !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O nome deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (dateOfOccurrence && typeof dateOfOccurrence !== 'string') {
			res.status(400).json({
				success: false,
				message:
					'A data de nascimento deve ser enviada em formato de texto !!!',
			});
			return;
		}

		if (priority && typeof priority !== 'string') {
			res.status(400).json({
				success: false,
				message: 'A nacionalidade deve ser enviada em formato de texto !!!',
			});
			return;
		}

		if (witnesses && typeof witnesses !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O genero deve ser enviado em formato de texto !!!',
			});
			return;
		}

		if (motivation && typeof motivation !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O endereço deve ser enviado em formato de texto !!!',
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
		const { status, dateOfOccurrence, priority, witnesses, motivation } =
			req.body;

		const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|)$/;

		if (
			status &&
			status !== StatusOffense.Aguardando_investigar &&
			status !== StatusOffense.Em_Andamento &&
			status !== StatusOffense.Resolvido &&
			status !== StatusOffense.Arquivado
		) {
			res.status(400).json({
				success: false,
				message:
					'O atributo status da investigação deve ser "Aguardando_investigar" ou "Em_Andamento" ou "Resolvido" ou "Arquivado"',
			});
			return;
		}

		if (dateOfOccurrence && !datePattern.test(dateOfOccurrence)) {
			res.status(400).json({
				success: false,
				message:
					'O atributo data da ocorrência deve estar em formato de data com YYYY-MM-DDT00:00:00Z',
			});
			return;
		}

		if (
			priority &&
			priority !== TypePriority.baixa &&
			priority !== TypePriority.media &&
			priority !== TypePriority.alta
		) {
			res.status(400).json({
				success: false,
				message:
					'O atributo prioridade deve ser "baixa" ou "media" ou "alta" !!!',
			});
			return;
		}

		if (witnesses && witnesses.length < 5) {
			res.status(400).json({
				success: false,
				message: 'O atributo testemunha deve ter no minimo 5 caracteres !!!',
			});
			return;
		}

		if (motivation && motivation.length < 5) {
			res.status(400).json({
				success: false,
				message: 'O atributo motivação deve ter no minimo 5 caracteres !!!',
			});
			return;
		}

		next();
	}
}
