import { prisma } from '../database/prisma.database';
import { Crime as CrimePrisma, Gun as GunPrisma } from '@prisma/client';
import { CreateCrimeDto, CrimeDto, UpdateCrimeDto } from '../dtos';
import { ResponseApi } from '../types/response.types';

export class CrimeService {
	public async create(createCrimeDto: CreateCrimeDto): Promise<ResponseApi> {
		const {
			status,
			dateOfOccurrence,
			caseNumber,
			priority,
			witnesses,
			motivation,
			criminalId,
		} = createCrimeDto;

		const existingCriminal = await prisma.criminal.findUnique({
			where: { id: criminalId },
		});

		if (!existingCriminal) {
			return {
				success: false,
				code: 400,
				message:
					'O atributo criminalId fornecido não existe. Por favor, forneça um ID de criminoso válido.',
			};
		}

		const existingCrime = await prisma.crime.findFirst({
			where: { caseNumber },
		});

		if (caseNumber && existingCrime?.caseNumber === caseNumber) {
			return {
				success: false,
				code: 409,
				message: 'O número do caso já está em uso, utilize outro !!!',
			};
		}

		const crimeCreated = await prisma.crime.create({
			data: {
				status,
				dateOfOccurrence,
				caseNumber,
				priority,
				witnesses,
				motivation,
				criminalId,
			},
		});

		return {
			success: true,
			code: 201,
			message: 'Crime criado com sucesso !!!',
			data: this.mapToDto(crimeCreated),
		};
	}

	public async findAll(caseNumber: string): Promise<ResponseApi> {
		const crimes = await prisma.crime.findMany({
			where: {
				...(caseNumber && {
					caseNumber: { startsWith: caseNumber },
				}),
			},
		});

		return {
			success: true,
			code: 200,
			message: 'Criminosos buscados com sucesso!',
			data: crimes.map((crime) => this.mapToDto(crime)),
		};
	}

	public async findOneById(id: string): Promise<ResponseApi> {
		const crimes = await prisma.crime.findUnique({
			where: { id },
			include: { Gun: true },
		});

		if (!crimes) {
			return {
				success: false,
				code: 404,
				message: 'Crime não encontrado !',
			};
		}

		return {
			success: true,
			code: 200,
			message: 'Criminoso encontrado com sucesso !',
			data: this.mapToDto(crimes),
		};
	}

	public async update(
		id: string,
		updateCrimeDto: UpdateCrimeDto
	): Promise<ResponseApi> {
		const crimeFounded = await prisma.crime.findUnique({
			where: { id },
		});

		if (!crimeFounded) {
			return {
				success: false,
				code: 404,
				message: 'Crime a ser atualizado não encontrado !',
			};
		}

		const updatedCrime = await prisma.crime.update({
			where: { id },
			data: { ...updateCrimeDto },
		});

		return {
			success: true,
			code: 200,
			message: 'Crime atualizado com sucesso !',
			data: this.mapToDto(updatedCrime),
		};
	}

	public async remove(id: string): Promise<ResponseApi> {
		const crimeFounded = await prisma.crime.findUnique({
			where: { id },
		});

		if (!crimeFounded) {
			return {
				success: false,
				code: 404,
				message: 'Crime a ser apagado não encontrado !',
			};
		}

		const deletedCrime = await prisma.crime.delete({
			where: { id },
		});

		return {
			success: true,
			code: 200,
			message: 'Crime deletado com sucesso !',
			data: this.mapToDto(deletedCrime),
		};
	}

	private mapToDto(crimes: CrimePrisma & { Gun?: GunPrisma[] }): CrimeDto {
		return {
			id: crimes.id,
			status: crimes.status,
			dateOfOccurrence: new Date(crimes.dateOfOccurrence),
			caseNumber: crimes.caseNumber,
			priority: crimes.priority,
			witnesses: crimes.witnesses,
			motivation: crimes.motivation,
			criminalId: crimes.criminalId,
			gun: crimes.Gun?.map((crime) => ({
				id: crime.id,
				serialNumber: crime.serialNumber,
				registrationCode: crime.registrationCode,
				type: crime.type,
				caliber: crime.caliber,
				state: crime.state,
			})),
		};
	}
}
