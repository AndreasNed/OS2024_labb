import React, { Component } from 'react';
import './style/App.css';
import Form from "./components/Form/Form"
import rome2rio from "./utils/rome2rio"
import RouteList from "./components/RouteList/RouteList"
import Filters from "./components/Filters"
import { I18nProvider } from "@lingui/react"
import { Trans } from "@lingui/macro"
import headerLogo from "./pics/headerLogo.png"
import "./components/tablet.css"
import "./components/mobile.css"

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
    this.setState({
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
        <div className="grid-container">

          <header>
            <a href="/" className="headerLogo"><img src={headerLogo} alt="2sweden logo" /></a>
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
              <a className="navbar1" href="/">Travel</a>
              <a className="navbar2" href="/">Read about the event</a>
              <a className="navbar3" href="/">Read about the cities</a>
              <a className="navbar4" href="/">See recommendations</a>
            </Trans>
          </nav>

          <main>
            <Form onSubmit={this.searchNewRoute}
              filterButtons={filterButtons}
              resetList={this.resetList}
              className="onSubmit" />
            {showResults}
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
