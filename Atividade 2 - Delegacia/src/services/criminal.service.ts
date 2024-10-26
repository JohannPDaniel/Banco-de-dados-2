import { prisma } from '../database/prisma.database';
import { CreateCriminalDto, CriminalDto } from '../dtos';
import { ResponseApi } from '../types/response.types';
import { Criminal as CriminalPrisma } from '@prisma/client';

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

	private mapToDto(criminal: CriminalPrisma): CriminalDto {
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
		};
	}
}
