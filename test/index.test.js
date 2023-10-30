const axios = require('axios');
const crypto = require('crypto');
const urlBase = 'https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com';
const bookUUID = crypto.randomUUID();

describe('Test SWAPI to AWS', () => {

  test('Adding a book', async () => {
    const urlGetBook = urlBase + "/books/addBook";
    const mockData = {bookId: bookUUID.toString(), name: 'Libro of ' + bookUUID.toString()};
    const mockResponse = {code: 100, data: 'Successfull'};

    axios.post(urlGetBook,mockData)
      .then(function (response) {
        expect(response).toBeTruthy();
        expect(response.status).toBe(201);
        expect(response.data).toEqual(mockResponse)
      });
  })

  test('Query a book', async () => {
    const urlGetBook = urlBase + "/books/" + bookUUID.toString();
    const res = await axios.get(urlGetBook);
    const mockResponse = {bookId: bookUUID.toString(), name: 'Libro of ' + bookUUID.toString()};

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data).toEqual(mockResponse)

  })
})