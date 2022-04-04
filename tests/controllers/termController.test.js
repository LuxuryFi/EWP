jest.useFakeTimers();
const {
  Term, User
} = require('../../src/models/index');
const termController = require('../../src/controllers/termController');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test term controller', () => {
  describe('Test create term', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and term data', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Term, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        term_id: 6,
        term_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });
      const res = mockResponse();

      await termController.createTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          created_date: "2022-04-01T18:32:46.217Z",
          term_id: 6,
          term_name: "Marketing1",
          description: "Test",
          manager_id: 69
        },
      });
    })

    it('it should return res status 500 and user not found', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Term, 'create').mockResolvedValue(undefined);
      const res = mockResponse();

      await termController.createTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })

    it('it should return res status 500 and throw internal error', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Term, 'create').mockResolvedValue(undefined);
      const res = mockResponse();

      await termController.createTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })

    it('it should return res status 500 and throw internal error in catch', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Term, 'create').mockImplementation(() => {
        throw Error();
      })
      const res = mockResponse();

      await termController.createTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test update term', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        term_id: 6,
        term_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 74,
      });

      jest.spyOn(Term, 'update').mockResolvedValue([1]);
      const res = mockResponse();

      await termController.updateTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [1]
      });
    })

    it('should return res status 500 and false, cannot found term', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };
      const res = mockResponse();
      jest.spyOn(Term, 'findOne').mockResolvedValueOnce(undefined);
      await termController.updateTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errors: ["Term not found"] },);
    })

    it('it should return res status 404 and false, throw internal error', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        term_id: 6,
        term_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Term, 'update').mockResolvedValue(undefined);

      const res = mockResponse();

      await termController.updateTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        { errors: [undefined] },
      );
    })

    it('it should return res status 500 and false, throw internal error', async () => {
      const req = {
        body: {
          term_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        term_id: 6,
        term_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Term, 'update').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await termController.updateTerm(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test get one term', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          term_id: 6
        },
      };

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        term_id: 6,
        term_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });

      const res = mockResponse();

      await termController.getOneTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          updated_date: "2022-04-01T18:32:46.217Z",
          term_id: 6,
          term_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }
      });
    })

    it('it should return res status 500 and term not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Term, 'findOne').mockResolvedValueOnce(null);

      const res = mockResponse();

      await termController.getOneTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Term not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Term, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await termController.getOneTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test get all term', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        
      };

      jest.spyOn(Term, 'findAll').mockResolvedValueOnce([{
        updated_date: "2022-04-01T18:32:46.217Z",
        term_id: 6,
        term_name: "Marketing1",
        description: "Test",
        manager_id: 69
      }]);

      const res = mockResponse();

      await termController.getTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [{
          updated_date: "2022-04-01T18:32:46.217Z",
          term_id: 6,
          term_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }]
      });
    })

    it('should return res status 500 and term not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Term, 'findAll').mockResolvedValueOnce(null);

      const res = mockResponse();

      await termController.getTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Term not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Term, 'findAll').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await termController.getTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test delete term', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          term_id: 6
        }
      };

      jest.spyOn(Term, 'destroy').mockResolvedValueOnce(true);

      const res = mockResponse();

      await termController.deleteTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: true
      });
    })

    it('it should return res status 500 and throw internal out catch', async () => {
      const req = {
        params: {
          term_id: 6
        }
      };

      jest.spyOn(Term, 'destroy').mockResolvedValueOnce(false);

      const res = mockResponse();

      await termController.deleteTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: ["Something went wrong please try again"],
       });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Term, 'destroy').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await termController.deleteTerm(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })

    
  })
})
