import { StatusOffense, TypePriority } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class CreateCrimeMiddleware {
	public validateRequire(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const {
			status,
			dateOfOccurrence,
			caseNumber,
			priority,
			witnesses,
			motivation,
			criminalId,
		} = req.body;

		if (!status) {
			res.status(400).json({
				success: false,
				message: 'Passe o status da investigação do crime, por favor !!!',
			});
			return;
		}

		if (!dateOfOccurrence) {
			res.status(400).json({
				success: false,
				message: 'Passe a data da ocorrência do crime, por favor !!!',
			});
			return;
		}

		if (!caseNumber) {
			res.status(400).json({
				success: false,
				message: 'Passe o número do caso do crime, por favor !!!',
			});
			return;
		}

		if (!priority) {
			res.status(400).json({
				success: false,
				message: 'Passe a prioridade do crime, por favor !!!',
			});
			return;
		}

		if (!witnesses) {
			res.status(400).json({
				success: false,
				message: 'Passe as testemunhas do crime, por favor !!!',
			});
			return;
		}

		if (!motivation) {
			res.status(400).json({
				success: false,
				message: 'Passe a motivação do crime, por favor !!!',
			});
			return;
		}

		if (!criminalId) {
			res.status(400).json({
				success: false,
				message: 'Passe o identificador do criminoso, por favor !!!',
			});
			return;
		}

		next();
	}
	public validateType(req: Request, res: Response, next: NextFunction): void {
		const {
			status,
			dateOfOccurrence,
			caseNumber,
			priority,
			witnesses,
			motivation,
			criminalId,
		} = req.body;

		if (typeof status !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo status deve ser em formato de texto !!!',
			});
			return;
		}

		if (typeof dateOfOccurrence !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "status" deve ser em formato de texto !!!',
			});
			return;
		}

		if (typeof caseNumber !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "número de caso" deve ser em formato de texto !!!',
			});
			return;
		}

		if (typeof priority !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "prioridade" deve ser em formato de texto !!!',
			});
			return;
		}

		if (typeof witnesses !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "testemunha" deve ser em formato de texto !!!',
			});
			return;
		}

		if (typeof motivation !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "motivação" deve ser em formato de texto !!!',
			});
			return;
		}

		if (typeof criminalId !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "criminalId" deve ser em formato de texto !!!',
			});
			return;
		}

		next();
	}
	public validateData(req: Request, res: Response, next: NextFunction): void {
		const {
			status,
			dateOfOccurrence,
			caseNumber,
			priority,
			witnesses,
			motivation,
			criminalId,
		} = req.body;

		const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

		if (
			StatusOffense.Aguardando_investigar &&
			StatusOffense.Em_Andamento &&
			StatusOffense.Resolvido &&
			StatusOffense.Arquivado
		) {
			res.status(400).json({
				success: false,
				message:
					'O status da investigação deve ser "Aguardando_investigar", "Em_Andamento", "Resolvido" ou "Arquivado"',
			});
			return;
		}

		if (!datePattern.test(dateOfOccurrence)) {
			res.status(400).json({
				success: false,
				message:
					'A data da ocorrência deve estar em formato de data com YYYY-MM-DDT00:00:00Z',
			});
			return;
		}

		next();
	}
}
