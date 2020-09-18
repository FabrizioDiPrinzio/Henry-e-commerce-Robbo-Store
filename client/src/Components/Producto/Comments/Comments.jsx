import React, {useState, useEffect,useRef} from 'react';
import './Comments.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useSelector} from 'react-redux';
import {Button, Row,Container,Col, Form,Table} from 'react-bootstrap';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;


export default function Comment({info}) {

    const [comentario, setComentario] = useState(info.comment)
    const [user, setUser] = useState (info.creatorId)
    const [qualification, setQualification] = useState (info.qualification)


    const handleDelete = event => {
        event.preventDefault();
        event.persist();

        // axios
        // .delete(`${urlBack}/products/${robotId}/review/${event.target.value}` )
        // .then(() => {alert('La review se ha eliminado correctamente')
        // const updated= reviews.filter(i => i.id !== event.target.value);
        // setReview(updated);
        // })
        // .catch(error => alert('No se pudo eliminar la review: ' + error));
    }

    const handleEdit = event => {
        event.preventDefault();

    }

    return(
        <div className="Comment">
            <div>Calificación:{`${qualification}`} </div>
            <div>Usuario:{`${user}`} </div>
            <div>Comentario:{`${comentario}`} </div>
            <div><button onClick={handleEdit} className="submitBtn">
                    Editar
            </button></div>
            <div><button onClick={handleDelete} className="submitBtn">
                    Eliminar
            </button></div>
        </div>
    )
}
