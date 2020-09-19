import React, {useState, useEffect,useRef} from 'react';
import './Review.css';
import './star.css';
import 'bootstrap/dist/css/bootstrap.css';
import  Comments from '../Comments/Comments.jsx';
import {useSelector} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

const star= <svg width="3em" height="2em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>

export default function Review({robotId}) {

    const user= useSelector(state => state.user)
    const [reviews, setReview] = useState([]);
    const [newReview, setnewReview] = useState('');
    const [qualification, setQualification] = useState(null);

    useEffect(() => {
		axios
			.get(`${urlBack}/products/${robotId}/review`)
			.then(response => {
				setReview(response.data);
			})
    }, [robotId]);

    // useEffect(() => {
    //   setnewReview();
    // }, [] );

    function resetComment() {
		setnewReview('')
    }

    function resetQualification() {
		setQualification(null)
    }

    const handleQualification = event => {
        const star= parseInt(event.target.value);
        setQualification(star);
	};

    const handleAdd = event => {
        event.preventDefault();
            const addReview={
            comment: newReview,
            qualification: qualification,
            creatorId: user.id
        }
		axios
        .post(`${urlBack}/products/${robotId}/review`, addReview)
        .then(response => {console.log('La review se ha agregado correctamente')
        console.log(response.data)
        const current= [...reviews,response.data]
        setReview(current);
        resetComment();
        })
        .catch(error => alert('No se pudo crear la review: ' + error.response.data));
    };

    return (

    <div className="Review">
        <h5>Agregar Comentario</h5>
        <form className="Reviews">
            <div className="cont">
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
                    <div className="rev-box">
                        <textarea
                        col="30"
                        name="review"
                        value={newReview}
                        placeholder="Agregue su comentario"
                        onChange={e=> {setnewReview(e.target.value)}}/>
                    </div>

                </div>
            </div>
            <button onClick={handleAdd} className="submitBtn">
                    Agregar
            </button>
            <div>
            {reviews.map(comment =>
            <Comments info={comment}/>
            )}
            </div>
        </form>
    </div>
    )
}
