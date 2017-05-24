module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isTrue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models)=> {
        Answer.belongsTo(models.Question, {
          foreignKey: 'questionId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Answer;
};
