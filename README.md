# Next.js OpenJira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

* Reconstruir los modulos de node y levantar Next
```
npm install
npm run dev
```

## Configurar las variables de entorno
Renombrar el archivo __.env.templete__ a __.env__

## LLenar la base de datos con informacion de pruebas

Llamara:
```
http://localhost:3000/api/seed
```