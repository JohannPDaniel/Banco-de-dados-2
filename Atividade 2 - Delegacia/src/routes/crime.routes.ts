import { Router } from 'express';
import { CrimeController } from '../controllers/crime.controller';
import { CreateCrimeMiddleware } from '../middleware/crime/create-crime.middleware';
import { FindAllCrimeMiddleware } from '../middleware/crime/find-all-crime.middleware';
import { ValidateUuidMiddleware } from '../middleware/validate-uuid.middleware';
import { UpdateCrimeMiddleware } from '../middleware/crime/update-crime.middleware';

export class CrimeRoutes {
	public static execute(): Router {
		const router = Router();

		router.post(
			'/crimes',
			[
				CreateCrimeMiddleware.validateRequire,
				CreateCrimeMiddleware.validateType,
				CreateCrimeMiddleware.validateData,
			],
			CrimeController.create
		);

		router.get(
			'/crimes',
			FindAllCrimeMiddleware.validateTypes,
			CrimeController.findAll
		);

		router.get(
			'/crimes/:id',
			ValidateUuidMiddleware.validate,
			CrimeController.findOneById
		);

		router.put(
			'/crimes/:id',
			[
				ValidateUuidMiddleware.validate,
				UpdateCrimeMiddleware.validateTypes,
				UpdateCrimeMiddleware.validateData,
			],
			CrimeController.update
		);

		router.delete(
			'/crimes/:id',
			ValidateUuidMiddleware.validate,
			CrimeController.remove
		);

		return router;
	}
}
