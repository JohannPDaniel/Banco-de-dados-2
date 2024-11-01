import { Router } from 'express';
import { AssementsController } from '../controllers/assement.controller';
import { AssessmentMiddleware } from '../middlewares/assessment/assessment.middleware';

export class AssementsRoutes {
	public static execute(): Router {
		const router = Router();

		router.post(
			'/assessments',
			[
				AssessmentMiddleware.validateRequired,
				AssessmentMiddleware.validateTypes,
				AssessmentMiddleware.validateData,
			],
			AssementsController.create
		);

		return router;
	}
}
