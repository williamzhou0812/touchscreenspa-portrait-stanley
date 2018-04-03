import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from "./Clock";
import MainLogo from "./interface/main_logo.png";

class App extends Component {
    render() {
        return (
            <div className="App">
                <img style={{width: "100vw", height: "15vh"}} src={MainLogo} />
                <div style={{width: "100vw", height: "4vh", display: "grid", gridTemplateColumns: "30% 30% 40%"}}>
                    <div>AIRPORT INFO</div>
                    <div>AIRPORT MAP</div>
                    <Clock />
                </div>
                <div style={{width: "100vw", height: "8vh"}}>
                    
                </div>
            </div>
        );
    }
}

export default App;
