import { prisma } from '../database/prisma.database';
import {
	Crime as CrimePrisma,
	Criminal as CriminalPrisma,
} from '@prisma/client';
import {
	CreateCriminalDto,
	Crimes,
	CriminalDto,
	QueryFilterDto,
	updateCriminalDto,
} from '../dtos';
import { ResponseApi } from '../types/response.types';

export class CriminalService {
	public async create(createCriminal: CreateCriminalDto): Promise<ResponseApi> {
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
		} = createCriminal;

		const existingCriminal = await prisma.criminal.findFirst({
			where: {
				OR: [{ cpf }, { rg }, { criminalRecord }],
			},
		});

		if (existingCriminal) {
			if (existingCriminal.cpf === cpf) {
				return {
					success: false,
					code: 409,
					message: 'CPF já está em uso, utilize outro !!!',
				};
			}

			if (existingCriminal.rg === rg) {
				return {
					success: false,
					code: 409,
					message: 'RG já está em uso, utilize outro !!!',
				};
			}

			if (existingCriminal.criminalRecord === criminalRecord) {
				return {
					success: false,
					code: 409,
					message: 'Registro criminal já está em uso, utilize outro !!!',
				};
			}
		}

		const criminalCreated = await prisma.criminal.create({
			data: {
				name,
				dateOfBirth,
				cpf,
				rg,
				criminalRecord,
				nationality,
				gender,
				address,
				recidivist,
			},
		});

		return {
			success: true,
			code: 201,
			message: 'Criminoso cadastrado com sucesso !',
			data: this.mapToDto(criminalCreated),
		};
	}

	public async findAll(query: QueryFilterDto): Promise<ResponseApi> {
		const { name, gender } = query;

		const criminals = await prisma.criminal.findMany({
			where: {
				...(name && { name: { contains: name, mode: 'insensitive' } }),
				...(gender && { gender: { equals: gender, mode: 'insensitive' } }),
			},
		});

		return {
			success: true,
			code: 200,
			message: 'Criminosos buscados com sucesso !',
			data: criminals.map((criminal) => this.mapToDto(criminal)),
		};
	}

	public async findOneById(id: string): Promise<ResponseApi> {
		const criminals = await prisma.criminal.findUnique({
			where: { id },
			include: { Crime: true },
		});

		if (!criminals) {
			return {
				success: false,
				code: 404,
				message: 'Criminoso não encontrado !',
			};
		}

		return {
			success: true,
			code: 200,
			message: 'Criminoso encontrado com sucesso !',
			data: this.mapToDto(criminals),
		};
	}

	public async update(
		id: string,
		updateCriminalDto: updateCriminalDto
	): Promise<ResponseApi> {
		const criminals = await prisma.criminal.findUnique({
			where: { id },
		});

		if (!criminals) {
			return {
				success: false,
				code: 404,
				message: 'Criminoso não encontrado !',
			};
		}

		const criminalUpdated = await prisma.criminal.update({
			where: { id },
			data: { ...updateCriminalDto },
		});

		return {
			success: true,
			code: 200,
			message: 'Criminoso atualizado com sucesso !',
			data: this.mapToDto(criminalUpdated),
		};
	}

	public async remove(id: string): Promise<ResponseApi> {
		const criminalId = await prisma.criminal.findUnique({
			where: { id },
		});

		if (!criminalId) {
			return {
				success: false,
				code: 404,
				message: 'Identificador do criminoso não encontrado !',
			};
		}

		const criminalDeleted = await prisma.criminal.delete({
			where: { id },
		});

		return {
			success: true,
			code: 200,
			message: 'Criminoso deletado com sucesso !',
			data: this.mapToDto(criminalDeleted),
		};
	}
	private mapToDto(
		criminal: CriminalPrisma & { Crime?: CrimePrisma[] }
	): CriminalDto {
		return {
			id: criminal.id,
			name: criminal.name,
			dateOfBirth: criminal.dateOfBirth,
			cpf: criminal.cpf,
			rg: criminal.rg,
			criminalRecord: criminal.criminalRecord,
			nationality: criminal.nationality,
			gender: criminal.gender,
			address: criminal.address,
			recidivist: criminal.recidivist,
			crimes: criminal.Crime?.map((crime) => ({
				status: crime.status,
				dateOfOccurrence: crime.dateOfOccurrence,
				priority: crime.priority,
				motivation: crime.motivation,
				witnesses: crime.witnesses,
			})),
		};
	}
}
