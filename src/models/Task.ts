import { status } from "../enums/status.enum";

export interface Task {     
id?:number,
titulo: string,
descripcion?: string,
status?: status,
fechaCreacion?:string,
fechaactualizacion?: string
}