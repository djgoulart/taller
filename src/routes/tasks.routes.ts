import { Router } from "express";
import { tasksController } from "./../http/tasks/controllers/tasks.controller";

const router = Router();


router.get('/', (req, res, next) => tasksController.listTasks(req, res, next));
router.get('/:id', tasksController.showTask);
router.post('/', (req, res) => tasksController.createTask(req, res));
router.put('/:id', tasksController.editTask);
router.delete('/:id', tasksController.deleteTask);


export {router}