import React from 'react';
import './App.css';

/*

 */

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h2>List of customers</h2>
                <ul>
                    <li style={{fontSize: "20px"}}>1. <strong>John</strong> Doe <button>Edit</button><button>Remove</button></li>
                    <li style={{fontSize: "20px"}}>2. <strong>Molly</strong> Ringwald <button>Edit</button><button>Remove</button></li>
                    <li style={{fontSize: "20px"}}>3. <strong>Joe</strong> Black <button>Edit</button><button>Remove</button></li>
                </ul>
                <hr/>
                <h2>Add new customer</h2>
                <input type="text" placeholder={"Vorname"}/>
                <input type="text" placeholder={"Nachname"}/>
            </div>
        );
    }
}

export default App;
