const track = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    habitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Track.associate = models => {
    Track.belongsTo(models.Habit);
  };

  return Track;
};

module.exports = track;
