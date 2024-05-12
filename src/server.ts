import { Server } from "http";
import app from "./app";

let server : Server
async function main ( ){
    try{

        server = app.listen(5000,()=>{
            console.log(`App listening at http://localhost:${5000}`)
        })
    }catch(err){
console.log(err)
    }
}
main()