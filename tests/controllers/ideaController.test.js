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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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
      }, {
        document_id: 4,
        filename: "Test.png",
        idea_id: 10,
        file_type: 'zip'
      }])

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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }]
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

  describe('Test get idea', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })

    it('it should return status code 200 and idea data', async () => {
      const req = {
        query: {
          department_id: 1,
          user_id: 1,
          term_id: 1,
          idea_id: 1,
          category_id:1,
        }
      };
      const res = mockResponse();

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce([{
        "idea_id": 28,
        "department": {
          "department_name": "Marketing",
        },
        "category": {
          "category_name": "Test Update 1",
        },
        "term": {
          "term_name": "Test111",
        },
        "user": {
          "full_name": "Nguyen Quoc Anh",
        },
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "created_date": "2022-03-22T02:03:01.000Z",
        "updated_date": null
      }]);

      jest.spyOn(IdeaVote, 'count').mockResolvedValueOnce(1);

      jest.spyOn(IdeaVote, 'count').mockResolvedValueOnce(0);

      await ideaController.getIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [{
          "idea_id": 28,
          "department_name": "Marketing",
          "category_name": "Test Update 1",
          "term_name": "Test111",
          "full_name": "Nguyen Quoc Anh",
          "title": "title",
          "description": "ababsbabs",
          "status": "final_closure",
          "count_like": 1,
          "count_dislike": 0,
          "created_date": "2022-03-22T02:03:01.000Z",
          "updated_date": null
        }]
      });
    });

    it('it should return status code 500 and idea not found', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        }
      };
      const res = mockResponse();

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce(undefined);

      await ideaController.getIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.ideaNotFound]
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        }
      };
      const res = mockResponse();

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce([{
        "idea_id": 28,
        "category": {
          "category_name": "Test Update 1",
        },
        "term": {
          "term_name": "Test111",
        },
        "user": {
          "full_name": "Nguyen Quoc Anh",
        },
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "created_date": "2022-03-22T02:03:01.000Z",
        "updated_date": null
      }]);

      jest.spyOn(IdeaVote, 'count').mockResolvedValueOnce(1);

      jest.spyOn(IdeaVote, 'count').mockResolvedValueOnce(0);

      await ideaController.getIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    });
  });

  describe('Test export idea', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })

    it('it should return status code 200 and idea data', async () => {
      const req = {
        query: {
          department_id: 1,
          user_id:1,
          term_id: 1,
          idea_id: 1,
          category_id: 1,
        }
      };
      const res = mockResponse();

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce([{
        "idea_id": 28,
        "department": {
          "department_name": "Marketing",
        },
        "category": {
          "category_name": "Test Update 1",
        },
        "term": {
          "term_name": "Test111",
        },
        "user": {
          "full_name": "Nguyen Quoc Anh",
        },
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "created_date": "2022-03-22T02:03:01.000Z",
        "updated_date": null
      }]);

      jest.spyOn(IdeaVote, 'count').mockResolvedValueOnce(1);

      jest.spyOn(IdeaVote, 'count').mockResolvedValueOnce(0);

      await ideaController.exportIdea(req, res);

      fs.writeFileSync = jest.fn();

      fs.writeFileSync.mockResolvedValueOnce(true);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('it should return status code 500 and idea not found', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        }
      };
      const res = mockResponse();

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce(undefined);

      await ideaController.exportIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.ideaNotFound]
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        }
      };
      const res = mockResponse();

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce([{
        "idea_id": 28,
        "category": {
          "category_name": "Test Update 1",
        },
        "term": {
          "term_name": "Test111",
        },
        "user": {
          "full_name": "Nguyen Quoc Anh",
        },
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "created_date": "2022-03-22T02:03:01.000Z",
        "updated_date": null
      }]);

      jest.spyOn(IdeaVote, 'count').mockImplementation(() => {
        throw Error();
      });

      jest.spyOn(View, 'count').mockResolvedValueOnce(0);

      await ideaController.exportIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    });
  });

  describe('Test get one idea', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })

    it('it should return status code 200 and idea data', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        },
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 10,
          full_name: "Nguyen Quoc Anh"
        }
      };
      const res = mockResponse();

      jest.spyOn(View, 'findOne').mockResolvedValueOnce(true);

      jest.spyOn(View, 'create').mockResolvedValueOnce(1);

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce({
        "idea_id": 28,
        "department": {
          "department_name": "Marketing",
        },
        "category": {
          "category_name": "Test Update 1",
        },
        "term": {
          "term_name": "Test111",
        },
        "user": {
          "full_name": "Nguyen Quoc Anh",
          "avatar": "Test"
        },
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "created_date": "2022-03-22T02:03:01.000Z",
        "department_id": 1,
        "category_id": 10,
        "user_id": 5,
        "term_id": 2,
        "updated_date": null,
        "comments": [{
            "user": {
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
            },
            "comment": "Test 1 FROM 5 with ANONYMOUS",
            "created_date": "2022-03-23T16:46:26.000Z",
            "updated_date": null
          },
          {
            "user": {
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
            },
            "comment": "Test 1 FROM 4",
            "created_date": "2022-03-23T16:46:26.000Z",
            "updated_date": null
          },
        ]
      });

      jest.spyOn(IdeaVote, 'findAll').mockResolvedValueOnce([{
          "vote": 1,
          "count": 2
        },
        {
          "vote": 0,
          "count": 1
        }
      ])
      jest.spyOn(View, 'count').mockResolvedValueOnce(7)

      await ideaController.getOneIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": {
          "idea_id": 28,
          "user_id": 5,
          "documents": undefined,
          "full_name": "Nguyen Quoc Anh",
          "avatar": "Test",
          "title": "title",
          "status": "final_closure",
          "description": "ababsbabs",
          "department_name": "Marketing",
          "term_name": "Test111",
          "category_name": "Test Update 1",
          "category_id": 10,
          "term_id": 2,
          "department_id": 1,
          "count": [{
              "vote": 1,
              "count": 2
            },
            {
              "vote": 0,
              "count": 1
            }
          ],
          "comments": [{
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
              "comment": "Test 1 FROM 5 with ANONYMOUS",
              "created_date": "2022-03-23T16:46:26.000Z",
              "updated_date": null
            },
            {
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
              "comment": "Test 1 FROM 4",
              "created_date": "2022-03-23T16:46:26.000Z",
              "updated_date": null
            },
          ],
          "views": 7
        }
      });
    });

    it('it should return status code 200 and idea data 2', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        },
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 10,
          full_name: "Nguyen Quoc Anh"
        }
      };
      const res = mockResponse();

      jest.spyOn(View, 'findOne').mockResolvedValueOnce(false);

      jest.spyOn(View, 'create').mockResolvedValueOnce(1);

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce({
        "idea_id": 28,
        "department": {
          "department_name": "Marketing",
        },
        "category": {
          "category_name": "Test Update 1",
        },
        "term": {
          "term_name": "Test111",
        },
        "user": {
          "full_name": "Nguyen Quoc Anh",
          "avatar": "Test"
        },
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "created_date": "2022-03-22T02:03:01.000Z",
        "department_id": 1,
        "category_id": 10,
        "user_id": 5,
        "term_id": 2,
        "updated_date": null,
        "comments": [{
            "user": {
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
            },
            "comment": "Test 1 FROM 5 with ANONYMOUS",
            "created_date": "2022-03-23T16:46:26.000Z",
            "updated_date": null
          },
          {
            "user": {
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
            },
            "comment": "Test 1 FROM 4",
            "created_date": "2022-03-23T16:46:26.000Z",
            "updated_date": null
          },
        ]
      });

      jest.spyOn(IdeaVote, 'findAll').mockResolvedValueOnce([{
          "vote": 1,
          "count": 2
        },
        {
          "vote": 0,
          "count": 1
        }
      ])
      jest.spyOn(View, 'count').mockResolvedValueOnce(7)

      await ideaController.getOneIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": {
          "idea_id": 28,
          "user_id": 5,
          "documents": undefined,
          "full_name": "Nguyen Quoc Anh",
          "avatar": "Test",
          "title": "title",
          "status": "final_closure",
          "description": "ababsbabs",
          "department_name": "Marketing",
          "term_name": "Test111",
          "category_name": "Test Update 1",
          "category_id": 10,
          "term_id": 2,
          "department_id": 1,
          "count": [{
              "vote": 1,
              "count": 2
            },
            {
              "vote": 0,
              "count": 1
            }
          ],
          "comments": [{
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
              "comment": "Test 1 FROM 5 with ANONYMOUS",
              "created_date": "2022-03-23T16:46:26.000Z",
              "updated_date": null
            },
            {
              "full_name": "Nguyen Quoc Anh",
              "avatar": "img/1649266839-hhh.png",
              "comment": "Test 1 FROM 4",
              "created_date": "2022-03-23T16:46:26.000Z",
              "updated_date": null
            },
          ],
          "views": 7
        }
      });
    });

    it('it should return status code 500 and idea not found', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        },
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 10,
          full_name: "Nguyen Quoc Anh"
        }
      };
      const res = mockResponse();

      jest.spyOn(View, 'findOne').mockResolvedValueOnce(true);

      jest.spyOn(View, 'create').mockResolvedValueOnce(1);

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce(undefined);

      await ideaController.getOneIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.ideaNotFound]
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        query: {
          department_id: '',
          user_id: '',
          term_id: '',
          idea_id: '',
          category_id: '',
        },
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 10,
          full_name: "Nguyen Quoc Anh"
        }
      };
      const res = mockResponse();

      jest.spyOn(View, 'findOne').mockResolvedValueOnce(true);

      jest.spyOn(View, 'create').mockResolvedValueOnce(1);

      jest.spyOn(Idea, 'findOne').mockImplementation(() => {
        throw Error();
      });

      await ideaController.getOneIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    });
  });

  describe('Test update idea', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and idea data', async () => {
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }],
        params: {
          idea_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'update').mockResolvedValueOnce(1);

      jest.spyOn(IdeaDocument, 'bulkCreate').mockResolvedValueOnce(true);

      await ideaController.updateIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: 1
      });
    })

    it('it should return status code 500 and idea not found', async () => {
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }],
        params: {
          idea_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'update').mockResolvedValueOnce(undefined);

      jest.spyOn(IdeaDocument, 'bulkCreate').mockResolvedValueOnce(true);

      await ideaController.updateIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.ideaNotFound]
      });
    })

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        body: {
          category_id: 1,
          description: "Test",
          status: true,
          title: "Test"
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
        }, {
          filename: "Test.png",
          idea_id: 10,
          file_type: 'zip'
        }],
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'update').mockImplementation(() => {
        throw Error();
      })

      jest.spyOn(IdeaDocument, 'bulkCreate').mockImplementation(() => {
        throw Error();
      })
      await ideaController.updateIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    })
  })

  describe('Test delete idea', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and idea data', async () => {
      const req = {
        params: {
          idea_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'destroy').mockResolvedValueOnce(1);

      await ideaController.deleteIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: 1
      });
    })

    it('it should return status code 500 and idea not found', async () => {
      const req = {
        params: {
          idea_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'destroy').mockResolvedValueOnce(false);

      await ideaController.deleteIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.ideaNotFound]
      });
    })

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        params: {
          idea_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'destroy').mockImplementation(() => {
        throw Error();
      });

      await ideaController.deleteIdea(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    })
  })

  describe('Test create comment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    })
    it('it should return status code 200 and comment data', async () => {
      const req = {
        body: {
          comment: 'Test',
          idea_id: 123,
          anonymous: 1
        },
        user: {
          user_id: 6,
        }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce({
        idea_id: 123
      });

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6
      })

      jest.spyOn(IdeaComment, 'create').mockResolvedValueOnce({
        "anonymous": false,
        "created_date": "2022-04-07T02:35:03.590Z",
        "comment_id": 46,
        "user_id": 6,
        "comment": "têttetetet123123",
        "idea_id": 28
      })

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(true)
      emailService.sendEmail = jest.fn();
      emailService.sendEmail.mockResolvedValueOnce(true);
      await ideaController.createComment(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": {
          "anonymous": false,
          "created_date": "2022-04-07T02:35:03.590Z",
          "comment_id": 46,
          "user_id": 6,
          "comment": "têttetetet123123",
          "idea_id": 28
        }
      });


    })

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        body: {
          comment: 'Test',
          idea_id: 123,
          anonymous: 1
        },
        // user: {
        //   user_id: 6,
        // }
      }

      const res = mockResponse();

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce({
        idea_id: 123
      });

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6
      })

      jest.spyOn(IdeaComment, 'create').mockResolvedValueOnce({
        "anonymous": false,
        "created_date": "2022-04-07T02:35:03.590Z",
        "comment_id": 46,
        "user_id": 6,
        "comment": "têttetetet123123",
        "idea_id": 28
      })

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(true)
      emailService.sendEmail = jest.fn();
      emailService.sendEmail.mockResolvedValueOnce(true);
      await ideaController.createComment(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    })

    it('it should return status code 500 and account not found', async () => {
      const req = {
        body: {
          comment: 'Test',
          idea_id: 123,
          anonymous: 1
        },
        user: {
          user_id: 6,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'create').mockResolvedValueOnce({
        "anonymous": false,
        "created_date": "2022-04-07T02:35:03.590Z",
        "comment_id": 46,
        "user_id": 6,
        "comment": "têttetetet123123",
        "idea_id": 28
      })

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce({
        idea_id: 123
      });

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      emailService.sendEmail = jest.fn();
      emailService.sendEmail.mockResolvedValueOnce(true);
      await ideaController.createComment(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.userNotFound]
      });
    })

    it('it should return status code 500 and idea not found', async () => {
      const req = {
        body: {
          comment: 'Test',
          idea_id: 123,
          anonymous: 1
        },
        user: {
          user_id: 6,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'create').mockResolvedValueOnce({
        "anonymous": false,
        "created_date": "2022-04-07T02:35:03.590Z",
        "comment_id": 46,
        "user_id": 6,
        "comment": "têttetetet123123",
        "idea_id": 28
      });

      jest.spyOn(Idea, 'findOne').mockResolvedValueOnce(undefined);

      await ideaController.createComment(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.ideaNotFound]
      });
    })

    it('it should return status code 500 and comment not found', async () => {
      const req = {
        body: {
          comment: 'Test',
          idea_id: 123,
          anonymous: 1
        },
        user: {
          user_id: 6,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'create').mockResolvedValueOnce(undefined);

      await ideaController.createComment(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.commentNotFound]
      });
    })
  })

  describe('Test get all comment in idea', () => {
    it('it should return status code 200 and comment data', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockResolvedValueOnce([{
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/male.jpg",
          "gender": "male"
        }
      }, ]);

      await ideaController.getOneComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": [{
          "comment_id": 8,
          "user_id": 5,
          "comment": "This is an ANONYMOUS test comment FROM 4",
          "idea_id": 28,
          "anonymous": true,
          "created_date": "2022-03-23T16:46:26.000Z",
          "updated_date": null,
          "user": {
            "full_name": "anonymous",
            "avatar": "img/male.jpg",
            "gender": "male"
          }
        }, ]
      });
    });

    it('it should return status code 200 and comment data2', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockResolvedValueOnce([{
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/female.jpg",
          "gender": "female"
        }
      }, ]);

      await ideaController.getOneComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": [{
          "comment_id": 8,
          "user_id": 5,
          "comment": "This is an ANONYMOUS test comment FROM 4",
          "idea_id": 28,
          "anonymous": true,
          "created_date": "2022-03-23T16:46:26.000Z",
          "updated_date": null,
          "user": {
            "full_name": "anonymous",
            "avatar": "img/female.jpg",
            "gender": "female"
          }
        }, ]
      });
    });

    it('it should return status code 500 and comment not found', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockResolvedValueOnce(undefined);

      await ideaController.getOneComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.commentNotFound]
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockImplementation(() => {
        throw Error();
      })

      await ideaController.getOneComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    });
  })

  describe('Test get all comments', () => {
    it('it should return status code 200 and comment data', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockResolvedValueOnce([{
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/male.jpg",
          "gender": "male"
        }
      }, ]);

      await ideaController.getComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": [{
          "comment_id": 8,
          "user_id": 5,
          "comment": "This is an ANONYMOUS test comment FROM 4",
          "idea_id": 28,
          "anonymous": true,
          "created_date": "2022-03-23T16:46:26.000Z",
          "updated_date": null,
          "user": {
            "full_name": "anonymous",
            "avatar": "img/male.jpg",
            "gender": "male"
          }
        }, ]
      });
    });

    it('it should return status code 500 and comment not found', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
        user: {
          user_id: 1
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockResolvedValueOnce(undefined);

      await ideaController.getComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.commentNotFound]
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        params: {
          idea_id: 1,
        },
      }

      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findAll').mockImplementation(() => {
        throw Error();
      })

      await ideaController.getComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    });
  })

  describe('Test update comment', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and comment data', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 1
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'update').mockResolvedValueOnce(1);


      await ideaController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": 1
      });
    });

    it('it should return status code 500 and comment not found', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 1
        },
        body: {
          comment: "Test",
          anonymous: 1,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'update').mockResolvedValueOnce(undefined);

      await ideaController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.commentNotFound]
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 1
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'update').mockImplementation(() => {
        throw Error();
      });

      await ideaController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.internalError]
      });
    });
  })

  describe('Test delete comment', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and comment data', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findOne').mockResolvedValueOnce({
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/male.jpg",
          "gender": "male"
        }
      });

      jest.spyOn(IdeaComment, 'destroy').mockResolvedValueOnce(1);

      await ideaController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": 1
      });
    });

    it('it should return status code 500 and have no access', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 51
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findOne').mockResolvedValueOnce({
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/male.jpg",
          "gender": "male"
        }
      });

      jest.spyOn(IdeaComment, 'destroy').mockResolvedValueOnce(1);

      await ideaController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    });

    it('it should return status code 500 and comment not found', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findOne').mockResolvedValueOnce(undefined);

      await ideaController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.commentNotFound],
      });
    });

    it('it should return status code 500 and destroy fail throw internal error', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findOne').mockResolvedValueOnce({
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/male.jpg",
          "gender": "male"
        }
      });

      jest.spyOn(IdeaComment, 'destroy').mockResolvedValueOnce(false);

      await ideaController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.internalError],
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaComment, 'findOne').mockResolvedValueOnce({
        "comment_id": 8,
        "user_id": 5,
        "comment": "This is an ANONYMOUS test comment FROM 4",
        "idea_id": 28,
        "anonymous": true,
        "created_date": "2022-03-23T16:46:26.000Z",
        "updated_date": null,
        "user": {
          "full_name": "anonymous",
          "avatar": "img/male.jpg",
          "gender": "male"
        }
      });

      jest.spyOn(IdeaComment, 'destroy').mockImplementation(() => {
        throw Error();
      })

      await ideaController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.internalError],
      });
    });
  })

  describe('Test vote idea', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and unvoted', async () => {
      const req = {
        body: {
          vote: 1,
          idea_id: 2
        },
        user: {
          user_id: 1,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaVote, 'findOne').mockResolvedValueOnce({
        created_date: "2022-04-07T02:35:03.591Z",
        vote_id: 28,
        user_id: 6,
        vote: 1,
        idea_id: 40
      });

      jest.spyOn(IdeaVote, 'destroy').mockResolvedValueOnce('unvoted')

      await ideaController.vote(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": "unvoted"
      });
    })

    it('it should return status code 200 and vote updated', async () => {
      const req = {
        body: {
          vote: 1,
          idea_id: 2
        },
        user: {
          user_id: 1,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaVote, 'findOne').mockResolvedValueOnce({
        created_date: "2022-04-07T02:35:03.591Z",
        vote_id: 28,
        user_id: 6,
        vote: 0,
        idea_id: 40
      });

      jest.spyOn(IdeaVote, 'update').mockResolvedValueOnce('vote updated')
      await ideaController.vote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": "vote updated"
      });
    })

    it('it should return status code 200 and vote created', async () => {
      const req = {
        body: {
          vote: 1,
          idea_id: 2
        },
        user: {
          user_id: 1,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaVote, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(IdeaVote, 'create').mockResolvedValueOnce({
        created_date: "2022-04-07T02:35:03.591Z",
        vote_id: 28,
        user_id: 6,
        vote: 1,
        idea_id: 40
      })
      await ideaController.vote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": {
          created_date: "2022-04-07T02:35:03.591Z",
          vote_id: 28,
          user_id: 6,
          vote: 1,
          idea_id: 40
        },
      });
    })

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        body: {
          vote: 1,
          idea_id: 2
        },
        user: {
          user_id: 1,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaVote, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(IdeaVote, 'create').mockImplementation(() => {
        throw Error();
      })
      await ideaController.vote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError]
      });
    })

    it('it should return status code 200 and throw internal error create vote fail', async () => {
      const req = {
        body: {
          vote: 1,
          idea_id: 2
        },
        user: {
          user_id: 1,
        }
      }

      const res = mockResponse();

      jest.spyOn(IdeaVote, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(IdeaVote, 'create').mockResolvedValueOnce(undefined)
      await ideaController.vote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: [customMessages.errors.internalError],
      });
    })
  })

  describe('Test get top 10 view', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })

    it('it should return status code 200 and top 10 view', async () => {
      const req = {

      }

      const res = mockResponse();

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        term_id: 1,
      })

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce([{
          "idea_id": 28,
          "department_name": "Marketing",
          "category_name": "Test Update 1",
          "term_name": "Test111",
          "full_name": "Nguyen Quoc Anh",
          "title": "title",
          "description": "ababsbabs",
          "status": "final_closure",
          "count_like": 1,
          "count_dislike": 0,
          "created_date": "2022-03-22T02:03:01.000Z",
          "updated_date": null
      }]);

      jest.spyOn(View, 'findAll').mockResolvedValueOnce([{
        "idea_id": 28,
        "department_name": "Marketing",
        "category_name": "Test Update 1",
        "term_name": "Test111",
        "full_name": "Nguyen Quoc Anh",
        "title": "title",
        "description": "ababsbabs",
        "status": "final_closure",
        "count_like": 1,
        "count_dislike": 0,
        "created_date": "2022-03-22T02:03:01.000Z",
        "updated_date": null
      }]);

      await ideaController.getTop10View(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": [{
          "idea_id": 28,
          "department_name": "Marketing",
          "category_name": "Test Update 1",
          "term_name": "Test111",
          "full_name": "Nguyen Quoc Anh",
          "title": "title",
          "description": "ababsbabs",
          "status": "final_closure",
          "count_like": 1,
          "count_dislike": 0,
          "created_date": "2022-03-22T02:03:01.000Z",
          "updated_date": null
        }]
      });
    })

    it('it should return status code 500 and idea not found 1', async () => {
      const req = {

      }

      const res = mockResponse();

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        term_id: 1,
      })

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce([{
          "idea_id": 28,
          "department_name": "Marketing",
          "category_name": "Test Update 1",
          "term_name": "Test111",
          "full_name": "Nguyen Quoc Anh",
          "title": "title",
          "description": "ababsbabs",
          "status": "final_closure",
          "count_like": 1,
          "count_dislike": 0,
          "created_date": "2022-03-22T02:03:01.000Z",
          "updated_date": null
      }]);

      jest.spyOn(View, 'findAll').mockResolvedValueOnce(undefined);

      await ideaController.getTop10View(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: [customMessages.errors.ideaNotFound],
      });
    })

    it('it should return status code 500 and idea not found2 ', async () => {
      const req = {

      }

      const res = mockResponse();

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        term_id: 1,
      })

      jest.spyOn(Idea, 'findAll').mockResolvedValueOnce(undefined);

      await ideaController.getTop10View(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: [customMessages.errors.ideaNotFound],
      });
    })

    it('it should return status code 500 and term not found', async () => {
      const req = {

      }

      const res = mockResponse();

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce(undefined);

      await ideaController.getTop10View(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: [customMessages.errors.termNotFound],
      });
    })

    it('it should return status code 500 and throw internal error ', async () => {
      const req = {

      }

      const res = mockResponse();

      jest.spyOn(Term, 'findOne').mockImplementation(() => {
        throw Error();
      })
      await ideaController.getTop10View(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: [customMessages.errors.internalError],
      });
    })
  })

  describe('Test delete document', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and document data', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();



      jest.spyOn(IdeaDocument, 'destroy').mockResolvedValueOnce(1);

      await ideaController.deleteDocument(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": 1
      });
    });

    it('it should return status code 500 and cannot delete document', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaDocument, 'destroy').mockResolvedValueOnce(false);

      await ideaController.deleteDocument(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.cannotDeleteDocument],
      });
    });

    it('it should return status code 500 and throw internal error', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();

      jest.spyOn(IdeaDocument, 'destroy').mockImplementation(() => {
        throw Error();
      })

      await ideaController.deleteDocument(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        "errors": [customMessages.errors.internalError],
      });
    });
  })

  describe('Test count for dashboard', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    })
    it('it should return status code 200 and idea data', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();



      jest.spyOn(Idea, 'count').mockResolvedValueOnce(1);

      jest.spyOn(User, 'count').mockResolvedValueOnce(1);


      await ideaController.getCount(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": {
          user: 1,
          idea: 1
        }
      });
    });

    it('it should return status code 200 and admin dashboard', async () => {
      const req = {
        params: {
          comment_id: 1,
        },
        user: {
          user_id: 5
        },
        body: {
          comment: "Test",
          anonymous: 0,
        },
      }
      const res = mockResponse();


      jest.spyOn(Idea, 'count').mockResolvedValueOnce(1);

      jest.spyOn(User, 'count').mockResolvedValueOnce(1);

      jest.spyOn(Department, 'count').mockResolvedValueOnce(1);



      await ideaController.getCountAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "data": {
          user: 1,
          idea: 1,
          department: 1
        }
      });
    });
  })
});
