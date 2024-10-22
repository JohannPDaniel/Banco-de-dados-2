import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        message: "Aula 3 - Continuando construção da API Academy"
    })
})

app.listen(port, () => {
	console.log(`serving running http://localhost:${port}`);
});
