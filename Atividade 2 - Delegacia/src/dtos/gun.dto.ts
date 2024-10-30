import { TypeCaliber, TypeGun, TypeState } from "@prisma/client";

export interface CreateGunDto {
	serialNumber: string;
	registrationCode: string;
	type: TypeGun;
	caliber: TypeCaliber;
	state: TypeState;
	crimesId: string;
}

export interface GunDto {
	id: string;
	serialNumber: string;
	registrationCode: string;
	type: TypeGun;
	caliber?: TypeCaliber | null;
	state: TypeState;
	crimesId: string;
}
