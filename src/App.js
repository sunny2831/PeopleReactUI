import React, {Component} from 'react';
import './App.css';
// import People from "./components/People";
import Login from './components/Login'



class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="Header">
                    <h1 className="App-title">Contacts</h1>
                </header>
                <Login />
            </div>
        )
    }
}

export default App;  
