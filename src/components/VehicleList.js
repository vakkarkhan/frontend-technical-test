import React, { Component } from 'react';
import { getVehicles } from '../api';
import VehicleTile from './VehicleTile';

export default
class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null
		}
	}

	componentDidMount() {
		getVehicles((data) => {
			this.setState({
				data
			})
		});
	}

	render() {
		const { data } = this.state;
		if(data) {
		    return (
			    <div className="vehicle-list">
							{data.map((vehicle, vehicleIndex) => <VehicleTile key={`vehicle-${vehicleIndex}`} {...vehicle} />)}
					</div>
		    )
	    }

		return (<h1>Loading...</h1>);
	}
}
