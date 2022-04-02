const {
  Department, User
} = require('../../src/models/index');
const deparmentController = require('../../src/controllers/departmentController');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');


const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test department controller', () => {

  describe('Test create deparment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return res status 200 and department data', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Department, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });
      const res = mockResponse();

      await deparmentController.createDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          created_date: "2022-04-01T18:32:46.217Z",
          department_id: 6,
          department_name: "Marketing1",
          description: "Test",
          manager_id: 69
        },
      });
    })

    it('should return res status 400 and department data', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(Department, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 12312
      });
      const res = mockResponse();

      await deparmentController.createDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["User not found"] },
      );
    })
  })

  describe('Test update deparment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return res status 200 and true', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 74,
      });

      jest.spyOn(Department, 'update').mockResolvedValue([1]);
      const res = mockResponse();

      await deparmentController.updateDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [1]
      });
    })

    it('should return res status 400 and false, cannot found department', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce(undefined);
      await deparmentController.updateDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        data: [0]
      });
    })

    it('should return res status 400 and false, cannot found user', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 74,
      });

      jest.spyOn(Department, 'update').mockResolvedValue([1]);
      const res = mockResponse();

      await deparmentController.updateDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [0]
      });
    })
  })
})
