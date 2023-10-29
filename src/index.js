const mapper = require('./mapper.js');
const config = require('./config.js');
const serverless = require("serverless-http");
const express = require("express");
const request = require("request");
const app = express();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const BOOKS_TABLE = process.env.BOOKS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());
app.use("/api-docs",require("./api-docs.js"));

/**
   * @swagger
   * /:
   *   get:
   *     summary: Homepage Test INDRA
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello INDRA
   */
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from INDRA SWAPI!",
  });
});


/**
   * @swagger
   * /planets:
   *  get:
   *    summary: Get All Planets of Star Wars
   *    description: Use to request All Planets of Star Wars
   *    produces:
   *       - application/json
   *    responses:
   *       200:
   *         description: List of planets 
*/
app.get("/planets", (req, res, next) => {
  var planets;
  // console.log(`App listening on ${config.PLANETS}`);

  request(config.PLANETS,(err,response,body)=>{
        if (!err){
            let planets = JSON.parse(body);
            // console.log(`Response PLANETS ${body}`);
            const planetMap = mapper.fieldMapper(planets, mapper.PLANET_MAPPING);
           
            return res.status(200).json({
              code: 100,
              data: planetMap
            });
        }
    })

});

/**
   * @swagger
   * /planets/{planetId}:
   *  get:
   *    summary: Get information of a planet
   *    description: Use to request information of a planet of Star Wars
   *    produces:
   *       - application/json
   *    parameters:
   *       - in: path
   *         name: planetId
   *         description: Id of planet for query
   *         required: true
   *         type: string
   *    responses:
   *       200:
   *         description: Information of planet
*/
app.get("/planets/:planetId", (req, res, next) => {
  var planets;

  if (req.params.planetId <= 0) {
    return res.status(400).json({
      code: 110,
      messsage  : 'The planet id must be greater than zero'
    });
  }

  const uri = config.PLANETS + req.params.planetId;

  request(uri,(err,response,body)=>{
        if (!err){
            let planet = JSON.parse(body);
            const planetMap = mapper.fieldMapper(planet, mapper.PLANET_MAPPING);

            return res.status(200).json({
              code: 100,
              data: planetMap
            });
        }
    })

});

/**
   * @swagger
   * /peoples:
   *  get:
   *    summary: Get All People of Star Wars
   *    description: Use to request information about Star Wars people
   *    produces:
   *       - application/json
   *    responses:
   *       200:
   *         description: List of Peoples of Star Wars 
*/
app.get("/peoples", (req, res, next) => {
  var planets;
  // console.log(`App listening on ${config.PLANETS}`);

  request(config.PEOPLE,(err,response,body)=>{
        if (!err){
          let people = JSON.parse(body);
          const peopleMap = mapper.fieldMapper(people, mapper.PEOPLE_MAPPING);

          return res.status(200).json({
            code: 100,
            data: peopleMap
          });
        }
    })

});

/**
   * @swagger
   * /peoples/{peopleId}:
   *  get:
   *    summary: Get information about a star wars persona
   *    description: Use to request information about a star wars person
   *    produces:
   *       - application/json
   *    parameters:
   *       - in: path
   *         name: peopleId
   *         description: Id of people for query
   *         required: true
   *         type: string
   *    responses:
   *       200:
   *         description: Information of planet
*/
app.get("/peoples/:peopleId", (req, res, next) => {
  var people;

  if (req.params.peopleId <= 0) {
    return res.status(400).json({
      code: 110,
      messsage  : 'The people id must be greater than zero'
    });
  }

  const uri = config.PEOPLE + req.params.peopleId;

  request(uri,(err,response,body)=>{
        if (!err){
            let people = JSON.parse(body);
            const peopleMap = mapper.fieldMapper(people, mapper.PEOPLE_MAPPING);

            return res.status(200).json({
              code: 100,
              data: peopleMap
            });
        }
    })

});

/**
   * @swagger
   * /books/{bookId}:
   *  get:
   *    summary: Get information of a book of library
   *    description: Use to request information about library book
   *       - application/json
   *    parameters:
   *       - in: path
   *         name: bookId
   *         description: Id of book for query
   *         required: true
   *         type: string
   *    responses:
   *       200:
   *         description: Information of planet
*/
app.get("/books/:bookId", async function (req, res) {
  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookId: req.params.bookId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      const { bookId, name } = Item;
      res.json({ bookId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find book with provided "bookId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive book" });
  }
});

/**
   * @swagger
   * /books/addBook:
   *  post:
   *    summary: Add a book to tthe library
   *       - application/json
   *    parameters:
   *      - in: body
   *        name: bookId
   *        description: Id of book
   *        required: true
   *        type: string
   *        example: 8e3c82fc-d733-4ab3-9299-550f0a6698eb
   *      - in: body
   *        name: name
   *        description: Title of book
   *        required: true
   *        type: string
   *        example: Cien años de soledad
   *    responses:
   *       201:
   *         description: Created
*/
app.post("/books/addBook", async function (req, res) {
  const { bookId, name } = req.body;
  if (typeof bookId !== "string") {
    res.status(400).json({ error: '"bookId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: BOOKS_TABLE,
    Item: {
      bookId: bookId,
      name: name,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    // res.json({ bookId, name });

    return res.status(201).json({
      code: 100,
      data: "Successfull"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create book" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);

// app.listen(3000, '127.0.0.1', function () {
//   console.log('App listening on http://127.0.0.1:3000');
// });