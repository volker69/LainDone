import { Request, Response } from 'express';
import { TaskController } from '../../controllers/task.controller';
import { TaskService } from '../../services/task.service';
import { status } from '../../enums/status.enum';

// Mock del servicio
jest.mock('../../services/task.service');

describe('TaskController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        responseObject = {
            json: jest.fn(),
            status: jest.fn()
        };
        mockRequest = {};
        mockResponse = {
            json: responseObject.json,
            status: jest.fn().mockReturnValue(responseObject)
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getTasksController', () => {
        it('debería obtener todas las tareas exitosamente', async () => {
            const mockTasks = [
                { id: 1, titulo: 'Tarea 1', status: status.PENDIENTE },
                { id: 2, titulo: 'Tarea 2', status: status.COMPLETADA }
            ];

            (TaskService.getTask as jest.Mock).mockResolvedValue({
                status: 'success',
                message: mockTasks
            });

            await TaskController.getTasksController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject.json).toHaveBeenCalledWith({
                status: 'success',
                message: mockTasks
            });
        });

        it('debería manejar errores al obtener tareas', async () => {
            const error = new Error('Error al obtener tareas');
            (TaskService.getTask as jest.Mock).mockRejectedValue(error);

            await TaskController.getTasksController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(responseObject.json).toHaveBeenCalledWith({
                status: 'failure',
                message: error
            });
        });
    });

    describe('createTaskController', () => {
        it('debería crear una tarea exitosamente', async () => {
            mockRequest.body = {
                titulo: 'Nueva Tarea',
                descripcion: 'Descripción de la tarea'
            };

            const mockCreatedTask = {
                status: 'success',
                message: { task_id: 1 }
            };

            (TaskService.createTask as jest.Mock).mockResolvedValue(mockCreatedTask);

            await TaskController.createTaskController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject.json).toHaveBeenCalledWith(mockCreatedTask);
        });

        it('debería manejar errores al crear una tarea', async () => {
            mockRequest.body = {
                titulo: 'Nueva Tarea',
                descripcion: 'Descripción de la tarea'
            };

            const error = new Error('Error al crear tarea');
            (TaskService.createTask as jest.Mock).mockRejectedValue(error);

            await TaskController.createTaskController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(responseObject.json).toHaveBeenCalledWith({
                status: 'failure',
                message: error
            });
        });
    });

    describe('updateTaskController', () => {
        it('debería actualizar una tarea exitosamente', async () => {
            mockRequest.params = {
                taskId: '1'
            };
            
            mockRequest.body = {
                estado: status.COMPLETADA
            };

            const mockUpdatedTask = {
                status: 'success',
                message: { id: 1 }
            };

            (TaskService.updateTask as jest.Mock).mockResolvedValue(mockUpdatedTask);

            await TaskController.updateTaskController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject.json).toHaveBeenCalledWith(mockUpdatedTask);
            expect(TaskService.updateTask).toHaveBeenCalledWith(status.COMPLETADA, 1);
        });

        it('debería manejar errores al actualizar una tarea', async () => {
            mockRequest.params = {
                taskId: '1'
            };
            mockRequest.body = {
                estado: status.COMPLETADA
            };

            const error = new Error('Error al actualizar tarea');
            (TaskService.updateTask as jest.Mock).mockRejectedValue(error);

            await TaskController.updateTaskController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(responseObject.json).toHaveBeenCalledWith({
                status: 'failure',
                message: error
            });
        });
    });

    describe('deleteTaskController', () => {
        it('debería eliminar una tarea exitosamente', async () => {
            mockRequest.params = {
                task_id: '1'
            };

            const mockDeletedTask = {
                status: 'success',
                message: { id: 1 }
            };

            (TaskService.deleteTask as jest.Mock).mockResolvedValue(mockDeletedTask);

            await TaskController.deleteTaskController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject.json).toHaveBeenCalledWith(mockDeletedTask);
        });

        it('debería manejar errores al eliminar una tarea', async () => {
            mockRequest.params = {
                task_id: '1'
            };

            const error = new Error('Error al eliminar tarea');
            (TaskService.deleteTask as jest.Mock).mockRejectedValue(error);

            await TaskController.deleteTaskController(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(responseObject.json).toHaveBeenCalledWith({
                status: 'failure',
                message: error
            });
        });
    });
}); 