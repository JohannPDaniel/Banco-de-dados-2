import {
	StatusOffense,
	TypeCaliber,
	TypeGun,
	TypePriority,
	TypeState,
} from '@prisma/client';

export interface CreateCrimeDto {
	status: StatusOffense;
	dateOfOccurrence: Date;
	caseNumber: string;
	priority: TypePriority;
	witnesses: string | null;
	motivation: string | null;
	criminalId: string;
}

export interface CrimeDto {
	id: string;
	status: StatusOffense;
	dateOfOccurrence: Date;
	caseNumber: string;
	priority: TypePriority;
	witnesses: string | null;
	motivation: string | null;
	criminalId: string;
	gun?: Array<Gun>;
}

interface Gun {
	serialNumber: string;
	registrationCode: string;
	type: TypeGun;
	caliber?: TypeCaliber | null;
	state: TypeState;
}

export interface UpdateCrimeDto {
	status?: StatusOffense;
	dateOfOccurrence?: Date;
	priority?: TypePriority;
	witnesses?: string;
	motivation?: string;
}
