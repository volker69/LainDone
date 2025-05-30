import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { status } from '../enums/status.enum';

export const validateCreateTask = [
    body('titulo')
        .isString()
        .withMessage('El título debe ser texto')
        .trim()
        .isLength({ max: 50 })
        .withMessage('El título no puede exceder los 50 caracteres'),
    body('descripcion')
        .optional()
        .isString()
        .withMessage('La descripción debe ser texto')
        .trim()
        .isLength({ max: 100 })
        .withMessage('La descripción no puede exceder los 100 caracteres'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdateTask = [
    param('taskId')
        .isNumeric()
        .withMessage('El ID de la tarea debe ser un número'),
    body('estado')
        .isString()
        .withMessage('El estado debe ser texto')
        .custom((value) => {
            if (!Object.values(status).includes(value as status)) {
                throw new Error('Estado no válido');
            }
            return true;
        }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateDeleteTask = [
    param('task_id')
        .isNumeric()
        .withMessage('El ID de la tarea debe ser un número'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]; 