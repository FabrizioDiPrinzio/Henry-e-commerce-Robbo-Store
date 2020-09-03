import React from 'react';
import './ProductForm.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//------ Fin de imports -----


var categorias = ['Educativos','Domesticos','Industriales','Arduino','Juguetes'];

export default class FormularioProducto extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        act: 0,
        index:'',
        datas: []
      }
  }

  fSubmit = (e) => {
    e.preventDefault();
    let datas = this.state.datas;
    let nombre = this.refs.nombre.value;
    let cant = this.refs.cantidad.value;
    let img = this.refs.imagen.value;
    let prodCats = [];
    let desc = this.refs.descripcion.value;

    let checks =document.getElementsByClassName('checks');
    for(let i=0; i<categorias.length; i++) {
      if(checks[i].checked === true) {
        prodCats.push(checks[i].value);
      }
    }

    if(this.state.act === 0){
      let data = {nombre, cant, img, prodCats, desc}
      datas.push(data);
    }else{
      let index = this.state.index;
      datas[index].nombre = nombre;
      datas[index].cant = cant;
      datas[index].prodCats = prodCats;
      datas[index].img = img;
      datas[index].desc = desc;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.form.reset();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.form.reset();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.nombre.value = data.nombre;
    this.refs.cantidad.value = data.cant;
    this.refs.imagen.value = data.img;
    [] = data.prodCats;
    this.refs.descripcion.value = data.desc;

    this.setState({
      act: 1,
      index: i
    });
  }

  render() {
    let datas = this.state.datas;
    return (
      <div>
        <form ref="form" classname="form">
          <h3 className="titulo">Agregar Producto</h3>
          <label htmlFor="NombreLab" className="">Nombre: </label>
  				<input
  					className="NameIn"
  					type="text"
  					ref="nombre"
  					placeholder="Nombre del Producto"
  				/>
          <br/>
          <label htmlFor="CantidadLab" className="">Cantidad: </label>
  				<input
  					className="CantIn"
  					type="text"
  					ref="cantidad"
  					placeholder="Cantidad"
  				/>
          <br/>
          <label htmlFor="ImgLab" className="">Imagen: </label>
  				<input
  					className="ImgIn"
  					type="text"
  					ref="imagen"
  					placeholder="URL de la imagen"
  				/>
          <br/>
          <label className="CatLab">Categoría: </label>
          <div cassName='CatList'>
            { categorias.map((el,i) => {
              return (<label><input
                type="checkbox"
                class="checks"
                value={el}
              />{el}</label>)
              }) }
          </div>
          <button type="button" classname="submitCatBtn">Agregar nueva categoría</button>
          <br/>
          <label className="DescLab">
            Descripción:
          </label>
          <textarea ref="descripcion" className="descripcion" placeholder="Agregue descripción del producto"></textarea>
          <br/>
          <button onClick={(e)=>this.fSubmit(e)} className="submitBtn">Agregar Producto</button>
  			</form>
        <pre>
          {datas.map((data,i) =>
            <li key={i} className="miLista">
              {i+1}. {data.nombre}, {data.cant}, {data.img}, {data.prodCats.map(e=> e+' ')}, {data.desc}
              <button onClick={()=>this.fRemove(i)} className="deleteBtn">Eliminar</button>
              <button onClick={()=>this.fEdit(i)} className="editBtn">Editar</button>
            </li>
          )}
        </pre>
      </div>
      );
    }
  }
