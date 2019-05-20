import React, { Component } from 'react';
import './style/App.css';
import Form from "./components/Form/Form"
import rome2rio from "./utils/rome2rio"
import RouteList from "./components/RouteList/RouteList"
import Filters from "./components/Filters"
import headerLogo from "./pics/headerLogo.png"
import SearchHandler from "./components/SearchHandler"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import queryString from 'query-string';


import "./components/tablet.css"
import "./components/mobile.css"

class App extends Component {
  state = {
    routeData: null,
    filterAir: false,
    filterRail: false,
    filterBus: false,
    filterCar: false,
    urlInit: false,


  };

  searchNewRoute = async (from, to) => {
    const routeData = await rome2rio.searchRoute(from, to)
    console.log("routeData", routeData)
    this.setState(({
      routeData
    }));
    console.log(routeData);
  }

  resetList = () => {
    this.setState({
      routeData: null
    })
  }

  updateFilters = (event) => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    })
    console.log(name + ": " + checked);
  }


  initialiseFromUrl = (obj) => {
    if (!this.state.urlInit){
      this.setState({urlInit: true});
      const params = obj.match.params;
      console.log("match.params", obj.match.params);
      console.log("location.", obj.location);
      let filters = queryString.parse(obj.location.search); // Ger tillbaka strängar istället för boolean, men eftersom det aldrig kommer behövas för false funkar det. Yippie typ-osäkerhet
      console.log("filters", filters);
      this.searchNewRoute(params.from, params.to);
      this.setState(filters);
    }

    return null;

  }

  buildUrl = () => {

    const processenvREACT_APP_URL = "localhost:3000"
    if (!this.state.routeData){
      return processenvREACT_APP_URL
    }
    const queries = `?${this.state.filterAir ? "filterAir=true":""}${this.state.filterRail ? "&filterRail=true":""}${this.state.filterBus? "&filterBus=true":""}${this.state.filterCar ? "&filterCar=true":""}`
    return `http://${processenvREACT_APP_URL}/${this.state.routeData.places[0].longName}/${this.state.routeData.places[1].longName}${queries}`.replace(/ /gi, "%20").replace(/,/gi, "")//Extremt fult, men jag vill gå och äta nu

  }

  render() {

    let data = this.state.routeData ? { ...this.state.routeData } : null;
    console.log("routeData", data);

    if (data){
      data.routes = data.routes
      .filter(element => {
        return this.state.filterAir 
        ? !element.name.toUpperCase().includes("FLY")
        : true;
      })
      .filter(element => {
        return this.state.filterRail 
        ? !element.name.toUpperCase().includes("TRAIN")
        : true;
      })
      .filter(element => {
        return this.state.filterBus
        ? !element.name.toUpperCase().includes("BUS")
        : true;
      })
      .filter(element => {
        return this.state.filterCar
        ? !element.name.toUpperCase().includes("DRIVE")
        : true;
      })
    }


    const filterButtons = <Filters filterFunc={this.updateFilters} {...this.state} />
    const showResults = data
      ? <RouteList routeData={data} filterButtons={filterButtons} className="routePlaces" />
      : null

    return (
      <div className="grid-container">

        <header>
          <a href="/" className="headerLogo"><img src={headerLogo} alt="2sweden logo" /></a>
        </header>

        <nav>
          <a className="navbar1" href="/">Sök resor</a>
          <a className="navbar2" href="/">Läs om eventet</a>
          <a className="navbar3" href="/">Läs om våra orter</a>
          <a className="navbar4" href="/">Se rekommendationer</a>
        </nav>

        <main>
          <Form onSubmit={this.searchNewRoute}
            filterButtons={filterButtons}
            resetList={this.resetList}
            className="onSubmit" />
            <div>{this.buildUrl()}</div>
            <BrowserRouter>
              <Route path="/:from/:to" component={({match, location}) => this.initialiseFromUrl({match, location})}/>
            </BrowserRouter>
            <RouteList routeData={data}/>
            </main>


        <footer>
          <div className="footerInfo1">
            <a href="/">Om oss</a>
          </div>
          <div className="footerInfo3">
          <a href="/">Kontakt</a>
          </div>
          <div className="footerInfo2">
            <a href="https://bit.ly/2vOZHyk"> Årstavägen 19</a>
            <a href="/">08-557 683 53</a>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
