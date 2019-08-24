import React, {Component} from 'react';
import './App.css';
import People from "./components/People";


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="Header">
                    <h1 className="App-title">Contacts</h1>
                </header>
                <People/>
            </div>
        )
    }
}

export default App;  
