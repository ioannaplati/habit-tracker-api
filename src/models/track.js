const track = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    'Track',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cashed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false },
  );

  Track.associate = models => {
    Track.belongsTo(models.Habit, { foreignKey: 'habitId' });
    Track.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Track;
};

module.exports = track;
