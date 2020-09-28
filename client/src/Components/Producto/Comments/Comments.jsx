import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux'
import {star, success, failure, editButton, trashCan} from '../../../multimedia/SVGs';
import './Comments.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
// ========== Fin de imports ==============

const urlBack = process.env.REACT_APP_API_URL;

export default function Comment({info, superMegaReload}) {

  // =========================  Redux State ============================== //

  const currentUser = useSelector(state => state.user)


  // ===================  React Component State ========================== //

  const reviewId = info.id;
  const creatorId = info.creatorId;
  const productId = info.productId;

  const [comentario, setComentario] = useState(info.comment);
  const [qualification, setQualification] = useState (info.qualification);
  const [editedComment, setEditedComment] = useState(info.comment);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState(info.createdAt.slice(0, 10));
  
  const [stateEditar, setStateEdit] = useState({
		edit: 'editClose'
  });


  const [reloadData, setReloadData] = useState(false);


	useEffect(
		() => {
			axios.get(`${urlBack}/products/${productId}/review`)
			.then(response => {
				if (!response.data[0]) return;
				const res = response.data.find(review => review.id === info.id)
				setComentario(res.comment);
				setQualification(res.qualification);
				setEditedComment(res.comment);
				setDate(res.createdAt.slice(0,10));
			})
			.catch(err => {
				alert('Hubo un error revisa la consola');
				console.log(err)
			})
		},
		[reloadData]
	);

// ======================== Utility Fuctios =============================== //

	const showStars = num => {
		var arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(star);
		}
		return arr;
	};

	const stars = showStars(`${qualification}`);

	const ultraHiperMegaReload = () => {
		superMegaReload();
		setReloadData(!reloadData);
	}

// ========================= Event Handlers =============================== //

	const handleDelete = event => {
		event.preventDefault();
		event.persist();

		axios
			.delete(`${urlBack}/products/${productId}/review/${reviewId}`)
			.then(() => {
				setSuccessMessage('La review se ha eliminado correctamente');
				superMegaReload();
			})
			.catch(error => console.log('No se pudo eliminar la review: ' + error.response.data));
	};

	const editClickHandle = event => {
		event.preventDefault();
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');

		setStateEdit({
			...stateEditar,
			edit: stateEditar.edit === 'editClose' ? 'commentEditOpen' : 'editClose'
		});
	};


	const handleCommentTextarea = e => {
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');
		setEditedComment(e.target.value);
	}


	const handleEdit = event => {
		event.preventDefault();

		const editReview = {
			comment: editedComment,
			qualification: qualification,
			creatorId: creatorId
		};

		axios.put(`${urlBack}/products/${productId}/review/${reviewId}`, editReview)
		.then(() => {
			setSuccessMessage('La review se ha editado correctamente');
			ultraHiperMegaReload();
		})
		.catch(error => setErrorMessage('No se pudo editar la review: ' + error.response.data));
	};

    return(
    	<div className="comment">
    		<div className='commentHeader'>

				<div className='userNameContainer'>

					<Link to='#'><strong> {`${info.creator.name}`} </strong> </Link>

					{ (currentUser.rol === 'Admin' || creatorId === currentUser.id) &&
            		<div class="btnCont">
            		  <button onClick={editClickHandle} className="comment-editBtn">
            		   {editButton} 
            		  </button>
            		  <button  onClick={handleDelete} className="comment-deleteBtn">
            		    {trashCan} 
            		  </button>
            		</div>
            		}

				</div>

				<div>
					| {stars.map( i => i)}
          		</div>
				<div className='commentDate'>{date}</div>
			</div>
			<hr />
			<div>
				{`${comentario}`}
			</div>


            { (currentUser.rol === 'Admin' || creatorId === currentUser.id) &&
            <form>
            	<div className={stateEditar.edit}>
            	  <textarea
            	  className="commentTextArea"
            	  readonly
            	  col="30"
            	  name="review"
            	  value={editedComment}
            	  placeholder="Agregue su comentario"
            	  onChange={ handleCommentTextarea }
            	  />
            	  <button type="submit" className="reviewSubmitBtn" value="Edit" onClick={handleEdit}>
					Editar Comentario
				  </button>
				  {errorMessage &&
				  	<div className="error">
				  		{failure} {errorMessage} <br />
				  	</div>
				  }
				  {successMessage &&
				  	<div className="success">
				  		{success} {successMessage} <br />
				  	</div>
				  }
            	</div>
            </form>	
            }

    	</div>
    )
}
