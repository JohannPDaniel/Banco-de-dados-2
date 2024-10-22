import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())

app.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        message: "Bem vindo ao sistema criminal da polícia da Paraisolandia"
    })
})

app.listen(port, () => {
    console.log(`serving running http://localhost:${port}`);
})