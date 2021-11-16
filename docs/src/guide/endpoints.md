# Endpoints Disponibles

En total hay 5 endpoints disponibles dentro de la app, que permiten interactuar con todo y acceder a las diferentes funcionalidades.

| Method |        Path        |                                        Description |
| ------ | :----------------: | -------------------------------------------------: |
| POST   |  `/auth/register`  |                        Registro de nuevos usuarios |
| POST   |   `/auth/login`    |                                     Iniciar sesion |
| GET    |    `/coins/all`    |        Obtener todas las criptomonedas disponibles |
| POST   | `/coins/favourite` | Agregar criptomonedas a mis favoritos(seguimiento) |
| GET    | `/coins/favourite` |   Obtener mis criptomonedas favoritas(seguimiento) |

::: tip
En la raiz del repositorio hay un archivo llamado Request que se puede importar al cliente [Insomnia](https://insomnia.rest/) y contiene todas las request disponibles.
:::

## Autenticación y autorización

### Registro de Usuarios --> /auth/register

Crea un nuevo usuario en la base de datos

**Atributos Requeridos en el body**

| Name              |  Type  |                                           Description |
| ----------------- | :----: | ----------------------------------------------------: |
| firstName         | STRING |                                         Primer nombre |
| lastName          | STRING |                                             Apellidos |
| userName          | STRING | Nombre de usuario, debe ser unico y no estar repetido |
| password          | STRING |             Contrasena, debe ser mayor a 8 caracteres |
| favouriteCurrency | STRING |          Moneda preferida, puede ser (ars, usd o eur) |

Se debe realizar `POST` al endpoint `/auth/register` con todos los atributos,

Para los atributos:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "userName": "JohnDoe",
  "password": "johndoe123",
  "favouriteCurrency": "usd"
}
```

Se dara la siguiente salida:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "userName": "JohnDoe",
  "password": "$2b$10$gCnddctsvN3ghz/WFD0E7u.k9gcUXXIOQMaltVa9EQHPopRE7hjTG",
  "favouriteCurrency": "usd",
  "id": 3
}
```

### Inicio de sesion --> /auth/login

Se debe realizar `POST` al endpoint `/auth/login` con los atributos de userName y password

Para las credenciales

```json
{
  "userName": "JohnDoe",
  "password": "johndoe123"
}
```

Se obtendra la salida

```json
{
  "user": {
    "id": 3,
    "firstName": "John",
    "lastName": "Doe",
    "userName": "JohnDoe",
    "password": "$2b$10$gCnddctsvN3ghz/WFD0E7u.k9gcUXXIOQMaltVa9EQHPopRE7hjTG",
    "favouriteCurrency": "usd"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJ1c2VyTmFtZSI6IkpvaG5Eb2UiLCJwYXNzd29yZCI6IiQyYiQxMCRnQ25kZGN0c3ZOM2doei9XRkQwRTd1Lms5Z2NVWFhJT1FNYWx0VmE5RVFIUG9wUkU3aGpURyIsImZhdm91cml0ZUN1cnJlbmN5IjoidXNkIn0sImlhdCI6MTYzNzAwNzY1NSwiZXhwIjoxNjM3NjEyNDU1fQ.iyUw6mRV8owh33iWIusJWVCtjxCAMaYieTnN2FBMe_U"
}
```

El token debe tomarse y se debe en los headers como Authorization bearer token para el resto de los endpoints

eg.
| Name | Type |
| --- | ---- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I.... |

## Busqueda de criptomonedas --> /coins/all

Para obtener todas las criptomonedas disponibles debe estar logueado y hacer `GET` al endpoint `/coins/all` y se obtendra la siguiente salida (teniendo en cuenta la moneda preferida del usuario)

```json
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "current_price": 64119,
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "last_updated": "2021-11-15T20:30:02.827Z"
  },
  {
    "id": "ethereum",
    "symbol": "eth",
    "current_price": 4582.86,
    "name": "Ethereum",
    "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    "last_updated": "2021-11-15T20:29:35.823Z"
  },
  ...
  ...
  ...
]
```

## Criptomonedas Favoritas(seguimiento) --> /coins/favourite

### Creacion de nuevas criptomonedas favoritas

Para agregar nuevas criptomonedas favoritas se debe estar logueado y hacer `POST` al endpoint `/coins/favourite`.

**Atributos requeridos en el body**

| Name   |  Type  |                                       Description |
| ------ | :----: | ------------------------------------------------: |
| coinId | STRING | ID de la moneda que se quiere agregar eg. bitcoin |

Por lo tanto para la peticion con body

```json
{
  "coinId": "cardano"
}
```

Se recibira

```json
{
  "coinId": "cardano",
  "symbol": "ada",
  "name": "Cardano",
  "image": "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860",
  "user": 3,
  "id": 11
}
```

::: warning
Si no existe el id se recibira un error, al igual que si ya se ha agregado previamente por el mismo usuario.
:::

### Obtener mis criptomonedas favoritas

Para hacer seguimiento de sus criptomonedas favoritas se debe estar logueado y hacer `GET` al endpoint `/coins/favourite`.

**Este enpoint puede recibe los siguientes parametros en la query (No son obligatorios)**

| Name  |  Type  |                                                                 Description |
| ----- | :----: | --------------------------------------------------------------------------: |
| limit | STRING | Numero de monedas que seran listadas, por defecto 25. Minimo 1 y maximo 25. |
| sort  | STRING |          Ordenamiento de las monedas, por defecto 25. Puede ser desc o asc. |

Por lo tanto para la siguiente peticion:

```url
http://localhost:4000/coins/favourite?limit=5&sort=asc
```

Se obtendra:

```json
[
  {
    "symbol": "doge",
    "ars": 25.91,
    "usd": 0.258416,
    "eur": 0.227344,
    "name": "Dogecoin",
    "image": "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256",
    "last_updated_at": 1637009365
  },
  {
    "symbol": "usdt",
    "ars": 100.53,
    "usd": 1,
    "eur": 0.881942,
    "name": "Tether",
    "image": "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
    "last_updated_at": 1637009280
  },
  ...
  ...
  ...
]
```
