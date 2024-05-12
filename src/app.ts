import express, { Application, Request, Response } from "express"
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app : Application = express()

//parsers
app.use(express.json())
app.use(cors())

app.use("/api/v1",router)

app.get("/",(req : Request, res : Response)=>{
    res.status(200).json({
        status : "success",
        message : "Welcome to project root"
    })
})
app.use(globalErrorHandler)
export default app