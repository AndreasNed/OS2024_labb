import React, { Component } from 'react';
import './style/App.css';
import './components/Form/form.css';
import Form from "./components/Form/Form"
import rome2rio from "./utils/rome2rio"
import RouteList from "./components/RouteList/RouteList"
import Filters from "./components/Filters"
import headerLogo from "./pics/headerLogo.jpg"
import { I18nProvider } from "@lingui/react"
import { Trans } from "@lingui/macro"
import "./components/tablet.css"
import "./components/mobile.css"
import { BrowserRouter, Route } from 'react-router-dom';
import queryString from 'query-string';
import MySavedModal from './components/MySavedModal';

const languages = {
  en: "English",
  sv: "Svenska",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ru: "Pусский",
  zh: "中國"
}
console.log(languages)

class App extends Component {
  state = {
    routeData: null,
    filterAir: false,
    filterRail: false,
    filterBus: false,
    filterCar: false,
    urlInit: false,

    language: "en",
    catalogs: {}
  };

  componentDidMount() {
    this.loadLanguage(this.state.language)

    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", (+new Date).toString(36));
      console.log("userId", localStorage.getItem("userId"));
    }
  }

  loadLanguage = async language => {
    const catalogs = await import(`./locales/${language}/messages.js`)
    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalogs
      }
    }))
  }

  shouldComponentUpdate(nextProps, { language, catalogs }) {
    if (language !== this.state.language && !catalogs[language]) {
      this.loadLanguage(language)
      return false;
    }
    return true;
  }

  handleOnClick = (event) => {
    console.log("asd")
    console.log(event)
    const language = event.target.value;
    this.setState({
      language
    })
  }

  searchNewRoute = async (from, to, currencyCode) => {
    const routeData = await rome2rio.searchRoute(from, to, currencyCode)
    fetch(`http://localhost:8080/os2024back/webresources/travelentity/${from}/${to}/${localStorage.getItem("userId")}`);
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

  closeTripDetals = () => {
    document.querySelector('.close').addEventListener('click', function () {
      document.querySelector('.background-modal').style.display = 'none';
    })
  }

  initialiseFromUrl = (obj) => {
    if (!this.state.urlInit) {
      this.setState({ urlInit: true });
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
    if (!this.state.routeData) {
      return processenvREACT_APP_URL
    }
    const queries = `?${this.state.filterAir ? "filterAir=true" : ""}${this.state.filterRail ? "&filterRail=true" : ""}${this.state.filterBus ? "&filterBus=true" : ""}${this.state.filterCar ? "&filterCar=true" : ""}`
    return `http://${processenvREACT_APP_URL}/${this.state.routeData.places[0].longName}/${this.state.routeData.places[1].longName}${queries}`.replace(/ /gi, "%20").replace(/,/gi, "")//Extremt fult, men jag vill gå och äta nu

  }

  render() {
    const { language, catalogs } = this.state;
    let data = this.state.routeData ? { ...this.state.routeData } : null;
    console.log("routeData", data);
    if (data) {
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


    return (

      <I18nProvider language={language} catalogs={catalogs}>
        <div className="grid-container">

          <header>
            <a href="/" className="headerLogo"><img src={headerLogo} alt="2sweden logo" /></a>
            <MySavedModal/>
            <ul className="languages">
              {Object.keys(languages).map(lang => (
                <button className={`flag ${lang}`} onClick={this.handleOnClick}
                  value={lang}>
                </button>
              ))}
            </ul>

          </header>

          <nav>

            <Trans>
              <a className="navbar1" href="/">Travel</a>
              <a className="navbar2" href="/">Read about the event</a>
              <a className="navbar3" href="/">Read about the cities</a>
              <a className="navbar4" href="/">See recommendations</a>
            </Trans>
          </nav>

          <main>
            <div className="background-modal">
              <div className="modal-content">
                <div className="close" onClick={this.closeTripDetals}>+</div>
                <p>asdasd</p>
              </div>
            </div>



            <Form onSubmit={this.searchNewRoute}
              filterButtons={filterButtons}
              resetList={this.resetList}
              className="onSubmit" />
            <Route path="/:from/:to" component={({ match, location }) => this.initialiseFromUrl({ match, location })} />
            <RouteList shareUrl={this.buildUrl()} routeData={data} />
          </main>

          <footer>
            <div className="footerInfo1">
              <a href="/"><Trans>About us</Trans></a>
            </div>
            <div className="footerInfo3">
              <a href="/"><Trans>Contact</Trans></a>
            </div>
            <div className="footerInfo2">
              <a href="https://bit.ly/2vOZHyk"> Årstavägen 19</a>
              <a href="/">08-557 683 53</a>
            </div>
          </footer>

        </div>
      </I18nProvider>





    );
  }
}

export default App;
