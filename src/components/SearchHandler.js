import React from 'react';
import rome2rio from "../utils/rome2rio"
import RouteList from "./RouteList/RouteList"
import queryString from 'query-string';

export default class SearchHandler extends React.Component{

    state = {routeData: null};

    componentDidMount = async () => {
        const params = this.props.match.params;
        let routeData = await rome2rio.searchRoute(params.from, params.to);
        //let routeData = await rome2rio.searchRoute("Argentan", "Stockholm");
        this.setState({routeData})


    }

    getFilters(){
        const queries = queryString.parse(this.props.location.search);
        console.log("queries",queries);
    }


    render = () => {
        if (!this.state.routeData){
            return null;
        }
        const data = this.state.routeData;
        console.log("SearchHandler.state.routeData",data);
        return <RouteList routeData={data} className="routePlaces" />

    }
}