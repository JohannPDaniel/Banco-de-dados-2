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
}
