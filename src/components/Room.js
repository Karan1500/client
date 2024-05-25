import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

function Room({room}){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="row bs">
            <div className="col-md-4">
                <img src={room.imageUrls[0]} className="smallimg"/>
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <p>Max Count: {room.maxCount}</p>
                <p>Phone Number: {room.phoneNumber}</p>
                <p>Room Type: {room.Type}</p>

                <div style={{float: 'right'}}>
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>
                <div style={{float: 'right'}}>
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header>
                <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel prevLabel='' nextLabel=''>
                        {room.imageUrls.map(url=>{
                            return <Carousel.Item>
                            <img className="d-block w-100 bigimg" src={url} />
                          </Carousel.Item>
                        })}
                </Carousel>
                <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default Room