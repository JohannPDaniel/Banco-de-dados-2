import { Router } from 'express';
import { createCriminalMiddleware } from "../middleware/createCriminal.middleware";
import { CriminalController } from "../controllers/criminal.controller";

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

		return router;
	}
}
