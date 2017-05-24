module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Question.hasMany(models.Answer, {
          foreignKey: 'questionId',
          as: 'answers',
        });
      },
    },
  });
  return Question;
};
