import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form/Form"
import logga from "./pics/projektlogga.png"
import rome2rio from "./utils/rome2rio"
import RouteList from "./components/RouteList/RouteList"
import Filters from "./components/Filters"
import { I18nProvider } from "@lingui/react"
import { Trans } from "@lingui/macro"

const languages = {
  en: "English",
  sv: "Svenska",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ru: "Pусский",
  zh: "中國"
}

class App extends Component {
  state = {
    routeData: null,
    filterAir: false,
    filterRail: false,
    filterBus: false,
    filterCar: false,
    language: "en",
    catalogs: {}
  };

  componentDidMount() {
    this.loadLanguage(this.state.language)
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
    const language = event.target.value;
    this.setState ({
      language
    })
  }

  searchNewRoute = async (from, to, filters) => {
    const routeData = await rome2rio.searchRoute(from, to, filters)
    this.setState(({
      filters,
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

  render() {

    const { language, catalogs } = this.state;
    let data = this.state.routeData ? { ...this.state.routeData } : null;
    console.log(data);
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
    /*if(this.state.filterAir && this.state.filterBus && this.state.filterRail && this.state.filterCar){
      return{
        <div></div>

      }

    } */


    const filterButtons = <Filters filterFunc={this.updateFilters} {...this.state} />
    const showResults = data
      ? <RouteList routeData={data} filterButtons={filterButtons} className="routePlaces" />
      : null

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        <div className="App">

          <header>
            <a href="/" className="navLogo"><img src={logga} alt="2sweden logo" /></a>
          </header>

          <nav>
            <ul className="languages">
              {Object.keys(languages).map(lang => (
                <li key={lang}>
                  <button onClick={this.handleOnClick}
                  value={lang}>
                    {languages[lang]}
                  </button>
                </li>
              ))}
            </ul>
            <Trans>
              <a href="/" className="nav1">Travel</a>
              <a href="/" className="nav2">Read about the event</a>
              <a href="/" className="nav3">Read about the cities</a>
              <a href="/" className="nav4">See recommendations</a>
            </Trans>
          </nav>

          <main>
            <Form onSubmit={this.searchNewRoute}
              filterButtons={filterButtons}
              resetList={this.resetList}
              className="onSubmit" />
          </main>

          {showResults}

          <footer className="footerContent">
            <ul className="foot1">
              <Trans>
                <a href="/">Contact</a>
                <a href="/">About us</a>
              </Trans>
            </ul>
            <ul className="foot2">
              <a href="https://bit.ly/2vOZHyk">Årstavägen 19</a>
              <a href="/">+46 (0)8-557 683 53</a>
            </ul>
          </footer>

        </div>
      </I18nProvider>
    );
  }
}

export default App;
