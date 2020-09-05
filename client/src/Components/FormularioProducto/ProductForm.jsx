import React, {useState, useEffect, useRef} from 'react';
import './ProductForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductFormFunction() {
	const [state, setState] = useState({
		name: null,
		price: null,
		stock: null,
		image: null,
		description: null
	});
	const [categories, setCategories] = useState([]);
	const [robots, setRobots] = useState([]);
	const [update, setUpdate] = useState(false);
	const [selected, setSelected] = useState({id: 0});
	const lista = useRef(0);

	useEffect(() => {
		axios.get(`${urlBack}/products/category/names`).then(res => {
			const categoryTypes = res.data.map(c => ({
				name: c.name,
				id: c.id,
				add: null
			}));
			setCategories(categoryTypes);
		});
	}, []);

	useEffect(
		() => {
			axios.get(`${urlBack}/products`).then(res => {
				const robotTypes = res.data.map(c => ({
					name: c.name,
					id: c.id
				}));
				setRobots(robotTypes);
			});
		},
		[update]
	);

	useEffect(
		() => {
			axios.get(`${urlBack}/products/${selected.id}`).then(res => {
				setState({
					name: res.data[0] ? res.data[0].name : '',
					price: res.data[0] ? res.data[0].price : '',
					stock: res.data[0] ? res.data[0].stock : '',
					image: res.data[0] ? res.data[0].image : '',
					description: res.data[0] ? res.data[0].description : ''
				});
			});
		},
		[selected]
	);

	const handleInputChange = event => setState({...state, [event.target.name]: event.target.value});

	const handleSelectChange = event => {
		setSelected({id: event.target.value});
	};

	const handleChecks = event => {
		const modifyCategories = [...categories];
		modifyCategories[event.target.value].add = event.target.checked;
		setCategories(modifyCategories);
	};

	const handleAdd = event => {
		event.preventDefault();

		axios
			.post(`${urlBack}/products`, state) // Creates the product
			.then(res => {
				alert(res.statusText);
				setUpdate(!update);
				setSelected({id: 0});
				lista.current.value = 0;

				const productId = res.data.id;
				return productId;
			})
			.then(productId => {
				categories.map(cat => {
					if (cat.add) axios.post(`${urlBack}/products/${productId}/category/${cat.id}`); // Adds all checked categories to the product
				});
			})
			.catch(error => alert('no se pudo agregar el producto: ' + error));
	};

	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/${selected.id}`) // Deletes the product
			.then(response => {
				alert(response.statusText);
				setUpdate(!update);
				setSelected({id: 0});
				lista.current.value = 0;
			})
			.catch(error => alert('no se pudo eliminar el robot: ' + error.message));
	};

	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/products/${selected.id}`, state)
			.then(response => {
				alert(response.statusText);
				setUpdate(!update);
				setSelected({id: 0});
				lista.current.value = 0;
			})
			.catch(error => alert('no se pudo editar el robot: ' + error.message));
	};

	return (
		<div>
			<form className="form">
				<h3 className="titulo">Agregar producto</h3>
				<div className="InputContainer">
					<div className="inpt">
						<label htmlFor="NombreLab" className="">
							Nombre:
						</label>
						<input
							className="NameIn"
							type="text"
							name="name"
							value={state.name}
							placeholder="Nombre del Producto"
							onChange={handleInputChange}
						/>
					</div>
					<div className="inpt">
						<label htmlFor="CantidadLab" className="">
							Cantidad:
						</label>
						<input
							className="CantIn"
							name="stock"
							value={state.stock}
							type="text"
							placeholder="Cantidad"
							onChange={handleInputChange}
						/>
					</div>
					<div className="inpt">
						<label htmlFor="Precio" className="">
							Precio:
						</label>
						<input
							className="Precio"
							name="price"
							value={state.price}
							type="text"
							placeholder="Precio"
							onChange={handleInputChange}
						/>
					</div>
					<div className="inpt">
						<label htmlFor="ImgLab" className="">
							Imagen:
						</label>
						<input
							className="ImgIn"
							name="image"
							value={state.image}
							type="text"
							placeholder="URL de la imagen"
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="inpt">
					<label className="DescLab">Descripción:</label>
					<textarea
						className="description"
						name="description"
						value={state.description}
						placeholder="Agregue descripción del producto"
						onChange={handleInputChange}
					/>
				</div>

				<div className="inpt">
					<label className="CatLab">Categorías: </label>
					{categories.map((categoria, i) => {
						return (
							<label className="checkLab">
								<input
									type="checkbox"
									className="checks"
									value={i}
									onChange={handleChecks}
								/>
								{categoria.name}
							</label>
						);
					})}
				</div>

				<button onClick={handleAdd} className="submitBtn">
					Agregar producto
				</button>
			</form>

			<div className="adit">
				<div className={'botonOpcion'}>
					<h4 className="titulo">Editar / Eliminar producto</h4>

					<select ref={lista} id="select" onChange={handleSelectChange}>
						<option selected value="0">
							Robots...
						</option>
						{robots.map(robot => {
							return <option value={robot.id}>{robot.name}</option>;
						})}
					</select>
					<button type="submit" className="editBtn" value="Editar" onClick={handleEdit}>
						Editar
					</button>
					<button
						type="submit"
						type="reset"
						className="deleteBtn"
						value="Eliminar"
						onClick={handleDelete}
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}
