/**
* This is an example request. Create your own using best practises for
* handling asynchronous data fetching
**/
import axios from 'axios';

export const getVehicles = (cb) => {
  const list = [];
  axios
  .get('http://localhost:9988/api/vehicle')
  .then(res => {
    const vehicles = (res && res.data && res.data.vehicles) || [];
    const allDetails = vehicles.map(vehicle => axios.get(`http://localhost:9988${vehicle.url}`));
    axios.all(allDetails).then(axios.spread((...responses) => {
      responses.forEach(response => {
        const vehicle = vehicles.filter(data => data.id == response.data.id)[0] || null;
        const tmpVehicle = {};
        tmpVehicle.id = vehicle.id;
        tmpVehicle.name = `${vehicle.id} ${vehicle.modelYear}`;
        tmpVehicle.price = response.data.price;
        tmpVehicle.description = response.data.description;
        tmpVehicle.image_url = vehicle.media && vehicle.media[0] && vehicle.media[0].url;
        list.push(tmpVehicle);
      });
      cb(list);
    }));
  });
}

export const getData = (cb) => {
    const vehicles = new XMLHttpRequest();
    vehicles.open('GET', 'http://localhost:9988/api/vehicle');

    vehicles.onreadystatechange = function() {
        if(vehicles.readyState === 4) {
 		    if(vehicles.status === 200) {
          const data = JSON.parse(vehicles.responseText);
          console.log('#########', data);
          data.vehicles = data.vehicles.map(row => {
            const details = getDetails(row.id, {});
            row.details = details;
            return row;
          });
 			    cb(data);
		    }
		}
	};

	vehicles.send();
};
