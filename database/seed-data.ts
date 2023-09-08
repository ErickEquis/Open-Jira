// Insertar informacion de manera automatica

interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string,
    status: string,
    createAt: number
}

// Documentos que seran ingresados a la BD
export const seedData: SeedData = {
    entries: [        
        {
            description: 'Pendiente: Esto es una descripcion en pendiente',
            status: 'pending',
            createAt: Date.now()
        },
        {
            description: 'En progreso: Esto es una descripcion en progreso',
            status: 'in-progress',
            createAt: Date.now() - 1000000
        },
        {
            description: 'Terminado: Esto es una descripcion en finalizado',
            status: 'finished',
            createAt: Date.now() - 10000
        }
    ]
}