import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

// Tipado TS
type Data = 
    | { message: string }
    | IEntry[]

    // Manejo de peticiones
export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getEntries( res )

        case 'PUT':
            return postEntry( req, res )

        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }

}

// Obtencion de datos
const getEntries = async( res: NextApiResponse<Data> ) => {


    await db.connect();
    const entries = await Entry.find().sort({ createAt: 'ascending' });
    await db.disconnect()

    res.status(200).json( entries )

}

// Nueva entrada
const postEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { description = "" } = req.body;

    const newEntry = new Entry({
        description,
        createAt: Date.now(),
    });

    try {
        
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        res.status(201).json({ message: "Entrada agregada con exito" });

    } catch (error) {
        
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' })

    }
    
}
