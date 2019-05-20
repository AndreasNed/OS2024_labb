import React from 'react';
import '../style/App.css';

export default class Filters extends React.Component {

    handleOnChange = (event) => {
        this.props.filterFunc(event);
    }

    render() {
        return (
            <div className="mainDivFilter">
          
                <div className="checkboxFilterPlane">
                Don't allow planes
                <label class="switch">Don't allow planes
                            <input type="checkbox"
                        name="filterAir"
                        onChange={this.handleOnChange}
                        checked={this.props.filterAir}
                    />
                    <span class="slider round"></span>
                </label>
                </div>
                    <div className="checkboxFilterTrain">
                <label class="switch">Don't allow train
                            <input type="checkbox"
                        name="filterRail"
                        onChange={this.handleOnChange}
                        checked={this.props.filterRail}
                    />
                    <span class="slider round"></span>
                </label>
                </div>
                <div className="checkboxFilterBus">
                <label class="switch">Don't allow bus
                            <input type="checkbox"
                        name="filterBus"
                        onChange={this.handleOnChange}
                        checked={this.props.filterBus}
                    />
                    <span class="slider round"></span>
                </label>
                </div>
                <div className="checkboxFilterCar">
                <label class="switch">Don't allow car
                            <input type="checkbox"
                        name="filterCar"
                        onChange={this.handleOnChange}
                        checked={this.props.filterCar}
                    />
                    <span class="slider round"></span>
                </label>
                </div>
            </div >
        )
    }
}