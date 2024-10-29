import { Router } from 'express';
import { createCriminalMiddleware } from '../middleware/criminal/createCriminal.middleware';
import { CriminalController } from '../controllers/criminal.controller';
import { FindAllCriminalMiddleware } from '../middleware/criminal/find-all-criminal.middleware';
import { ValidateUuidMiddleware } from '../middleware/validate-uuid.middleware';
import { UpdateCriminalMiddleware } from '../middleware/criminal/update-criminal.middleware';

export class CriminalRoutes {
	public static execute(): Router {
		const router = Router();

		router.post(
			'/criminals',
			[
				createCriminalMiddleware.validateRequired,
				createCriminalMiddleware.validateTypes,
				createCriminalMiddleware.validateData,
			],
			CriminalController.create
		);

		router.get(
			'/criminals',
			FindAllCriminalMiddleware.validateTypes,
			CriminalController.findAll
		);

		router.get(
			'/criminals/:id',
			ValidateUuidMiddleware.validate,
			CriminalController.findOneById
		);

		router.put(
			'/criminals/:id',
			[
				ValidateUuidMiddleware.validate,
				UpdateCriminalMiddleware.validateTypes,
				UpdateCriminalMiddleware.validateData,
			],
			CriminalController.update
		);

		router.delete(
			'/criminals/:id',
			[ValidateUuidMiddleware.validate],
			CriminalController.remove
		);

		return router;
	}
}
