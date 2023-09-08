// Debe ignorarse 'seed.ts'

import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../../database';
import { Entry } from '../../../models';

// Tipo de datos que seran retornados
type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    // Si se esta en produccion no se puede ejecutar el proceso
    if ( process.env.NODE_ENV === 'production' ) {
        return res.status(401).json({ message: 'No tiene acceso a este servicio' })
    }

    // Conexion a db
    await db.connect();

    // Manipulacion de db
    // -------------------

    // Borrar db
    await Entry.deleteMany();

    // Insertar informacion a db
    await Entry.insertMany( seedData.entries )

    // -------------------
    
    // Desconexion de db
    await db.disconnect();
    
    res.status(200).json({ message: 'Proceso realizado correctamente' })
}