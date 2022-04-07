jest.useFakeTimers();
const {
  User,
  Term,
  Department,
  IdeaDocument,
  Idea,
  IdeaVote,
  View,
  IdeaComment
} = require('../../src/models/index');
const ideaController = require('../../src/controllers/ideaController');
const {
  IDEA_STATUS
} = require('../../src/configs/ms-constants');
const emailService = require('../../src/services/emailService.js');
const customMessages = require('../../src/configs/customMessages');
const fs = require('fs');
const {
  email
} = require('../../src/configs/config');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.download = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test email service', () => {
  
})
