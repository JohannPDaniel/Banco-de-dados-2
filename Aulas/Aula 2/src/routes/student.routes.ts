import { CreateStudentsMiddleware } from '../middlewares/students/createStudents.middleware';
import { Router } from 'express';
import { FindAllStudentMiddleware } from '../middlewares/students/find-all-student.middleware';
import { StudentController } from '../controllers/student.controller';
import { ValidateUuidMiddleware } from '../middlewares/validate-uuid.middleware';
import { UpdateStudentMiddleware } from '../middlewares/students/update-students.middleware';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

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
			[AuthMiddleware.validate, FindAllStudentMiddleware.validateTypes],
			StudentController.findAll
		);

		router.get(
			'/students/:id',
			ValidateUuidMiddleware.validate,
			StudentController.findOneById
		);

		router.put(
			'/students/:id',
			[
				ValidateUuidMiddleware.validate,
				UpdateStudentMiddleware.validateTypes,
				UpdateStudentMiddleware.validateData,
			],
			StudentController.update
		);

		router.delete(
			'/students/:id',
			ValidateUuidMiddleware.validate,
			StudentController.remove
		);

		return router;
	}
}
