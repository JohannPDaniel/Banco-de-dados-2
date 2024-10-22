import { StudentController } from "../controllers/Student.controller";
import { CreateStudentsMiddleware } from "../middlewares/createStudents.middleware";
import { Router } from 'express';

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

        return router;
	}
}
