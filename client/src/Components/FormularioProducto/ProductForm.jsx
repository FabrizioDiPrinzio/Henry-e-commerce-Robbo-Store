import React from 'react';
import './ProductForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const categorias = ['Educativos', 'Domesticos', 'Industriales', 'Arduino', 'Juguetes'];

const urlBack = process.env.REACT_APP_API_URL;

// async function fetchCategorias() {
// 	const categorias = await axios.get(`${urlBack}/products/category/names`);

// 	console.log(categorias.data);

// 	return categorias.data.map(categoria => {
// 		return categoria.name;
// 	});
// }

// const categorias = fetchCategorias();

export default class FormularioProducto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			act: 0,
			index: '',
			datas: []
		};
	}

	fSubmit = e => {
		e.preventDefault();
		let datas = this.state.datas;
		let nombre = this.refs.nombre.value;
		let cant = this.refs.cantidad.value;
		let img = this.refs.imagen.value;
		let prodCats = [];
		let desc = this.refs.descripcion.value;
		let precio = this.refs.precio.value;

		let checks = document.getElementsByClassName('checks');
		for (let i = 0; i < categorias.length; i++) {
			if (checks[i].checked === true) {
				prodCats.push(checks[i].value);
			}
		}

		if (this.state.act === 0) {
			let data = {nombre, cant, img, prodCats, desc, precio};
			datas.push(data);

			axios.post(`${urlBack}/products`, {
				name: data.nombre,
				price: data.precio,
				stock: data.cant,
				image: data.img,
				description: data.desc
			});
		}
		else {
			let index = this.state.index;
			datas[index].nombre = nombre;
			datas[index].cant = cant;
			datas[index].prodCats = prodCats;
			datas[index].img = img;
			datas[index].desc = desc;
			datas[index].precio = precio;
		}

		this.setState({
			datas: datas,
			act: 0
		});

		this.refs.form.reset();
	};

	fRemove = i => {
		let datas = this.state.datas;
		datas.splice(i, 1);
		this.setState({
			datas: datas
		});

		this.refs.form.reset();
	};

	fEdit = i => {
		let data = this.state.datas[i];
		this.refs.nombre.value = data.nombre;
		this.refs.cantidad.value = data.cant;
		this.refs.precio.value = data.precio;
		this.refs.imagen.value = data.img;
		[] = data.prodCats;
		this.refs.descripcion.value = data.desc;

		this.setState({
			act: 1,
			index: i
		});
	};

	render() {
		let datas = this.state.datas;
		return (
			<div>
				<form ref="form" className="form">
					<h3 className="titulo">Agregar Producto</h3>
					<label htmlFor="NombreLab" className="">
						Nombre:{' '}
					</label>
					<input
						className="NameIn"
						type="text"
						ref="nombre"
						placeholder="Nombre del Producto"
					/>
					<br />
					<label htmlFor="CantidadLab" className="">
						Cantidad:{' '}
					</label>
					<input className="CantIn" type="text" ref="cantidad" placeholder="Cantidad" />
					<br />
					<label htmlFor="Precio" className="">
						Precio:{' '}
					</label>
					<input className="Precio" type="text" ref="precio" placeholder="Precio" />
					<br />
					<label htmlFor="ImgLab" className="">
						Imagen:{' '}
					</label>
					<input className="ImgIn" type="text" ref="imagen" placeholder="URL de la imagen" />
					<br />
					<label className="CatLab">Categoría: </label>
					<div cassName="CatList">
						{categorias.map((el, i) => {
							return (
								<label>
									<input type="checkbox" className="checks" value={el} />
									{el}
								</label>
							);
						})}
					</div>
					<button type="button" className="submitCatBtn">
						Agregar nueva categoría
					</button>
					<br />
					<label className="DescLab">Descripción:</label>
					<textarea
						ref="descripcion"
						className="descripcion"
						placeholder="Agregue descripción del producto"
					/>
					<br />
					<button onClick={e => this.fSubmit(e)} className="submitBtn">
						Agregar Producto
					</button>
				</form>
				<pre>
					{datas.map((data, i) => (
						<li key={i} className="miLista">
							{i + 1}. {data.nombre}, {data.cant}, {data.img}, , {data.precio}
							{data.prodCats.map(e => e + ' ')}, {data.desc}
							<button onClick={() => this.fRemove(i)} className="deleteBtn">
								Eliminar
							</button>
							<button onClick={() => this.fEdit(i)} className="editBtn">
								Editar
							</button>
						</li>
					))}
				</pre>
			</div>
		);
	}
}
