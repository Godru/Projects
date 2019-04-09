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
            loader:'none',
            formDisplay: 'none',
            newPerson: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: {
                    streetAddress: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                description: '',
            }
        };
        library.add(faSpinner);
        this.findClick = this.findClick.bind(this);
        this.displayForm = this.displayForm.bind(this);
        this.addPerson = this.addPerson.bind(this);
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

    displayForm(){
        this.setState({formDisplay: 'flex'});
    }
    addPerson(){
        let canAdd = true;
        for (let prop in this.state.newPerson) {
            if(this.state.newPerson[prop] === ''){
                canAdd = false
            }
        }
        for (let prop in this.state.newPerson.address) {
            if(this.state.newPerson.address[prop] === ''){
                canAdd = false
            }
        }
        if(canAdd){
            let newPersons = this.state.persons;
            let newPerson = {address:{}};
            for(let prop in this.state.newPerson){
                if(prop !== 'address') {
                    newPerson[prop] = this.state.newPerson[prop];
                }
            }
            for(let prop in this.state.newPerson.address){
                newPerson.address[prop] = this.state.newPerson.address[prop];
            }
            newPersons.unshift(newPerson);
            this.setState({ persons: newPersons,
                            cutPersons: newPersons,
                            formDisplay: 'none'
            });
        }
        console.log(this.state.persons);
    }
    inputChange(e,id){
        let value = e.target.value;
        if(id === 'streetAddress' || id === 'city' || id === 'state' || id === 'zip'){
            let newPerson = this.state.newPerson;
            newPerson.address[id] = value;
        }else {
            let newPerson = this.state.newPerson;
            newPerson[id] = value;
        }
    }
    findClick(){
        let value = this.state.textValue.value.toString();
        let newPersons = [];
        let iter = 0;
        for(var i=0; i<this.state.persons.length;i++) {
            if(this.testInput(value,this.state.persons[i]['id'].toString())
                || this.testInput(value,this.state.persons[i]['firstName'].toString())
                || this.testInput(value,this.state.persons[i]['lastName'].toString())
                || this.testInput(value,this.state.persons[i]['email'].toString())
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
                    <input type = 'text' placeholder="Поиск" className="inputBox"
                           ref={(input) => { this.state.textValue = input}}/>
                    <button className='Button' onClick={this.findClick}>Найти</button>
                    <button className='Button' onClick = {this.displayForm}>Добавить</button>
                    <div className="form" style={{display: this.state.formDisplay}}>
                        <input className="form__input" placeholder="id" onChange={(e) => this.inputChange(e,'id')}/>
                        <input className="form__input" placeholder="first_name" onChange={(e) => this.inputChange(e,'firstName')}/>
                        <input className="form__input" placeholder="last_name" onChange={(e) => this.inputChange(e,'lastName')}/>
                        <input type="email" className="form__input" placeholder="email" onChange={(e) => this.inputChange(e,'email')}/>
                        <input type="tel" className="form__input" placeholder="phone" onChange={(e) => this.inputChange(e,'phone')}/>
                        <input className="form__input" placeholder="street_address" onChange={(e) => this.inputChange(e,'streetAddress')}/>
                        <input className="form__input" placeholder="city" onChange={(e) => this.inputChange(e,'city')}/>
                        <input className="form__input" placeholder="state" onChange={(e) => this.inputChange(e,'state')}/>
                        <input className="form__input" placeholder="zip" onChange={(e) => this.inputChange(e,'zip')}/>
                        <input className="form__input" placeholder="description" onChange={(e) => this.inputChange(e,'description')}/>
                        <button className='Button' onClick={this.addPerson}>Добавить в таблицу</button>
                    </div>
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
