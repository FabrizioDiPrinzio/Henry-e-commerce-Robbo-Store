import React, {useState} from 'react';
import './TablaPics.css';

import {Button, Row,Container,Col, Form,Table} from 'react-bootstrap';

const urlBack = process.env.REACT_APP_API_URL;

export default function TablaPics() {

    const [images, setImages] = useState([]);
    const [newImage, setnewImage] = useState('');
    const [editImage, sethandleEdit] = useState ('');


    const handleAdd = () => {
        images.push(newImage);
    };

    function handleDelete(image) {
        let index=images.indexOf(image);
        images.splice(index, 1)
    };

    const handleEditImg =(image)=> {
        let index= images.indexOf(image);       
    }

    return ( 
        <div> 
        <Container>
            <Row>
            <Col>
                <h2>Agregar Imagen</h2> 
                <Form >
                    <Form.Group controlId="fromChechbox" >
                    <Form.Control autocomplete="off" type="text" value={newImage} placeholder="URL de la imagen" onChange={e => setnewImage(e.target.value)}/>

                    <Button onClick={handleAdd} className="BtnAdd">Aceptar</Button>
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
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map(image =>(
                            <tr key={image}>

                                <td className="Texto">{image}</td>
                                <td>
                                <input 
                                className=" " 
                                type="text" 
                                onChange={e=>sethandleEdit(e.target.value)}
                                placeholder="URL de la imagen"/>
                                        
                                <Button  className="BtnEdit" value="Editar" onClick={()=>handleEdit(image)} >Editar</Button>
                                </td>
                                <td> <Button  className="BtnDelete" value="Eliminar" onClick={() => handleDelete(image)}>Eliminar</Button></td> 
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    </div>
    
            
    )
}
