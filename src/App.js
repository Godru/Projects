import React, { Component } from 'react';
import './App.css';
import Table from './Components/Table.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const fetch = require('node-fetch');
const apiSmall = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const apiBig ='http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            persons: [],
            cutPersons: [],
            loader:'none'
        };
        library.add(faSpinner);
        this.inputChange = this.inputChange.bind(this);
    }
    click(API) {
        this.setState({loader: 'block'});
        fetch(API)
            .then(res => res.json())
            .then(data => {
                this.setState({cutPersons: data});
                this.setState({persons: data});
            })
            .then(() => this.setState({loader: 'none'}))
            .catch(()=>{
                alert("Ошибка скачивания данных");
                this.setState({loader: 'none'});
            });

    }
    testInput(re, str){return str.search(re) != -1}

    inputChange(){
        let value = this.state.textValue.value.toString();
        let newPersons = [];
        let iter = 0;
        for(var i=0; i<this.state.persons.length;i++) {
            if(this.testInput(value,this.state.persons[i]['id'].toString()) || this.testInput(value,this.state.persons[i]['firstName'].toString())
                || this.testInput(value,this.state.persons[i]['lastName'].toString()) || this.testInput(value,this.state.persons[i]['email'].toString())
                || this.testInput(value,this.state.persons[i]['phone'].toString())){
                newPersons[iter] = this.state.persons[i];
                iter++;
            }
        }
        this.setState({cutPersons: newPersons});

    }

    render() {
        return (
            <div className="container">
              <div className="App">
                <button className = 'Button' onClick={(e) => this.click(apiBig)}>Большой массив</button>
                <button className = 'Button' onClick={(e) => this.click(apiSmall)}>Маленький массив</button>
                <input type = 'text' placeholder="Поиск" className="inputBox" ref={(input) => { this.state.textValue = input}}
                       onChange={this.inputChange} />
                <Table page = {1} persons = {this.state.cutPersons}/>
              </div>
              <div className="Preload" style = {{display: this.state.loader}} >
                <FontAwesomeIcon icon="spinner"/>
              </div>
            </div>

        );
    }
}

export default App;
