import { Router } from "express";
import { CrimeController } from "../controllers/crime.controller";

export class CrimeRoutes {
    public execute(): Router {
        const router = Router()

        router.post('/crimes', [], CrimeController.create);

        return router
    }
}