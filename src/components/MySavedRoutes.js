import React from 'react'
import '../style/App.css';

export default class MySavedRoutes extends React.Component {


    openMyRoutes = () => {
        document.getElementById('tripDetails').addEventListener('click', function() {
          document.querySelector('.background-modal').style.display = 'flex';
        })
    }

    render() {

        return (
            <div>
                <button id="tripDetails" onClick={this.openMyRoutes}>My Routes</button>
            </div>
        )
    }
}