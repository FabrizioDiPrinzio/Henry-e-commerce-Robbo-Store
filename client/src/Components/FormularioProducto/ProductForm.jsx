import React, {useState, useEffect, useRef} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import './ProductForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Row,Container,Col, Form,Table} from 'react-bootstrap';
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
		description: ''
	});
	const [checkboxes, setCheckboxes] = useState([]);
	const [selected, setSelected] = useState(0);
	const lista = useRef(0);

	const [images, setImages] = useState([]);
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

	function resetImg() {
		lista.current.value = 0;
		setnewImage('')
	}

	function resetImages() {
		setImages([]);
	}

	// ------------  Functionality ----------------------

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

	// Creates an alert after each successful or failed operation
	useEffect(
		() => {
			if (lastResponse) {
				alert(lastResponse.message);
				resetFields();
				resetImages();
			}
			if (lastError) alert(lastError);
		},
		[products, lastError]
	);

	// Updates the state when something is written in the forms
	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	// Updates the state when something is written in the numbers. Can't be a negative number.
	const handleNumberChange = event => {
		const value = parseInt(event.target.value);
		setInputValues({...inputValues, [event.target.name]: value >= 0 ? value : 0});
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
			const imagenes = currentProduct.pics.map(i=> {
				return i.imageUrl;
			})
			setImages(imagenes);

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
	const handleChecks = event => {
		const checkbox = event.target;
		const modifiedCategories = [...checkboxes];
		modifiedCategories[checkbox.value].add = checkbox.checked;
		modifiedCategories[checkbox.value].modified = !modifiedCategories[checkbox.value].modified;
		setCheckboxes(modifiedCategories);
	};

	const handleAddImg = event => {
		event.preventDefault();
		images.push(newImage);
		resetImg();
	};

	const handleDeleteImg = event => {
	  event.preventDefault();

	  const updatedTable = images.filter(i => i !== event.target.value);
	  setImages(updatedTable);
	}

	// Creates products
	const handleAdd = event => {
		event.preventDefault();

		const changedState = {...inputValues, image: images, id: null};

		// If a user selects a preexisting product with some checkboxes, they should still be able to add those categories.
		const checkedCategories = checkboxes.map(c => {
			if (c.add) c.modified = true;
			return c;
		});

		const modifiedCategories = checkedCategories.filter(cat => cat.modified);

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

		const changedState = {...inputValues, image: images};

		const modifiedCategories = checkboxes.filter(cat => cat.modified);

		dispatch(productActions.putProduct(selected, changedState, modifiedCategories));
	};

	return (
		<div>
			<form className="form">
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
									onChange={handleChecks}
								/>
								{categoria.name}
							</label>
						);
					})}
				</div>

				<div className="picsTable">
	        <Container>
	            <Row>
		            <Col>
		                <h5>Agregar Imagen</h5>
		                <Form>
		                    <Form.Group controlId="fromChechbox" >
		                    <input
		                    	className=" "
													type="text"
													autocomplete="off"
													value={newImage}
													onChange={e=>setnewImage(e.target.value)}
		                      placeholder="URL de la imagen"
												/>
												{' '}
		                    <button onClick={handleAddImg} className="submitBtn">Agregar imagen</button>
		                    </Form.Group>
		                </Form>
		            </Col>
	            </Row>
	            <br/>
	            <Row>
		            <Col>
			            <Table>
		                <thead>
	                    <tr>
	                      <th>Imagen</th>
												<th>Url</th>
	                      <th>Eliminar</th>
	                    </tr>
		                </thead>
		                <tbody>
	                    {images.map(image =>(
	                        <tr key={image}>
	                            <td><img className="prodImg" src={image}></img></td>
															<td className="imgUrl">{image}</td>
	                            <td>
																<button
																	className="deleteBtn"
																	value={image}
																	onClick={handleDeleteImg}>
																	Eliminar
																</button>
															</td>
		                        </tr>
													))}
			                </tbody>
										</Table>
			            </Col>
		            </Row>
		        </Container>
		    </div>

				<button onClick={handleAdd} className="submitBtn">
					Agregar producto
				</button>

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
			</form>

	</div>
	);
}
