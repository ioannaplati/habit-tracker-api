const habit = (sequelize, DataTypes) => {
  const Habit = sequelize.define(
    'Habit',
    {
      // Model attributes
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      occurrence: {
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

  Habit.associate = models => {
    Habit.hasMany(models.Track, {
      foreignKey: 'habitId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Habit;
};

module.exports = habit;
