import postgres_db from "../config/conexions";
import { getCurrentDateTime } from "../utils/heperts";
import { Task } from "../models/Task";
import { ITaskCreate } from "../interface/request.interface";
import { status } from "../enums/status.enum";
import { Server } from 'socket.io';

let io:Server;

export const init = (socket:Server) =>{io = socket}

export const TaskService={  
    async createTask(payload:ITaskCreate):Promise<any>{
        try {
            // Creamos un payload para cargar los datos
            const data:Task = {
                titulo: payload.titulo,
                descripcion:payload.descripcion
            }

            //Retornamos la Id de la tarea Creada
            const idTaskRes = await postgres_db('task')
                .insert(data)
                .returning('*');
            
            if (idTaskRes.length === 0) {
                throw new Error('Error en al crear Tarea');

            }

            io.emit('Tarea creada',idTaskRes[0])
            
            return { status:'succes', message:{task_id:idTaskRes[0]}}
        } catch (error) {
            console.error(`Error, detalle: ${error}`);
            throw new Error('Error en createTask')
        }
    },

    async getTask():Promise<any>{
        try {
            const taskRespone = await postgres_db('task')
                .select('*');
            if (taskRespone.length === 0) {
                return { status:'fail', message:'No hay tareas'}
            }
            return { status:'succes', message:taskRespone}
            
        } catch (error) {
            console.error(`Error, detalle: ${error}`);
            throw new Error('Error en getTask');
        }
    },

    async updateTask(estado:string,taskId:number):Promise<any>{
        try {
            const taskResponse = await postgres_db('task')
                .update({status:estado,fechaactualizacion:getCurrentDateTime()})
                .where('id',taskId);
            io.emit('Tarea Actualizada', {id:taskId,status:estado })
            return { status:'succes', message:taskResponse}

        } catch (error) {
            console.error(`Error, detalle: ${error}`);
            throw new Error('Error en updateTask')
        }
    },

    async deleteTask(task_id:number):Promise<any>{
        try {
            await postgres_db('task')
                .where({id:task_id})
                .del();
             io.emit('Tarea Eliminada', {id:task_id })
            return { status:'succes', message:{id:task_id}}
        } catch (error) {
             console.error(`Error, detalle: ${error}`);
            throw new Error('Error en deleteTask')
        }
    }

    

}