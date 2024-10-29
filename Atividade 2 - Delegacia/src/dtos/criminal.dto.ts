import { StatusOffense, TypePriority } from "@prisma/client";

export interface CreateCriminalDto {
	name: string;
	dateOfBirth: Date;
	cpf: string;
	rg: string;
	criminalRecord: string;
	nationality: string;
	gender: string;
	address: string;
	recidivist: boolean;
}

export interface CriminalDto {
	id: string;
	name: string;
	dateOfBirth: Date;
	cpf: string;
	rg: string;
	criminalRecord: string;
	nationality: string;
	gender: string | null;
	address: string | null;
	recidivist: boolean;
	crimes?: Array<Crimes>;
}

export interface Crimes {
	status?: StatusOffense;
	dateOfOccurrence: Date;
	priority: TypePriority;
	witnesses: string | null;
	motivation: string | null;
}

export interface updateCriminalDto {
	name?: string;
	dateOfBirth?: Date;
	nationality?: string;
	gender?: string | null;
	address?: string | null;
	recidivist?: boolean;
}

export interface QueryFilterDto {
	name: string;
	gender: string;
}
