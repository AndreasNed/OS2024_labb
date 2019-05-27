import React from 'react'
import '../style/App.css';
import { Trans } from "@lingui/macro"

export default class Filters extends React.Component {

    handleOnChange = (event) => {
        this.props.filterFunc(event);
    }

    render() {
        return (
            <div className="mainDivFilter">

                <div className="checkboxFilterPlane">
                <div className="FilterText">
                <Trans>Don't show flights</Trans>
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
                <Trans>Don't show trains</Trans>
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
                <Trans>Don't show bus</Trans>
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
                <Trans>Don't show car</Trans>
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