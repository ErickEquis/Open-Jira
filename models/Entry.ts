import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {
}

// 'Schema' define propiedades que contendran los documentos
const entrySchema = new Schema({
    description: { type: String, requiered: true },
    creatAt: { type: Number },
    status: {
        type: String,
        // Validacion de los tipo de estatus permitidos
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    }
})

// Vacia los valores ingresados si se ocupa el schema
// ': Model<IEntry>' le dice que tipo sera el schema y permite consultar la info desde este mismo
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel;
