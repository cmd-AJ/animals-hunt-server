# dino-hunt-server

Este es un proyecto de servidor construido con Node.js utilizando Express y MongoDB. El objetivo de este proyecto es proporcionar una API para el juego DINO HUNT.

## Estructura del Proyecto

```
dino-hunt-server
├── src
│   ├── app.js                # Punto de entrada de la aplicación
│   ├── config
│   │   └── db.js            # Configuración de la conexión a MongoDB
│   ├── controllers
│   │   └── index.js         # Controladores para manejar la lógica de negocio
│   ├── routes
│   │   └── index.js         # Configuración de las rutas de la aplicación
│   └── models
│       └── index.js         # Modelos de datos para MongoDB
├── .env                      # Variables de entorno
├── .gitignore                # Archivos y carpetas a ignorar por Git
├── package.json              # Configuración del proyecto y dependencias
└── README.md                 # Documentación del proyecto
```

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```
   cd dino-hunt-server
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Configura las variables de entorno en el archivo `.env`:
   ```
   MONGODB_URI=<tu_uri_de_mongodb>
   PORT=<puerto_deseado>
   ```

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```

El servidor se ejecutará en el puerto especificado en las variables de entorno.

## Uso

Puedes realizar solicitudes a la API utilizando herramientas como Postman o cURL. Asegúrate de consultar la documentación de las rutas para obtener más detalles sobre los endpoints disponibles.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.