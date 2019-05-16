import React from 'react'


export default class Filters extends React.Component {

    handleOnChange = (event) => {
        this.props.filterFunc(event);
    }

    render() {
        return (
            <div className="mainDivFilter">

                <div className="checkboxFilterPlanes">
                    
                    <label>Don't allow plane</label>
                    <input type="checkbox" 
                        name="filterAir" 
                        onChange={this.handleOnChange}
                        checked={this.props.filterAir}
                    />
                </div>

                <div className="checkboxFilterTrains">
                    <label>Don't allow train</label>
                    <input type="checkbox"
                            name="filterRail"
                            onChange={this.handleOnChange}
                            checked={this.props.filterRail}
                    />
                </div>

                <div className="checkboxFilterTrains">
                    <label>Don't allow bus</label>
                    <input type="checkbox"
                            name="filterBus"
                            onChange={this.handleOnChange}
                            checked={this.props.filterBus}
                    />
                </div>

                <div className="checkboxFilterCar">
                    <label>Don't allow car</label>
                    <input type="checkbox"
                            name="filterCar"
                            onChange={this.handleOnChange}
                            checked={this.props.filterCar}
                    />
                </div>
            </div>
        )
    }
}