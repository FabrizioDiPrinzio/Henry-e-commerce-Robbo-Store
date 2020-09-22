import React, {useState, useEffect} from 'react';
import {failure} from '../../../multimedia/SVGs';
import './Review.css';
import './star.css';
import 'bootstrap/dist/css/bootstrap.css';
import Comments from '../Comments/Comments.jsx';
import {useSelector} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function Review({robotId}) {

// ========================== Redux State ======================== //

	const currentUser = useSelector(state => state.user);


// ====================== React Component State ================== //
	
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState('');
	const [qualification, setQualification] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(
		() => {
			axios.get(`${urlBack}/products/${robotId}/review`).then(response => {
				setReviews(response.data); 
				// response.data tiene la info de la review y una propiedad creator.
				// creatror es un objeto con las propiedades del usuario que creó la review 
				});
		},
		[robotId]
	);

// ======================== Utility Functions ====================== //

	function resetQualification() {
		setQualification();
	}

	function resetComment() {
		setNewReview('');
	}


// ========================== Event Hnadlers ======================= //

	const handleQualification = event => {
		if (errorMessage) setErrorMessage('');

		const star = parseInt(event.target.value);
		setQualification(star);
	};

	const handleAdd = event => {
		event.preventDefault();
		
		const addReview = {
			comment: newReview,
			qualification: qualification,
			creatorId: currentUser.id
		};
		axios
			.post(`${urlBack}/products/${robotId}/review`, addReview)
			.then(response => {
				console.log('La review se ha agregado correctamente');
				console.log(response.data);
				const current = [...reviews, response.data];
				setReviews(current);
				resetComment();
				resetQualification();
			})
			.catch(error => setErrorMessage('No se pudo crear la review: ' + error.response.data));
	};

	return (
    <div className="review">
        <form className="">
        	<div className='reviewsHeader'>
        		<h4 className='reviewTitle'>Agrega un Comentario: </h4>
                <div className="stars">
                    <div>
                        <input className="star star-1" id="star-1" value="5" type="radio" name="star" onClick={handleQualification}/>
                        <label className="star star-1" for="star-1"></label>
                        <input className="star star-2" id="star-2" value="4" type="radio" name="star" onClick={handleQualification}/>
                        <label className="star star-2" for="star-2"></label>
                        <input className="star star-3" id="star-3" value="3" type="radio" name="star" onClick={handleQualification}/>
                        <label className="star star-3" for="star-3"></label>
                        <input className="star star-4" id="star-4" value="2" type="radio" name="star" onClick={handleQualification}/>
                        <label className="star star-4" for="star-4"></label>
                        <input className="star star-5" id="star-5"  value="1" type="radio" name="star" onClick={handleQualification} />
                        <label className="star star-5" for="star-5"></label>
                    </div>
				</div>
			</div>

			<textarea
			className="reviewTextarea"
			col="30"
			name="review"
			value={newReview}
			placeholder="Agregue su comentario"
			onChange={e => {
				if (errorMessage) setErrorMessage('');
				setNewReview(e.target.value);
			}}/>

			<button onClick={handleAdd} className="reviewSubmitBtn">
			    Agregar
			</button>
			<hr />
        </form>

		<div className="datos">
        	<h4 className='reviewTitle'>Comentarios: </h4>
			{reviews.map(review =>
				<Comments info={review}/>
            )}
		</div>
		{errorMessage && (
			<div className="error">
				{failure} {errorMessage} <br />
			</div>
		)}
    </div>
    )
}
