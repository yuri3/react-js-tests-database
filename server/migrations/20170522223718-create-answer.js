module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Answers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isTrue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Questions',
          key: 'id',
          as: 'questionId',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    }),
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Answers'),
};
