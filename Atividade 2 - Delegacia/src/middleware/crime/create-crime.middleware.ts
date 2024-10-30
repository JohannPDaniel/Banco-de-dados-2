import { StatusOffense, TypePriority } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ValidateUuidMiddleware } from '../validate-uuid.middleware';

export class CreateCrimeMiddleware {
	public static validateRequire(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { status, dateOfOccurrence, caseNumber, priority, criminalId } =
			req.body;

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

		if (!criminalId) {
			res.status(400).json({
				success: false,
				message: 'Passe o identificador do criminoso, por favor !!!',
			});
			return;
		}

		next();
	}
	public static validateType(
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

		if (witnesses && typeof witnesses !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O atributo "testemunha" deve ser em formato de texto !!!',
			});
			return;
		}

		if (motivation && typeof motivation !== 'string') {
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
	public static validateData(
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

		const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|)$/;
		const uuidRegex =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

		if (
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

		if (!datePattern.test(dateOfOccurrence)) {
			res.status(400).json({
				success: false,
				message:
					'O atributo data da ocorrência deve estar em formato de data com YYYY-MM-DDT00:00:00Z',
			});
			return;
		}

		if (caseNumber.length < 6 || caseNumber.length >= 13) {
			res.status(400).json({
				success: false,
				message:
					'O atributo número de caso deve conter entre 6 e 12 caracteres !!!',
			});
			return;
		}

		if (
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

		if (!uuidRegex.test(criminalId)) {
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
