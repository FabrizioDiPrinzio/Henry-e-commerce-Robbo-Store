import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import {star, success, failure, editButton, trashCan} from '../../../multimedia/SVGs';
import './Comments.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
// ========== Fin de imports ==============

const urlBack = process.env.REACT_APP_API_URL;

export default function Comment({info}) {

  // =========================  Redux State ============================== //

  const currentUser = useSelector(state => state.user)


  // ===================  React Component State ========================== //

  const [comentario, setComentario] = useState(info.comment);
  const [qualification, setQualification] = useState (info.qualification);
  const [editedComment, setEditedComment] = useState(info.comment);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stateEditar, setStateEdit] = useState({
		edit: 'editClose'
  });
  const creatorId = info.creatorId

	// ------------- Functionality ---------------

	const date = info.createdAt.slice(0, 10);

	const clickHandle = event => {
		event.preventDefault();
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');

		setStateEdit({
			...stateEditar,
			edit: stateEditar.edit === 'editClose' ? 'editOpen' : 'editClose'
		});
	};

	const handleDelete = event => {
		event.preventDefault();
		event.persist();

		axios
			.delete(`${urlBack}/products/productId/review/${info.id}`)
			.then(() => {
				setSuccessMessage('La review se ha eliminado correctamente');
			})
			.catch(error => setErrorMessage('No se pudo eliminar la review: ' + error));
	};

	const handleEdit = event => {
		event.preventDefault();
		const editReview = {
			comment: editedComment,
			qualification: qualification
		};

		axios
			.put(`${urlBack}/products/productId/review/${info.id}`, editReview)
			.then(() => {
				setSuccessMessage('La review se ha editado correctamente');
			})
			.catch(error => setErrorMessage('No se pudo editar la review: ' + error));
	};

	const showStars = num => {
		var arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(star);
		}
		return arr;
	};

	const stars = showStars(`${qualification}`);

    return(
      <div>
        <div className="Comment">
          <div >
            <div>Calificación: {stars.map( i => i)}</div>
          </div>
          <div>Usuario: {`${creatorId}`} </div>
          <div>
            <div>Fecha: {date}</div>
            <div>Comentario: {`${comentario}`}</div>
            </div>

            { creatorId === currentUser.id &&
            <div class="btnCont">
              <button onClick={clickHandle} className="comment-editBtn">
               {editButton} 
              </button>
              <button  value={`${info.id}`} onClick={handleDelete} className="deleteBtn comment-editBtn">
                {trashCan} 
              </button>
            </div>
            }

          </div>

            { creatorId === currentUser.id &&
            <div className={stateEditar.edit}>
              <textarea
              className="texto"
              readonly
              col="30"
              name="review"
              value={editedComment}
              placeholder="Agregue su comentario"
              onChange={e => {
						if (successMessage) setSuccessMessage('');
						if (errorMessage) setErrorMessage('');
						setEditedComment(e.target.value);
			  }}
              />
              <button type="submit" className="addEdit comment-addEdit" value="Edit" onClick={handleEdit}>
				Aceptar
			  </button>
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
            }

        </div>
    )
}
