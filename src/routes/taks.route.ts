import { Router, RequestHandler } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateCreateTask, validateUpdateTask, validateDeleteTask } from '../middleware/taskValidator.middleware';

const router = Router();

router.get('/tasks', TaskController.getTasksController);
router.post('/task', validateCreateTask as RequestHandler[], TaskController.createTaskController as RequestHandler);
router.put('/task/:taskId', validateUpdateTask as RequestHandler[], TaskController.updateTaskController as RequestHandler);
router.delete('/task/:task_id', validateDeleteTask as RequestHandler[], TaskController.deleteTaskController as RequestHandler);

export default router;