import express from "express";
const router = express.Router();
export default router;
import { createTask, getTasks, getTask, deleteTask, updateTask } from "#db/queries/tasks"
import { verifyToken } from "../middleware.js"

function isValidId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

router.route("/").get(async (req, res) => {
    const tasks = await getTasks();
    res.send(tasks);
});


router.route("/").post(verifyToken, async (req, res) => {
    if(!req.body){
        return res.status(400).send({error: "Missing body"})
    }
    const {title, done} = req.body
    const user_id = req.user.id;
    console.log(user_id)
    if(!title || done == undefined){
        return res.status(400).send({error: "Missing required fields"})
    } 
    const task = await createTask(title, done, user_id)
    res.status(201).send(task)
})

router.route("/:id").get(async (req, res) => {
    const id = Number(req.params.id)
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const task = await getTask(id)
    if(!task){
        return res.status(404).send({error: "Task not found"})
    }
    res.send(task)
})

router.route("/:id").delete(verifyToken, async (req, res) => {
    const id = Number(req.params.id)
    if (!isValidId(id)) {
        return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const task = await deleteTask(id)
    if(!task){
        return res.status(404).send({error: "Task not found"})
    }
    res.sendStatus(204)
})

router.route("/:id").put(verifyToken, async (req, res) => {
    const id = Number(req.params.id)
    if(!req.body){
        return res.status(400).send({error: "Missing body"})
    }

    const {title, done} = req.body
    if(!title || done == undefined ){
        return res.status(400).send({error: "Missing rquired fields"})
    }
    if (!isValidId(id)) {
        return res.status(400).send({ error: "ID must be a positive integer" });
  }
  
    const task = await getTask(id)
    if(!task){
        return res.status(404).send({error: "Task not found"})
    }
    const tasks = await updateTask(id, title, done)
    res.send(tasks)
})