import React from 'react'
import { Trans } from "@lingui/macro"


export default class Filters extends React.Component{

    handleOnChange = (event) => {
        this.props.filterFunc(event);
        }

    render(){
        return (
            <div className="checkboxes">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className="flexiboi">

                                <div className="checkbox1">
                                    <div className="optText"><Trans>Don't show flights</Trans></div>
                                    <label className="switch">
                                        <input type="checkbox"
                                            name="filterAir"
                                            onChange={this.handleOnChange}
                                            checked={this.props.filterAir}
                                        />
                                        <span class="slider round"></span>
                                        <br></br>

                                    </label>
                                </div>
                                <div className="checkbox1">
                                    <div className="optText"><Trans>Don't show trains</Trans></div>
                                    <label className="switch">
                                        <input type="checkbox"
                                            name="filterRail"
                                            onChange={this.handleOnChange}
                                            checked={this.props.filterRail}
                                        />
                                        <span class="slider round"></span>
                                        <br></br>

                                    </label>
                                </div>

                                <div className="checkbox1">
                                    <div className="optText"><Trans>Don't show bus</Trans></div>
                                    <label className="switch">
                                        <input type="checkbox"
                                            name="filterBus"
                                            onChange={this.handleOnChange}
                                            checked={this.props.filterBus}
                                        />
                                        <span class="slider round"></span>
                                        <br></br>

                                    </label>
                                </div>
                                <div className="checkbox1">
                                    <div className="optText"><Trans>Don't show car</Trans></div>
                                    <label className="switch">
                                        <input type="checkbox"
                                            name="filterCar"
                                            onChange={this.handleOnChange}
                                            checked={this.props.filterCar}
                                        />
                                        <span class="slider round"></span>
                                        <br></br>

                                    </label>
                            </div>
                    </div>
               </div>
        )
    }
}