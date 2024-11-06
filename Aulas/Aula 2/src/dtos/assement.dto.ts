export interface CreateAssessmentDto {
	title: string;
	description: string;
	grade: number;
	studentId: string;
	student: { id: string; type: string };
}
