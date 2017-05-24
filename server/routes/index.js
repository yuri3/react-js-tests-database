const questionsController = require('../controllers/questions');

module.exports = (app) => {
  app.post('/test/questions', questionsController.create);
  app.get('/test/questions', questionsController.list);
  app.delete('/test/questions', questionsController.destroy);
};
