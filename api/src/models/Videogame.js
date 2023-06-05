const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validation: {
        min: 0,
        max: 10,
      }
    },

    // platforms: {
    //
    // },
    //
    // releaseDate: {
    //
    // },
    //
    // image: {
    //
    // }

  });
};
