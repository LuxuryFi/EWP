jest.useFakeTimers();
const {
  User
} = require('../../src/models/index');
const ideaController = require('../../src/controllers/ideaController');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test idea controller', () => {
 describe('Test create idea', () => {
   it('it should return status code 200 and account data', async () => {
     
   })
 })
})
