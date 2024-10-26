import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { CriminalRoutes } from "./routes/criminal.routes";
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use(CriminalRoutes.execute())

app.get('/', (_request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        message: "Bem vindo ao sistema criminal da polícia da Paraisolandia"
    })
})

app.use(errorHandler);
app.use(notFoundHandler);


app.listen(port, () => {
    console.log(`serving running http://localhost:${port}`);
})
