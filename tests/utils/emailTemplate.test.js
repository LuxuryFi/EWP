const { email } = require('../../src/configs/config');
const emailTemplate = require('../../src/utils/emailTemplate');

test('Test emailtemplate', () => {
  const slug = 'account_created'
  emailTemplate.accountCreatedTemplate('name', 'username', '123123');
  emailTemplate.ideaCommentTemplate('name', 'username', '123123',1,1);
  emailTemplate.ideaCreatedTemplate('name', 'username', '123123','123123','test');
  emailTemplate.resetPasswordTemplate('name', 'username', '123123','13123');

  expect(0).toBe(0);
})