import { CreateStudentsMiddleware } from '../middlewares/createStudents.middleware';
import { Router } from 'express';
import { FindAllStudentMiddleware } from '../middlewares/find-all-student.middleware';
import { StudentController } from "../controllers/student.controller";

export class StudentRoutes {
	public static execute(): Router {
		const router = Router();
		router.post(
			'/students',
			[
				CreateStudentsMiddleware.validateRequired,
				CreateStudentsMiddleware.validateTypes,
				CreateStudentsMiddleware.validateData,
			],
			StudentController.create
		);

		router.get(
			'/students',
			[FindAllStudentMiddleware.validateTypes],
			StudentController.findAll
		);

		return router;
	}
}
