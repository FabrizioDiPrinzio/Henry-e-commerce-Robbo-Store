import React from 'react';
import './AgregarCategoria.css';
import { Link } from 'react-router-dom';
// ----- FIN IMPORTS -----

export default function AgregarCategoria(){


  return(
      <Link to={""}>
        <button type="button" className="btn btn-primary" value="Agregar Categoria">Agregar Categoria</button>
      </Link>
  );
}
