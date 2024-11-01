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
	type?: TypeGun | null;
	caliber?: TypeCaliber | null; 
	state?: TypeState | null;
	crimesId: string;
}

export interface GunFilterDto {
	type?: TypeGun;
	caliber?: TypeCaliber;
	state?: TypeState
}

export interface UpdateGunDto {
	type?: TypeGun | null;
	caliber?: TypeCaliber | null;
	state?: TypeState | null;
}
