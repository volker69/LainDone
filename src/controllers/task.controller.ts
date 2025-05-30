import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export const TaskController = {
    async getTasksController(req:Request,res:Response){
        try {
         const dataResponse = await TaskService.getTask();
         res.status(200).json(dataResponse);
        } catch (error) {
         res.status(500).json({ status:'failure', message:error});
            
        }
    },
    async createTaskController(req:Request,res:Response){
        try {
            const {titulo,descripcion} = req.body;
            const dataResponse = await TaskService.createTask({titulo,descripcion});
            res.status(200).json(dataResponse);
        } catch (error) {
            res.status(500).json({ status:'failure', message:error});
        }
    },
    async updateTaskController(req:Request,res:Response){
        try {
           const { estado } = req.body;
           const { taskId } = req.params;
           const dataResponse = await TaskService.updateTask(estado, Number(taskId));
           res.status(200).json(dataResponse);
        } catch (error) {
            res.status(500).json({ status:'failure', message:error});
        }
    },
    async deleteTaskController(req:Request,res:Response){
        try {
            const {task_id} = req.params;
            const dataResponse = await TaskService.deleteTask(Number(task_id)); 
            res.status(200).json(dataResponse);
        } catch (error) {
            res.status(500).json({ status:'failure', message:error});
        }
    }
}