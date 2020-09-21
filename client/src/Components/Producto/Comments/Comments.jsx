import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import './Comments.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

const star= <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>

export default function Comment({info}) {

  // =========================  Redux State ============================== //

  const currentUser = useSelector(state => state.user)


  // ===================  React Component State ========================== //

  const [comentario, setComentario] = useState(info.comment);
  const [qualification, setQualification] = useState (info.qualification);
  const [editedComment, setEditedComment] = useState(info.comment);
  const [stateEditar, setStateEdit] = useState({
		edit: 'editClose'
	});
  const creatorId = info.creatorId

  const date = info.createdAt.slice(0,10);

  const clickHandle = event => {
    event.preventDefault();
    setStateEdit({
      ...stateEditar,
      edit: stateEditar.edit === 'editClose' ? 'editOpen' : 'editClose'
    });
  };

  const handleDelete = event => {
      event.preventDefault();
      event.persist();

      axios
      .delete(`${urlBack}/products/productId/review/${info.id}` )
      .then(() => {alert('La review se ha eliminado correctamente')
        
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
      .put(`${urlBack}/products/productId/review/${info.id}`, editReview)
      .then(() => {alert('La review se ha editado correctamente')
      })
      .catch(error => alert('No se pudo editar la review: ' + error));
  };

  const showStars = num => { 
    var arr = [];
    for(let i=0; i<num; i++){
      arr.push(star);
    }
    return arr
  }

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
              <button  value={`${info.id}`} onClick={handleDelete} className="deleteBtn comment-editBtn">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
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
              onChange={e => setEditedComment(e.target.value) }
              />
              <button type="submit" className="addEdit comment-addEdit" value="Edit" onClick={handleEdit}>
						    Aceptar
					    </button>
            </div>
            }

        </div>
    )
}
