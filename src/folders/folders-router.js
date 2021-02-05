const express = require('express')
const xss = require('xss')
const path = require('path')
const FoldersService = require('./folders-service.js')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializedFolder = folder => ({
    id:folder.id,
    folder_name:xss(folder.folder_name),
    date_created:folder.date_created,
})

foldersRouter
    .route('/')
    .get((req, res, next)=>{
        //res.send('Hello, world!')
        FoldersService.getAllFolders(
            req.app.get('db')
        )
        .then(folders=>{
            res.json(folders.map(serializedFolder))
        })
        .catch(next)
    })
    .post(jsonParser,(req, res, next)=>{
        const { folder_name } = req.body
        const newFolder = {folder_name}

        if(!folder_name){
            return res.status(400).json({
                error: {message: `Missing folder_name in request body`}
            })
        }

        FoldersService.insertFolder(
            req.app.get('db'),
            newFolder
        )
        .then(folder=>{
            res.status(201)
            .location(path.posix.join(req.originalUrl + `/${folder.id}`))
            .json(serializedFolder(folder))
        })
        .catch(next)
    })

    foldersRouter
        .route(`/:folder_id`)
        .all((req, res, next)=>{
            FoldersService.getById(
                req.app.get('db'),
                req.params.folder_id
            )
            .then(folder =>{
                if(!folder){
                    return res.status(404).json({
                        error: { message : `Folder doesn't exist`}
                    })
                 }
                res.folder = folder //save the folder for the next mw
                next()//so it goes to the next mw
            })
            .catch(next)
        })
        .get((req, res, next)=>{
            res.json(serializedFolder(res.folder))
        })
        .delete((req, res, next)=>{
            FoldersService.deleteFolder(
                req.app.get('db'),
                req.params.folder_id
            )
            .then(()=>{
                res.status(204).end()
            })
            .catch(next)
        })
        .patch(jsonParser,(req, res, next)=>{
            const { folder_name } = req.body
            const folderToUpdate = { folder_name }

            if(!folder_name){
                return res.status(400).json({
                    error:{message : `Request body must contain folder_name`}
                })
            }

            FoldersService.updateFolder(
                req.app.get('db'),
                req.params.folder_id,
                folderToUpdate
            )
            .then(numRowsAffected=>{
                res.status(204).end()
            })
            .catch(next)

        })

    module.exports = foldersRouter