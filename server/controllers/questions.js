const Question = require('../models').Question;
const Answer = require('../models').Answer;
const sequelize = require('sequelize');

module.exports = {
  create(req, res) {
    const questions = req.body;
    if(Array.isArray(req.body)) {
      const promises = questions.map(question =>
        Question.create({
          tags: question.tags,
          title: question.title,
          code: question.code,
          answers: question.answers
        }, {
          include: [{
            model: Answer,
            as: 'answers',
          }],
        }));
      Promise.all(promises)
        .then(results => res.send(results))
        .catch(error => res.status(400).send(error));
    } else {
      const promise = Question.create({
          tags: req.body.tags,
          title: req.body.title,
          code: req.body.code,
          answers: req.body.answers
        }, {
          include: [{
            model: Answer,
            as: 'answers',
          }],
        }
      );
      Promise.resolve(promise)
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
    }
  },
  list(req, res) {
    Question.findAll({
      order: [
        [sequelize.fn('RANDOM')],
      ],
      limit: 3,
      include: [{
        model: Answer,
        as: 'answers',
      }]
    }).then(questions => res.send(questions))
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    Question.findById(req.body.id)
      .then(question => {
        if(!question) {
          res.status(404).send({
            message: 'Question Not Found!',
          });
        }
        question.destroy()
          .then(() => res.send({
            id: req.body.id,
            message: 'Question deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
