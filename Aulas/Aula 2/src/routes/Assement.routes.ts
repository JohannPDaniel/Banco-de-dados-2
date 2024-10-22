import { Router } from 'express';
import { createAssementsMiddleware } from '../middlewares/createAssements.middleware';
import { AssementController } from '../controllers/Assement.controller';

export class AssementRoutes {
	public static execute(): Router {
		const router = Router();
		router.post(
			'/assements',
			[
				createAssementsMiddleware.validateRequired,
				createAssementsMiddleware.validateTypes,
				createAssementsMiddleware.validateData,
			],
			AssementController.create
		);

		return router;
	}
}
