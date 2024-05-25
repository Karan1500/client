import React from "react";

function Room({room}){
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
                    <button className="btn btn-primary">View Details</button>
                </div>
                <div style={{float: 'right'}}>
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    )
};

export default Room