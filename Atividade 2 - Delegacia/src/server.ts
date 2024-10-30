import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { CriminalRoutes } from './routes/criminal.routes';
import { CrimeRoutes } from "./routes/crime.routes";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(CriminalRoutes.execute());
app.use(CrimeRoutes.execute())

app.get('/', (_request: Request, response: Response) => {
	response.status(200).json({
		success: true,
		message: 'Bem vindo ao sistema criminal da polícia da Paraisolandia',
	});
});

app.listen(port, () => {
	console.log(`serving running http://localhost:${port}`);
});
