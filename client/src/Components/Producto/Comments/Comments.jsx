import React, {useState, useEffect,useRef} from 'react';
import './Comments.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useSelector} from 'react-redux';
import {Button, Row,Container,Col, Form,Table} from 'react-bootstrap';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

const star= <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>

export default function Comment({info}) {
console.log(info);
    const [comentario, setComentario] = useState(info.comment);
    const [user, setUser] = useState (info.creatorId);
    const [qualification, setQualification] = useState (info.qualification);
    const [editedComment, setEditedComment] = useState(info.comment);
    const [stateEdit, setStateEdit] = useState({
		    edit: 'editClose'
	  });

    const clickHandle = event => {
		  event.preventDefault();
		  setStateEdit({
			   ...stateEdit,
			   edit: stateEdit.edit === 'editClose' ? 'editOpen' : 'editClose'
		  });
	  };

    const handleDelete = event => {
        event.preventDefault();
        event.persist();

        axios
        .delete(`${urlBack}/products/{productId}/review/${event.target.value}` )
        .then(() => {alert('La review se ha eliminado correctamente')
          // const updated= comentario.filter(i => i.id !== event.target.value);
          // setComentario(updated);
        })
        .catch(error => alert('No se pudo eliminar la review: ' + error));
    };

    const handleEdit = event => {
        event.preventDefault();
        const editReview = {
          comment: editedComment,
          qualification: qualification
        };

        axios
        .put(`${urlBack}/products/{productId}/review/${info.id}`, editReview)
        .then(() => {alert('La review se ha editado correctamente')
        })
        .catch(error => alert('No se pudo editar la review: ' + error));
    };

    const showStars = num => { //arreglar
      var arr = [];
      for(let i=0; i<num; i++){
        arr.push(star);
      }
      return arr
    }

    const stars = showStars(`${qualification}`);

    //setEditedComment(`${comentario}`);

    return(
      <div>
        <div className="Comment">
          <div >
            <div>Calificación: {stars.map( i => i)}</div>
          </div>
          <div>Usuario: {`${user}`} </div>
          <div>
            <div>Comentario: {`${comentario}`}</div>
            </div>
            <div class="btnCont">
              <button onClick={clickHandle} className="editBtn">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-pencil-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button  value={`${info.id}`} onClick={handleDelete} className="deleteBtn">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
            </div>
            <div className={stateEdit.edit}>
              <textarea
              readonly
              col="30"
              name="review"
              value={editedComment}
              placeholder="Agregue su comentario"
              onChange={e => setEditedComment(e.target.value) }
              />
              <button type="submit" className="editBtn" value="Edit" onClick={handleEdit}>
						    Aceptar
					    </button>
            </div>
        </div>
    )
}
