import React from 'react'
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
                    <i id ="filterLogo"  class="fas fa-plane"></i>
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
                    <i id= "filterLogo" class="fas fa-subway"></i>
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
                    <i id= "filterLogo" class="fas fa-bus-alt"></i>
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
                    <i id= "filterLogo" class="fas fa-car"></i>
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