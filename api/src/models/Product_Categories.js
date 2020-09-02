const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
sequelize.define('product_categories', {

    // idProduct:{

    //     },

    // idCategories:{

    //     }
    });
};


//Tabla intermedia que guarda el id de productos y de categorias