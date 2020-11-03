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
  };

  return Track;
};

module.exports = track;
