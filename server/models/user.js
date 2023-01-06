module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      default: '',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
        },
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  return User
}
