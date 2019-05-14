import React from 'react'


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
                                    <div className="optText">don't allow planes</div>
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
                                    <div className="optText">  don't allow trains</div>
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
                                    <div className="optText"> don't allow bus</div>
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
                                    <div className="optText">don't allow car</div>
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