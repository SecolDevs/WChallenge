# Introduccion

WChallenge es una API wrapper de CoinGecko que permite crear usuarios, listar todas las criptomonedas disponibles, agregar criptomonedas a favoritos, y listar su valor en el mercado.

# Como Instalar?

Para instalar y comenzar a usar proyecto sigue los siguientes pasos

1. Clona el repositorio y accede a la carpeta
2. Corre el comando npm install
3. Dentro de la carpeta dist se encuentra el transpilado del proyecto, puedes correr _npm start_ para levantar el ambiente de producción. O si prefieres puedes eliminar la carpeta dist, y correr _npm run build_, esto hara que se transpile nuevamente todo el código typescript dentro de dist, y puedas correr el proyecto con _npm start_

::: danger ⚠️ CONSIDERACION ⚠️
Si decides borrar la carpeta dist y ejecutar todo desde cero, debes ir al archivo que se encuentra en _src/database/config/db.config.ts_ y descomentar la opcion "_synchronize: true_" esto hara que se realice la migracion de tablas a la base de datos.

Luego debes guardar, correr el comando npm run build y npm start, luego debes interrumpir el servidor, ir al mismo archivo y volver a comentar la opcion "_synchronize: true_", una vez hecho esto ya puedes correr npm run build y npm start con normalidad.

_Esto siempre y cuando decidas borrar la carpeta dist._
:::

::: tip
Si quieres correr el entorno de desarrollo corre el comando _npm run build:watch_ y en otra terminal _npm run dev_
:::

::: warning
El archivo .env ya se encuentra dentro del repositorio para que no se tenga que configurar nada, y por defecto el servidor corre sobre el puerto 4000. eg. **http://localhost:4000/**
:::
