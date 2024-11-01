import {
	Gun as GunPrisma,
	TypeCaliber,
	TypeGun,
	TypeState,
} from '@prisma/client';
import {
	CreateGunDto,
	GunDto,
	GunFilterDto,
	UpdateCrimeDto,
	UpdateGunDto,
} from '../dtos';
import { ResponseApi } from '../types/response.types';
import { prisma } from '../database/prisma.database';

export class GunService {
	public async create(createGunDto: CreateGunDto): Promise<ResponseApi> {
		const { serialNumber, registrationCode, type, caliber, state, crimesId } =
			createGunDto;

		const existingGun = await prisma.crime.findUnique({
			where: { id: crimesId },
		});

		if (!existingGun) {
			return {
				success: false,
				code: 404,
				message:
					'O atributo crimesId fornecido não existe. Por favor, forneça um ID de crime válido.',
			};
		}

		const validateUnique = await prisma.gun.findFirst({
			where: {
				OR: [{ serialNumber }, { registrationCode }],
			},
		});

		if (validateUnique) {
			if (validateUnique.serialNumber === serialNumber) {
				return {
					success: false,
					code: 409,
					message:
						'O número de série da arma já está em uso, utilize outro !!!',
				};
			}

			if (validateUnique.registrationCode === registrationCode) {
				return {
					success: false,
					code: 409,
					message:
						'O código de registro da arma já está em uso, utilize outro !!!',
				};
			}
		}

		const createGun = await prisma.gun.create({
			data: {
				serialNumber,
				registrationCode,
				type,
				caliber,
				state,
				crimesId,
			},
		});

		return {
			success: true,
			code: 201,
			message: 'Arma cadastrada com sucesso !',
			data: this.mapToDto(createGun),
		};
	}
	public async findAll(query: GunFilterDto): Promise<ResponseApi> {
		const { type, caliber, state } = query;

		const guns = await prisma.gun.findMany({
			where: {
				...(type && { type: { equals: type as TypeGun } }),
				...(caliber && { caliber: { equals: caliber as TypeCaliber } }),
				...(state && { state: { equals: state as TypeState } }),
			},
		});

		return {
			success: true,
			code: 200,
			message: 'Arma buscada com sucesso !',
			data: guns.map((gun) => this.mapToDto(gun)),
		};
	}
	public async findOneById(id: string): Promise<ResponseApi> {
		const gunId = await prisma.gun.findUnique({
			where: { id },
		});

		if (!gunId) {
			return {
				success: false,
				code: 404,
				message: 'Arma não cadastrada !',
			};
		}
		return {
			success: true,
			code: 200,
			message: 'Arma encontrada com sucesso !',
			data: this.mapToDto(gunId),
		};
	}
	public async update(
		id: string,
		updateCrimeDto: UpdateGunDto
	): Promise<ResponseApi> {
		const gunId = await prisma.gun.findUnique({
			where: { id },
		});

		if (!gunId) {
			return {
				success: false,
				code: 404,
				message: 'A Arma não foi cadastrada !',
			};
		}

		const gunUpdated = await prisma.gun.update({
			where: { id },
			data: { ...updateCrimeDto },
		});

		return {
			success: true,
			code: 200,
			message: 'Arma atualizada com sucesso !',
			data: this.mapToDto(gunUpdated),
		};
	}
	public async remove(): Promise<ResponseApi> {
		return {
			success: true,
			code: 200,
			message: 'Arma deletada com sucesso !',
			data: [],
		};
	}

	private mapToDto(gun: GunPrisma): GunDto {
		return {
			id: gun.id,
			serialNumber: gun.serialNumber,
			registrationCode: gun.registrationCode,
			type: gun.type,
			caliber: gun.caliber,
			state: gun.state,
			crimesId: gun.crimesId,
		};
	}
}
