import React, {useState, useEffect,useRef} from 'react';
import './Review.css';
import './star.css';
import 'bootstrap/dist/css/bootstrap.css';
import  Comments from '../Comments/Comments.jsx';
import {useSelector} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

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

   
    function resetQualification() {
		setQualification()
    }
    
    function resetComment() {
		setnewReview('')
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
        resetQualification();
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
                        className="Texto"
                        col="30"
                        name="review"
                        value={newReview}
                        placeholder="Agregue su comentario"
                        onChange={e=> {setnewReview(e.target.value)}}/>
                    </div>
                    <button onClick={handleAdd} className="submitBtn">
                        Agregar
                    </button>
                </div>
            </div>
            <div className="datos">
            {reviews.map(comment =>
            <Comments info={comment}/>
            )}
            </div>
        </form>
    </div>
    )
}
