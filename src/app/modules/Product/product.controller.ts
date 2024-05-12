import { Request, Response } from "express"

const createProduct =async (req : Request, res : Response)=>{
console.log(req.body)

return res.status(200).json({
    statusCode : 200,
    data : req.body
})

}

export const ProductControllers = {
    createProduct
}