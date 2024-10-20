import { CreateStudentsMiddleware } from "../middlewares/createStudents.middleware";
import { StudentController } from "../controllers/student.controller";
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
