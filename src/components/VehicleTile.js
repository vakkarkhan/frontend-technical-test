import React from 'react';

const VehicleTile = (vehicle) => {
  console.log('######', vehicle);
  return (<div className="vehicle-tile">
      <img src={`http://localhost:9988${vehicle.image_url}`} />
      <div className="vehicle-info">
        <div className="vehicle-title">{vehicle.name}</div>
        <div className="vehicle-price">From {vehicle.price}</div>
        <div className="vehicle-description">{vehicle.description}</div>
      </div>
    </div>);
}

export default VehicleTile;
