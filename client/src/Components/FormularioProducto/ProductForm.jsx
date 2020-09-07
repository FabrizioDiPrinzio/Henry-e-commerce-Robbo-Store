import React, {useState, useEffect, useRef} from 'react';
import './ProductForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductFormFunction() {
	const [state, setState] = useState({
		name: '',
		price: '',
		stock: '',
		image: '',
		description: ''
	});
	const [categories, setCategories] = useState([]);
	const [robots, setRobots] = useState([]);
	const [update, setUpdate] = useState(false);
	const [selected, setSelected] = useState({id: 0});
	const lista = useRef(0);

	// Gets all the existing categories and creates checkmarks of each one
	useEffect(() => {
		axios.get(`${urlBack}/products/category/names`).then(res => {
			const categoryTypes = res.data.map(c => ({
				name: c.name,
				id: c.id,
				add: false,
				modified: false
			}));
			setCategories(categoryTypes);
		});
	}, []);

	// Updates the robot list whenever there's a change
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

	// When a product is selected, it fills all the forms with the data of said product
	useEffect(
		() => {
			axios.get(`${urlBack}/products/${selected.id}`).then(res => {
				const data = res.data;
				categories.map(c => {
					c.add = false;
					c.modified = false;
					return c;
				});

				if (res.data) {
					// If the product has a category, it is checked, else it is unchecked
					data.categories.map(d => {
						categories.map(c => {
							if (c.id === d.id) c.add = true;
							return c;
						});
						return d;
					});
					// Sets all the forms to the data of the selected product if said product exists
					setState({
						name: data.name,
						price: data.price,
						stock: data.stock,
						image: data.image,
						description: data.description
					});
				}
				else {
					// Empties all the forms if they select the default option
					setState({
						name: '',
						price: 0,
						stock: 0,
						image: '',
						description: ''
					});
				}
			});
		},
		[selected, categories]
	);

	// Updates the state when something is written in the forms
	const handleInputChange = event => setState({...state, [event.target.name]: event.target.value});

	// Sets which product is currently being selected
	const handleSelectChange = event => setSelected({id: event.target.value});

	// Sets which categories are being checked
	const handleChecks = event => {
		const check = event.target;
		const modifyCategories = [...categories];
		modifyCategories[check.value].add = check.checked;
		modifyCategories[check.value].modified = !modifyCategories[check.value].modified;
		setCategories(modifyCategories);
	};

	// Creates products
	const handleAdd = event => {
		event.preventDefault();

		/*
		the image wrap is a temporary fix. the form should be able
		to send multiple images in an array and the first one will be
		the main image of the product. The other images will be stored
		in the asosiated to the product and sotred in the model named Pics.
		*/
		const wrapedImage = [state.image];
		const changedState = {...state, image: wrapedImage};
		// console.log('Now state.image should be an array with the img')
		// console.log(changedState)

		// Creates the product
		axios
			.post(`${urlBack}/products`, changedState)
			.then(res => {
				alert(res.statusText);
				setUpdate(!update);
				setSelected({id: 0});
				lista.current.value = 0;

				const productId = res.data.id;
				return productId;
			})
			// Adds all checked categories to the product
			.then(productId => {
				categories.map(cat => {
					if (cat.add) axios.post(`${urlBack}/products/${productId}/category/${cat.id}`);
					return cat;
				});
			})
			.catch(error => alert('no se pudo agregar el producto: ' + error.message));
	};

	// Deletes the selected product
	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/${selected.id}`)
			.then(response => {
				alert(response.statusText);
				setUpdate(!update);
				setSelected({id: 0});
				lista.current.value = 0;
			})
			.catch(error => alert('no se pudo eliminar el robot: ' + error.message));
	};

	// Edits the selected product
	const handleEdit = event => {
		event.preventDefault();

		/*
		the image wrap is a temporary fix. The form should be able
		to send multiple images in an array and the first one will be
		the main image of the product. The other images will be stored
		in the asosiated to the product and sotred in the model named Pics.
		*/
		const wrapedImage = [state.image];
		const changedState = {...state, image: wrapedImage};
		// console.log('Now state.image should be an array with the img')
		// console.log(changedState)

		// Edits the product
		axios
			.put(`${urlBack}/products/${selected.id}`, changedState)
			.then(response => {
				alert(response.statusText);
				setUpdate(!update);
				setSelected({id: 0});
				lista.current.value = 0;
			})
			// Adds checked categories and removes unchecked categories if they've been modified
			.then(() => {
				categories.map(cat => {
					if (cat.add && cat.modified) {
						axios.post(`${urlBack}/products/${selected.id}/category/${cat.id}`);
					}
					else if (!cat.add && cat.modified) {
						axios.delete(`${urlBack}/products/${selected.id}/category/${cat.id}`);
					}
					return cat;
				});
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
							type="number"
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
							type="number"
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
									checked={categoria.add}
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

					<select ref={lista} id="select" defaultValue="0" onChange={handleSelectChange}>
						<option value="0">Robots...</option>
						{robots.map(robot => {
							return (
								<option value={robot.id} key={robot.id}>
									{robot.name}
								</option>
							);
						})}
					</select>
					<button type="submit" className="editBtn" value="Editar" onClick={handleEdit}>
						Editar
					</button>
					<button type="submit" className="deleteBtn" value="Eliminar" onClick={handleDelete}>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}
