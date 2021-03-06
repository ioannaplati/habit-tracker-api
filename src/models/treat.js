const treat = (sequelize, DataTypes) => {
  const Treat = sequelize.define(
    'Treat',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false },
  );

  Treat.associate = models => {
    Treat.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Treat;
};

module.exports = treat;
