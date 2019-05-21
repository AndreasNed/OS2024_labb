import React from 'react'


export default class Filters extends React.Component {

    handleOnChange = (event) => {
        this.props.filterFunc(event);
    }

    render() {
        return (
            <div className="mainDivFilter">

                <label className="checkboxContainer">
                    <div className="containerLabel">
                    No planes
                    </div>
                    <input 
                        type="checkbox" 
                        name="filterAir" 
                        onChange={this.handleOnChange}
                        checked={this.props.filterAir}
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="checkboxContainer">
                <div className="containerLabel">
                    No trains
                    </div>
                    <input type="checkbox"
                            name="filterRail"
                            onChange={this.handleOnChange}
                            checked={this.props.filterRail}
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="checkboxContainer">
                    <div className="containerLabel">
                    No buses
                    </div>
                    <input type="checkbox"
                            name="filterBus"
                            onChange={this.handleOnChange}
                            checked={this.props.filterBus}
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="checkboxContainer">
                    <div className="containerLabel">
                    No cars
                    </div>
                    <input type="checkbox"
                            name="filterCar"
                            onChange={this.handleOnChange}
                            checked={this.props.filterCar}
                    />
                    <span className="checkmark"></span>
                </label>

            </div>
        )
    }
}