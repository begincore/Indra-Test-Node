# Indra-Test-Node
Bienvenido a la prueba de conocimiento sobre **Node y AWS DynamoDB**.
En el desarrollo se usaron las siguientes **lenguajes y frameworks**.

- JavaScript
- Express JS
- Request
- Axio
- Jest (Unit Test)
- Node
- Swagger (Documentación de la Api)

Para el acceso **Dynamo DB** se utilizao el **AWS SDK para JavaScript** para mas informacion visitar este enlace [AWS SDK for JavaScript versión 3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)

Para el despliegue de la infraestructura se utilizó **Serverles Framework**, en el archivo archivo **serverless.yml** se describe la creación de todo el Stack.

- Creación de Api Gateway **dev-aws-node-express-api**.
- Creación del Lambda **aws-node-express-api-dev-api**.
- Creacion de la tabla DynamoDB **book-table-indra**.

Para el despliegue se debe ejecutar el comando **serverless deploy** y cumplir con los siguiente requerimentos:

- Tener instalado y configurado el **AWS Cli**.
- El **IAM** debe tener todas la políticas necesarias para la **creacion del stack**.

A continuación se describe los Endpoints de la api **(Api Gateway + Lambda)** que puede ser probado desde un herramienta **Api Tester** como **Postman**

> **Nota:** Puede descargar **Postman** desde este enlace [Descargar Postman](https://www.postman.com/downloads/).

**La documentacion de la api con Swagger** lo puede encontrar en este enlace [Swagger de la API TEST INDRA](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/api-docs).

# El Universo de Star Wars (SWAPI)
## Consultar los Planetas de Star Wars
Para consultar todos los **Planetas de Star Wars** hay que hacer un **Get** a la url [https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/planets](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/planets)

## Consultar un planeta de Star Warse
Para consultar un planeta del **Universo e Star Wars** hay que hacer un **Get** a la url [https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/planets/1](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/planets/1), donde *el valor 1* es el id del planeta a consultar

## Consultar los Personajes de Star Wars
Para consultar todos los **Personajes de Star Wars** hay que hacer un **Get** a la url [https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/peoples](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/peoples)

## Consultar un personaje de Star Warse
Para consultar un Personaje del **Universo e Star Wars** hay que hacer un **Get** a la url [https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/peoples/1](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/peoples/1), donde *el valor 1* es el id del personaje a consultar

> Los Endpoint de la Api (Api Gateway + Lambda) estan consultando a las Api (SWAPI) de Star Wars, SWAPI devuelve la información en Ingles, pero se esta haciendo la traducción al Español para su mejor entendimiento.

# Biblioteca de INDRA
En esta parte se va explicar como **Registra y Consultar** a la base de datos de la **Biblioteca de INDRA**

## Registro del libro en la Biblioteca de INDRA
Para registrar un libro necesitamos hacer un **Post** a la url [https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/books/addBook](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/books/addBook). El cuerpo del Post **es una trama Json** que debe tener el siguiente formato:

{
    "bookId": "a94335e2-1b85-41d3-aaec-da794a1d2ec8",
    "name": "Lo que el viento se llevo"
}

- El **Identificador del libro (bookId)** es de **tipo de dato cadena** y debe ser un valor **UUID**.
- El **Nombre del libro (name)** es de tipo de dato cadena.

## Consultar un libro de la Biblioteca de INDRA
Para consultar un libro de la **Biblioteca de INDRA** hay que hacer un **Get** a la url [https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/books/a94335e2-1b85-41d3-aaec-da794a1d2ec8](https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com/books/a94335e2-1b85-41d3-aaec-da794a1d2ec8), donde **a94335e2-1b85-41d3-aaec-da794a1d2ec8** es el Identificador del libro a consultar.


**Author: Williams Peña**
