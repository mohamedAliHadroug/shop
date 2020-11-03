import express from 'express'
import multer from 'multer'
import Router from "express";
import path from 'path'



const router = Router();
//to upload file we use multer in our case we will upload all type  of extension image not only.jpg path.extname() to get the extension
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
//function that allow as to check the type of file with the extension jpg or jpg or png
function checkFileType(file, cb){
        const filetypes = /jpeg|jpg|png/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetypes.test(file.mimetype)
        if (extname && mimetype){
            return cb(null, true)
        } else {
            cb('Images only!!')
        }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

// route to post a single image 
router.post('/', upload.single('image'), (req, res)=>{
    res.send(`/${req.file.path}`)
})

export default router