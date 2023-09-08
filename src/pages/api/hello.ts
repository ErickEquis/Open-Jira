// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  // Tipo de datos que seran recibidos. (Tipado TS)
  ok: boolean;
  message: string;
  method: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Tipo de estatus que sera regresado.
  // Peticiones HTTP
  // Se tiene tener claro que tipo de peticion sera enviada
  // Solo pueden ser llamados una vez
  res.status(200).json({ 
    // <Data>
    ok: true,
    message: 'Todo correcto',
    // Muestra que tipo metodo se esta ejecutando
    method: req.method || 'no hay metodo' })
    
}
