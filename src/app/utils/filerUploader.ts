import multer from "multer"
import path from "path"
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';
import config from "../config";
import { TCloudinaryResponse, TFile } from "../interface/interface";
          
cloudinary.config({ 
  cloud_name: config.CLOUD_NAME, 
  api_key: config.CLOUDINARY_API_KEY, 
  api_secret: config.CLOUDINARY_API_SECRET 
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const uploadToCloudinary =async (file : TFile) : Promise<TCloudinaryResponse | undefined>=>{
return new Promise((resolve ,reject)=>{

    cloudinary.uploader.upload(
        file?.path,(error : Error, result : TCloudinaryResponse)=>{
            fs.unlinkSync(file?.path)
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        }
    )
})

}



  export const fileUploader = {upload,uploadToCloudinary}
