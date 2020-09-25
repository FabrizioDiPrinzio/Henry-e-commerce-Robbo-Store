import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Table} from 'react-bootstrap';
import {success, failure} from '../../multimedia/SVGs';
import './ProductForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductFormFunction({preSelected}) {
	// Redux
	const categories = useSelector(state => state.categories.allCategories);

	// React Hooks
	const [inputValues, setInputValues] = useState({
		name: '',
		price: '',
		stock: '',
		description: ''
	});
	const [products, setProducts] = useState([]);
	const [update, setUpdate] = useState(false);
	const [checkboxes, setCheckboxes] = useState([]);
	const [selected, setSelected] = useState(0);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const lista = useRef(0);

	const [images, setImages] = useState([]);
	const [mainImage, setMainImage] = useState('');
	const [newImage, setnewImage] = useState('');

	// Auxiliary functions
	function resetFields() {
		setSelected(0);
		lista.current.value = 0;
		setInputValues({
			name: '',
			price: '',
			stock: '',
			description: ''
		});
		resetCheckboxes();
	}

	function resetCheckboxes() {
		checkboxes.map(c => {
			c.add = false;
			c.modified = false;
			return c;
		});
	}

	function resetImages() {
		setImages([]);
	}

	// ------------  Functionality ----------------------

	// Fetches the products from the backend
	useEffect(
		() => {
			axios
				.get(`${urlBack}/products`)
				.then(res => setProducts(res.data))
				.catch(err => console.log(err.response.data));
		},
		[update]
	);

	// If a preSelected bot comes in props
	useEffect(() => {
		if (preSelected) {
			const eventWrapper = {target: {}};
			eventWrapper.target.value = preSelected.id;
			handleSelectChange(eventWrapper);
		}
	}, []);

	// Creates category checkboxes
	useEffect(
		() => {
			const categoryTypes = categories.map(c => ({
				name: c.name,
				id: c.id,
				add: false,
				modified: false
			}));

			setCheckboxes(categoryTypes);
		},
		[categories]
	);

	// Lets you add an image with the enter key without needing to click the button.
	const onImageEnterKey = e => {
		if (e.key === 'Enter') handleAddImg(e);
	};

	// Updates the state when something is written in the forms
	const handleInputChange = event => {
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	// Updates the state when something is written in the numbers. Can't be a negative number.
	const handleNumberChange = event => {
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');
		const value = parseInt(event.target.value);
		setInputValues({...inputValues, [event.target.name]: value >= 0 ? value : 0});
	};

	// Sets which product is currently being selected
	const handleSelectChange = event => {
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');

		// Unchecks all categories
		resetCheckboxes();

		const selectedId = parseInt(event.target.value);
		setSelected(selectedId);

		if (selectedId > 0) {
			const currentProduct = products.find(p => p.id === selectedId);
			setInputValues(currentProduct);
			const imagenes = currentProduct.pics.map(i => {
				return i.imageUrl;
			});
			setImages(imagenes);
			setMainImage(currentProduct.image);

			// If the product has a category, it is checked, else it is unchecked
			currentProduct.categories.map(productCategory => {
				checkboxes.map(category => {
					if (category.id === productCategory.id) category.add = true;
					return category;
				});
				return productCategory;
			});
		}
		else {
			setInputValues({
				name: '',
				price: '',
				stock: '',
				description: ''
			});
			setImages([]);
		}
	};

	// Sets which categories are being checked
	const handleCategoryChecks = event => {
		const checkbox = event.target;
		const modifiedCategories = [...checkboxes];
		modifiedCategories[checkbox.value].add = checkbox.checked;
		modifiedCategories[checkbox.value].modified = !modifiedCategories[checkbox.value].modified;
		setCheckboxes(modifiedCategories);
	};

	// Sets which is the main image
	const handleImageRadios = event => setMainImage(event.target.value);

	const handleAddImg = event => {
		event.preventDefault();
		images.push(newImage);
		setnewImage('');
	};

	const handleDeleteImg = event => {
		event.preventDefault();

		const updatedTable = images.filter(i => i !== event.target.value);
		setImages(updatedTable);
	};

	// Creates products
	const handleAdd = async event => {
		event.preventDefault();

		const changedState = {...inputValues, images, mainImage: mainImage || images[0], id: null};

		// If a user selects a preexisting product with some checkboxes, they should still be able to add those categories.
		const checkedCategories = checkboxes.map(c => {
			if (c.add) c.modified = true;
			if (!c.add) c.modified = false;
			return c;
		});

		const modifiedCategories = checkedCategories.filter(cat => cat.modified);

		try {
			// Creates the new product
			const newProduct = await axios.post(`${urlBack}/products`, changedState);

			for await (const cat of modifiedCategories) {
				axios.post(`${urlBack}/products/${newProduct.data.id}/category/${cat.id}`);
			}

			setSuccessMessage('El producto se agregó existosamente');
			resetFields();
			resetImages();
			setUpdate(!update);
		} catch (error) {
			setErrorMessage(error.response.data);
		}
	};

	// Deletes the selected product
	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/${selected}`)
			.then(() => {
				setSuccessMessage('El producto se borró existosamente');
				resetFields();
				resetImages();
				setUpdate(!update);
			})
			.catch(error => setErrorMessage(error.response.data));
	};

	// Edits the selected product
	const handleEdit = async event => {
		event.preventDefault();

		const changedState = {...inputValues, images, mainImage};

		const modifiedCategories = checkboxes.filter(cat => cat.modified);

		try {
			const changedProduct = await axios.put(`${urlBack}/products/${selected}`, changedState);

			for await (const cat of modifiedCategories) {
				if (cat.add)
					axios.post(`${urlBack}/products/${changedProduct.data.id}/category/${cat.id}`);
				if (!cat.add)
					axios.delete(`${urlBack}/products/${changedProduct.data.id}/category/${cat.id}`);
			}

			setSuccessMessage('El producto fue editado existosamente');
			resetFields();
			resetImages();
			setUpdate(!update);
		} catch (error) {
			setErrorMessage(error.response.data);
		}
	};

	return (
		<div>
			<form className="prodForm">
				<h3 className="titulo">Agregar producto</h3>
				<div className="">
					<div className="inpt">
						<label htmlFor="NombreLab" className="">
							Nombre:
						</label>
						<input
							className="NameIn"
							type="text"
							name="name"
							value={inputValues.name}
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
							value={inputValues.stock}
							type="number"
							placeholder="Cantidad"
							onChange={handleNumberChange}
						/>
					</div>
					<div className="inpt">
						<label htmlFor="Precio" className="">
							Precio:
						</label>
						<input
							className="Precio"
							name="price"
							value={inputValues.price}
							type="number"
							placeholder="Precio"
							onChange={handleNumberChange}
						/>
					</div>
				</div>
				<div className="inpt">
					<label className="DescLab">Descripción:</label>
					<textarea
						className="description"
						name="description"
						value={inputValues.description}
						placeholder="Agregue descripción del producto"
						onChange={handleInputChange}
					/>
				</div>

				<div className="inpt">
					<label className="CatLab">Categorías: </label>
					{checkboxes.map((categoria, i) => {
						return (
							<label key={categoria.id} className="checkLab">
								<input
									type="checkbox"
									className="checks"
									value={i}
									checked={categoria.add}
									onChange={handleCategoryChecks}
								/>
								{categoria.name}
							</label>
						);
					})}
				</div>
				<hr />

				<div className="picsTable">
					<h5>Agregar Imagen</h5>
					<div className="inpt">
						<form>
							<input
								className="imageInput"
								type="text"
								autocomplete="off"
								value={newImage}
								onChange={e => setnewImage(e.target.value)}
								onKeyPress={onImageEnterKey}
								placeholder="URL de la imagen"
							/>{' '}
							<button onClick={handleAddImg} className="submitBtn" type="button">
								Agregar imagen
							</button>
						</form>
						<br />
						<Table>
							<thead>
								<tr class="picsTableRow">
									<th>Imagen</th>
									<th>Principal?</th>
									<th>Eliminar</th>
								</tr>
							</thead>
							<tbody>
								{images.map(image => (
									<tr key={image}>
										<td>
											<img className="prodImg" src={image} />
										</td>
										<input
											type="radio"
											name="mainImage"
											className="checks"
											value={image}
											checked={mainImage === image}
											onChange={handleImageRadios}
										/>
										<td>
											<button
												className="deleteBtn"
												type="button"
												value={image}
												onClick={handleDeleteImg}
											>
												Eliminar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</div>

				<button onClick={handleAdd} className="submitBtn">
					Agregar producto
				</button>

				<div className="adit">
					<div className={'botonOpcion'}>
						<h4 className="titulo">Editar / Eliminar producto</h4>

						<select
							className="product-form-control"
							ref={lista}
							id="select"
							defaultValue={preSelected ? preSelected.id : '0'}
							onChange={handleSelectChange}
							size="6"
						>
							<option value="0">Robots...</option>
							{products.map(product => {
								return (
									<option value={product.id} key={product.id}>
										{product.name}
									</option>
								);
							})}
						</select>

						<button type="submit" className="editBtn2" value="Editar" onClick={handleEdit}>
							Editar
						</button>
						<button
							type="submit"
							className="deleteBtn"
							value="Eliminar"
							onClick={handleDelete}
						>
							Eliminar
						</button>
					</div>
					{errorMessage && (
						<div className="error">
							{failure} {errorMessage} <br />
						</div>
					)}
					{successMessage && (
						<div className="success">
							{success} {successMessage} <br />
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
