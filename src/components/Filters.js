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
                <div className="FilterText">
                Don't allow plane
                </div >
                    <label class="switch">
                            <input type="checkbox"
                            name="filterAir"
                            onChange={this.handleOnChange}
                            checked={this.props.filterAir}
                        />
                        <span class="slider round"></span>
                    </label>
                </div>

                <div className="checkboxFilterTrain">
                <div className="FilterText">
                Don't allow train
                </div >
                    <label class="switch">
                            <input type="checkbox"
                            name="filterRail"
                            onChange={this.handleOnChange}
                            checked={this.props.filterRail}
                        />
                        <span class="slider round"></span>
                    </label>
                </div>

                <div className="checkboxFilterBus">
                <div className="FilterText">
                Don't allow bis
                </div >
                    <label class="switch">
                            <input type="checkbox"
                            name="filterBus"
                            onChange={this.handleOnChange}
                            checked={this.props.filterBus}
                        />
                        <span class="slider round"></span>
                    </label>
                </div>

                <div className="checkboxFilterCar">
                <div className="FilterText">
                Don't allow car
                </div >
                    <label class="switch">
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