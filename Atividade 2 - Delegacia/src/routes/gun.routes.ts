import { Router } from 'express';
import { GunController } from '../controllers/gun.controller';
import { CreateGunMiddleware } from '../middleware/gun/create-gun.middleware';
import { FindAllGunMiddleware } from '../middleware/gun/find-all-gun.middleware';
import { ValidateUuidMiddleware } from '../middleware/validate-uuid.middleware';
import { UpdateGunMiddleware } from '../middleware/gun/update-gun.middleware';

export class GunRoutes {
	public static execute(): Router {
		const router = Router();

		router.post(
			'/guns',
			[
				CreateGunMiddleware.validateRequired,
				CreateGunMiddleware.validateTypes,
				CreateGunMiddleware.validateData,
			],
			GunController.create
		);

		router.get(
			'/guns',
			FindAllGunMiddleware.validateTypes,
			GunController.findAll
		);

		router.get(
			'/guns/:id',
			ValidateUuidMiddleware.validate,
			GunController.findOneById
		);

		router.put(
			'/guns/:id',
			[ValidateUuidMiddleware.validate, UpdateGunMiddleware.validateTypes],
			GunController.update
		);
		return router;
	}
}
