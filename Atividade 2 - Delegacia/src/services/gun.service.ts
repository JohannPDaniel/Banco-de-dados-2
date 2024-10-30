import { Gun as GunPrisma } from '@prisma/client';
import { ResponseApi } from '../types/response.types';
import { CreateGunDto } from '../dtos';

export class GunService {
	public async create(): Promise<ResponseApi> {}
	public async findAll(): Promise<ResponseApi> {}
	public async findOneById(): Promise<ResponseApi> {}
	public async update(): Promise<ResponseApi> {}
	public async remove(): Promise<ResponseApi> {}

	private mapToDto(gun: GunPrisma): CreateGunDto {
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
