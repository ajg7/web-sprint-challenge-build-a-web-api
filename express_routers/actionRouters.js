const express = require("express");
const actionsMethods = require("../data/helpers/actionModel")
const router = express.Router();

router.get("/", (request, response) => {
    actionsMethods.get()
        .then(actions => {
            response.status(200).json({data: actions})
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({error: error})
        })
})

router.get("/:id", (request, response) => {
    const { id } = request.params;
    actionsMethods.get(id)
        .then(action => {
            response.status(200).json({data: action})
        })
        .catch(error => {
            console.log(error)
            response.status(404).json({ message: "id could not be found" })
        })
})

router.post("/:id", (request, response) => {
    request.body.project_id = request.params.id;
    if(request.body.description && request.body.notes) {
        actionsMethods.insert(request.body)
            .then(action => {
                response.status(200).json({ data: action })
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
    actionsMethods.update(id, request.body)
        .then(changes => {
            if (changes) {
                response.status(200).json({id: id})
            } else {
                response.status(400).json({ message: `action with id ${id} does not exist`});
            }
        })
        .catch(error => {
            console.log("hello", error);
            response.status(500).json({ message: "There was a server error updating the action" })
        })
})

router.delete("/:id", (request, response) => {
    const { id } = request.params;
    actionsMethods.remove(id)
        .then(result => {
            if(result === 1) {
                response.status(200).json({id: id})
            } else {
                response.status(400).json({ message: `Action with id ${id} does not exist`})
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "There was a server error deleting the user" })
        })
})

module.exports = router;