const express = require("express");
const projectMethods = require("../data/helpers/projectModel")
const router = express.Router();

router.get("/", (request, response) => {
    projectMethods.get()
        .then(projects => {
            response.status(200).json({data: projects})
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({error: error})
        })
})

router.get("/:id", (request, response) => {
    const { id } = request.params;
    projectMethods.get(id)
        .then(project => {
            response.status(200).json({data: project})
        })
        .catch(error => {
            console.log(error)
            response.status(404).json({ message: "id could not be found" })
        })
})

router.post("/", (request, response) => {
    if(request.body.description && request.body.name) {
        projectMethods.insert(request.body)
            .then(project => {
                response.status(200).json({ data: project })
            })
            .catch(error => {
                response.status(500).json({ error: error})
            })
    } else {
        response.status(400).json({ message: "a parameter is missing"})
    }
})

router.put("/:id", (request, response) => {
    const { id } = request.params;
    projectMethods.update(id, request.body)
        .then(changes => {
            if (changes) {
                response.status(200).json({id: id})
            } else {
                response.status(400).json({ message: `project with id ${id} does not exist`});
            }
        })
        .catch(error => {
            console.log("hello", error);
            response.status(500).json({ message: "There was a server error updating the project" })
        })
})

router.delete("/:id", (request, response) => {
    const { id } = request.params;
    projectMethods.remove(id)
        .then(result => {
            if(result === 1) {
                response.status(200).json({id: id})
            } else {
                response.status(400).json({ message: `project with id ${id} does not exist`})
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "There was a server error deleting the user" })
        })
})


module.exports = router;