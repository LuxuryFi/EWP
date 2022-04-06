jest.useFakeTimers();
const {
  User, Term, Department, IdeaDocument, Idea
} = require('../../src/models/index');
const ideaController = require('../../src/controllers/ideaController');
const { IDEA_STATUS } = require('../../src/configs/ms-constants');
const emailService = require('../../src/services/emailService.js');
const customMessages = require('../../src/configs/customMessages');

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
  beforeEach(() => {
     jest.clearAllMocks();
     jest.resetAllMocks();
   })
  it('it should return status code 200 and account data', async () => {
     const req = {
       body: {
         category_id: 1,
         description: "Test",
         status: true,
         title: "Test"
       },
       user: {
         user_id: 6,
         department_id: 6,
       }, 
       files: [{
          filename: "Test.png",
          idea_id: 10,
          file_type: 'jpg'
          }, {
            filename: "Test.png",
           idea_id: 10,
            file_type: 'rar'
          }, {
            filename: "Test.png",
            idea_id: 10,
            file_type: 'png'
          },{
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        } 
      ]
     }

     emailService.sendEmail = jest.fn();

     const res = mockResponse();

     jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        term_id: 1,
     });

     jest.spyOn(Idea, 'create').mockResolvedValueOnce({
       idea_id: 10,
       description: "Test",
       user_id: 6,
       department_id: 6,
       term_id: 1,
       status: IDEA_STATUS.FIRST_CLOSURE,
       title: 'Test',
       created_date: "Test",
       updated_date: "test",
     });

     jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      created_date: "2022-04-01T18:32:46.217Z",
      department_id: 6,
      department_name: "Marketing1",
      description: "Test",
      manager_id: 69
     });

     jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      "username": "annthgch190232@fpt.edu.vn",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
     });

     emailService.sendEmail.mockResolvedValueOnce(true);

     jest.spyOn(IdeaDocument, 'bulkCreate').mockResolvedValueOnce([{
        document_id: 1,
        filename: "Test.png",
        idea_id: 10,
        file_type: 'jpg'
     }, {
        document_id: 2,
        filename: "Test.png",
        idea_id: 10,
        file_type: 'rar'
     }, {
        document_id: 3,
        filename: "Test.png",
        idea_id: 10,
        file_type: 'png'
      },{
        document_id: 4,
        filename: "Test.png",
        idea_id: 10,
        file_type: 'zip'
      } 
     ])

     await ideaController.createIdea(req, res);

     expect(res.status).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith({
       data: {
        idea_id: 10,
        description: "Test",
        user_id: 6,
        department_id: 6,
        term_id: 1,
        status: IDEA_STATUS.FIRST_CLOSURE,
        title: 'Test',
        created_date: "Test",
        updated_date: "test",
       }
      });
   })

  it('it should return status code 500 and document insert failed', async () => {
    const req = {
      body: {
        category_id: 1,
        description: "Test",
        status: true,
        title: "Test"
      },
      user: {
        user_id: 6,
        department_id: 6,
      }, 
      files: [{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'jpg'
         }, {
           filename: "Test.png",
          idea_id: 10,
           file_type: 'rar'
         }, {
           filename: "Test.png",
           idea_id: 10,
           file_type: 'png'
         },{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'zip'
       } 
     ]
    }

    emailService.sendEmail = jest.fn();

    const res = mockResponse();

    jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
       term_id: 1,
    });

    jest.spyOn(Idea, 'create').mockResolvedValueOnce({
      idea_id: 10,
      description: "Test",
      user_id: 6,
      department_id: 6,
      term_id: 1,
      status: IDEA_STATUS.FIRST_CLOSURE,
      title: 'Test',
      created_date: "Test",
      updated_date: "test",
    });

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
     created_date: "2022-04-01T18:32:46.217Z",
     department_id: 6,
     department_name: "Marketing1",
     description: "Test",
     manager_id: 69
    });

    jest.spyOn(User, 'findOne').mockResolvedValueOnce({
     "username": "annthgch190232@fpt.edu.vn",
     "full_name": "Vu Hai Nam",
     "last_name": "full_name",
     "first_name": "full_name",
     "phone": "0966141511",
     "role_id": 4,
     "password": "123456789",
     "avatar": "test"
    });

    emailService.sendEmail.mockResolvedValueOnce(true);

    jest.spyOn(IdeaDocument, 'bulkCreate').mockResolvedValueOnce([]);

    await ideaController.createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['Document not found']
    });
  });

  it('it should return status code 500 and user not found', async () => {
    const req = {
      body: {
        category_id: 1,
        description: "Test",
        status: true,
        title: "Test"
      },
      user: {
        user_id: 6,
        department_id: 6,
      }, 
      files: [{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'jpg'
         }, {
           filename: "Test.png",
          idea_id: 10,
           file_type: 'rar'
         }, {
           filename: "Test.png",
           idea_id: 10,
           file_type: 'png'
         },{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'zip'
       } 
     ]
    }

    emailService.sendEmail = jest.fn();

    const res = mockResponse();

    jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
       term_id: 1,
    });

    jest.spyOn(Idea, 'create').mockResolvedValueOnce({
      idea_id: 10,
      description: "Test",
      user_id: 6,
      department_id: 6,
      term_id: 1,
      status: IDEA_STATUS.FIRST_CLOSURE,
      title: 'Test',
      created_date: "Test",
      updated_date: "test",
    });

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
     created_date: "2022-04-01T18:32:46.217Z",
     department_id: 6,
     department_name: "Marketing1",
     description: "Test",
     manager_id: 69
    });

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

    emailService.sendEmail.mockResolvedValueOnce(true);

    jest.spyOn(IdeaDocument, 'bulkCreate').mockResolvedValueOnce([]);

    await ideaController.createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['Account not found']
    });
  });

  it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        category_id: 1,
        description: "Test",
        status: true,
        title: "Test"
      },
      user: {
        user_id: 6,
        department_id: 6,
      }, 
      files: [{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'jpg'
         }, {
           filename: "Test.png",
          idea_id: 10,
           file_type: 'rar'
         }, {
           filename: "Test.png",
           idea_id: 10,
           file_type: 'png'
         },{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'zip'
       } 
     ]
    }

    emailService.sendEmail = jest.fn();

    const res = mockResponse();

    jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
       term_id: 1,
    });

    jest.spyOn(Idea, 'create').mockResolvedValueOnce({
      idea_id: 10,
      description: "Test",
      user_id: 6,
      department_id: 6,
      term_id: 1,
      status: IDEA_STATUS.FIRST_CLOSURE,
      title: 'Test',
      created_date: "Test",
      updated_date: "test",
    });

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce(undefined);

    await ideaController.createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['Department not found']
    });
  });

  it('it should return status code 500 and failed to create idea', async () => {
    const req = {
      body: {
        category_id: 1,
        description: "Test",
        status: true,
        title: "Test"
      },
      user: {
        user_id: 6,
        department_id: 6,
      }, 
      files: [{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'jpg'
         }, {
           filename: "Test.png",
          idea_id: 10,
           file_type: 'rar'
         }, {
           filename: "Test.png",
           idea_id: 10,
           file_type: 'png'
         },{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'zip'
       } 
     ]
    }

    emailService.sendEmail = jest.fn();

    const res = mockResponse();

    jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
       term_id: 1,
    });

    jest.spyOn(Idea, 'create').mockResolvedValueOnce(undefined);

    await ideaController.createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: [customMessages.errors.failedToCreateIdea]
    });
  });

  it('it should return status code 500 and not active term', async () => {
    const req = {
      body: {
        category_id: 1,
        description: "Test",
        status: true,
        title: "Test"
      },
      user: {
        user_id: 6,
        department_id: 6,
      }, 
      files: [{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'jpg'
         }, {
           filename: "Test.png",
          idea_id: 10,
           file_type: 'rar'
         }, {
           filename: "Test.png",
           idea_id: 10,
           file_type: 'png'
         },{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'zip'
       } 
     ]
    }


    const res = mockResponse();

    jest.spyOn(Term, 'findOne').mockResolvedValueOnce(undefined);
    await ideaController.createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: [customMessages.errors.notAnyActiveTerm]
    });
  });

  it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        category_id: 1,
        description: "Test",
        status: true,
        title: "Test"
      },
      user: {
        user_id: 6,
        department_id: 6,
      }, 
      files: [{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'jpg'
         }, {
           filename: "Test.png",
          idea_id: 10,
           file_type: 'rar'
         }, {
           filename: "Test.png",
           idea_id: 10,
           file_type: 'png'
         },{
         filename: "Test.png",
         idea_id: 10,
         file_type: 'zip'
       } 
     ]
    }

    const res = mockResponse();
    jest.spyOn(Term, 'findOne').mockImplementation(() => {
      throw Error();
    });
    await ideaController.createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: [customMessages.errors.internalError]
    });
  });
 })
})
