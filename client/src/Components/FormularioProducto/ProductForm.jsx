import React, {useState, useEffect, useRef} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import './ProductForm.css';
import 'bootstrap/dist/css/bootstrap.css';
//------ Fin de imports -----

const {productActions} = allActions;

export default function ProductFormFunction() {
	// Redux
	const categories = useSelector(state => state.categories.allCategories);
	const productStore = useSelector(state => state.products);
	const {allProducts: products, lastResponse, lastError} = productStore;
	const dispatch = useDispatch();

	// React Hooks
	const [inputValues, setInputValues] = useState({
		name: '',
		price: '',
		stock: '',
		image: '',
		description: ''
	});
	const [checkboxes, setCheckboxes] = useState([]);
	const [selected, setSelected] = useState(0);
	const lista = useRef(0);

	// Auxiliary functions
	function resetFields() {
		setSelected(0);
		lista.current.value = 0;
		setInputValues({
			name: '',
			price: '',
			stock: '',
			image: '',
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

	// ------------  Functionality ----------------------

	// Gets all the categories from the server when the page loads.
	// Refreshes with [categoriesState] in case the user opens this URL first, because then it would be empty.
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

	// Gets all the robots from the server when the page loads
	useEffect(() => {
		dispatch(productActions.getAllProducts());
	}, []);

	// Creates an alert after each successful or failed operation
	useEffect(
		() => {
			if (lastResponse) alert(lastResponse.message);
			if (lastError) alert(lastError);

			// Resets all fields after getting a response from the server
			resetFields();
		},
		[products, lastError]
	);

	// Updates the state when something is written in the forms
	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});

		// If a user selects a preexisting product with some checkboxes, they should still be able to add those categories.
		checkboxes.map(c => {
			if (c.add) c.modified = true;
		});
	};

	// Updates the state when something is written in the numbers. Can't be a negative number.
	const handleNumberChange = event => {
		const value = parseInt(event.target.value);
		setInputValues({...inputValues, [event.target.name]: value >= 0 ? value : 0});

		// If a user selects a preexisting product with some checkboxes, they should still be able to add those categories.
		checkboxes.map(c => {
			if (c.add) c.modified = true;
		});
	};

	// Sets which product is currently being selected
	const handleSelectChange = event => {
		// Unchecks all categories
		resetCheckboxes();

		const selectedId = parseInt(event.target.value);
		setSelected(selectedId);

		if (selectedId > 0) {
			const currentProduct = products.find(p => p.id === selectedId);
			setInputValues(currentProduct);

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
				image: '',
				description: ''
			});
		}
	};

	// Sets which categories are being checked
	const handleChecks = event => {
		const checkbox = event.target;
		const modifiedCategories = [...checkboxes];
		modifiedCategories[checkbox.value].add = checkbox.checked;
		modifiedCategories[checkbox.value].modified = !modifiedCategories[checkbox.value].modified;
		setCheckboxes(modifiedCategories);
	};

	// Creates products
	const handleAdd = event => {
		event.preventDefault();

		/*
		the image wrap is a temporary fix. the form should be able
		to send multiple images in an array and the first one will be
		the main image of the product. The other images will be stored
		in the associated to the product and stored in the model named Pics.
		*/
		const wrappedImage = [inputValues.image];
		const changedState = {...inputValues, image: wrappedImage, id: null};

		const modifiedCategories = checkboxes.filter(cat => cat.modified);

		dispatch(productActions.postProduct(changedState, modifiedCategories));
	};

	// Deletes the selected product
	const handleDelete = event => {
		event.preventDefault();

		dispatch(productActions.deleteProduct(selected));
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
		const wrappedImage = [inputValues.image];
		const changedState = {...inputValues, image: wrappedImage};

		const modifiedCategories = checkboxes.filter(cat => cat.modified);

		dispatch(productActions.putProduct(selected, changedState, modifiedCategories));
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
					<div className="inpt">
						<label htmlFor="ImgLab" className="">
							Imagen:
						</label>
						<input
							className="ImgIn"
							name="image"
							value={inputValues.image}
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
						{products.map(product => {
							return (
								<option value={product.id} key={product.id}>
									{product.name}
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
