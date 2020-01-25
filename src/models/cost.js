const cost = (sequelize, DataTypes) => {
  const Cost = sequelize.define('cost', {
    description: DataTypes.STRING,
    amount: DataTypes.NUMERIC,
    source: DataTypes.STRING,
    account: DataTypes.String
  });

  Cost.associate = models => {
    Cost.belongsTo(models.User);
  };

  return Cost;
};

export default cost;
