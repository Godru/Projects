import React, { Component } from 'react';
import '../App.css';
import Col from './Col.js';
import InfoBlock from './infoBlock.js';
import PageNumber from './PageNumber.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown,faArrowUp,faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
const fetch = require('node-fetch');



export default class Table extends Component{
        constructor(props) {
            super(props);
            this.state = {
                persons: [],
                page: 1,
                PageNumbers: [],
                personsInfo: {},
                isSorted: '',
                infoBlockPerson: undefined,
                arrowDirection:{
                    id: 'arrow-down',
                    firstName: 'arrow-down',
                    lastName: 'arrow-down',
                    email: 'arrow-down',
                    phone: 'arrow-down'
                },
                arrowColor: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                }
            };
            library.add(faArrowDown);
            library.add(faArrowUp);
            library.add(faArrowRight);
            library.add(faArrowLeft);
        }
        updatePage = (value) => {
            this.setState({ page: value })
        };
        updateInfoBlock = (value) =>{
            this.setState({ infoBlockPerson: this.state.persons[value]})
        };

        nextPrevPageClick(key) {
            if(this.state.page + key > 0 && this.state.page + key < this.state.persons.length/10+1)
            this.setState({page: this.state.page + key});
        }
        InsertionSort(key,arr){
            var n = key.length;
            for (var i = 1; i < n; i++) {
                var v = key[i],vArr = arr[i],  j = i - 1;
                while (j >= 0 && key[j] > v) {
                    arr[j + 1] = arr[j];
                    key[j + 1] = key[j];
                    j--;
                }
                arr[j + 1] = vArr;
                key[j + 1] = v;
        }
        return arr;
        }
        arrowClick(key){
            if(this.state.isSorted !== key) {
                this.setState(function (prevState) {
                    var prop;
                    prevState.isSorted= key;
                    prevState.persons = this.InsertionSort(prevState.persons.map(person => person[key]), prevState.persons);
                    for (prop in prevState.arrowColor) {
                        prevState.arrowColor[prop] = 'black';
                    }
                    for (prop in prevState.arrowDirection) {
                        prevState.arrowDirection[prop] = 'arrow-down';
                    }
                    prevState.arrowColor[key] = 'blue';
                    return prevState;
                })
            }
            else{
                this.setState(function (prevState) {
                    prevState.persons = prevState.persons.reverse();
                    prevState.isSorted= '';
                    prevState.arrowDirection[key] = 'arrow-up';
                    return prevState;
                })
            }
        }
        componentWillReceiveProps(nextProps){
            this.setState(function (prevProps) {
                prevProps.persons = nextProps.persons;
                for (var prop in prevProps.arrowColor) {
                    prevProps.arrowColor[prop] = 'black';
                }
                for (var prop in prevProps.arrowDirection) {
                    prevProps.arrowDirection[prop] = 'arrow-down';
                }
                prevProps.infoBlockPerson = undefined;
                prevProps.page = 1;
                return prevProps;
            })
        }
        pageNumbers(){
            var pages = [];
            if(this.state.persons.length/50>10){
                pages[0] =  <PageNumber key = {0} updateData={this.updatePage} activePage = {this.state.page} pageNumber = {1}/>;
                if(this.state.page > 4 && this.state.page < this.state.persons.length/50-4) {
                    for (var i = this.state.page - 4; i < this.state.page + 4; i++) {
                        pages[i] = <PageNumber key = {i} updateData={this.updatePage} activePage = {this.state.page} pageNumber={i + 1}/>;
                    }
                }else{
                    if(this.state.page <= 4) {
                        for (var i = 1; i < 8; i++) {
                            pages[i] = <PageNumber key = {i} updateData={this.updatePage} activePage = {this.state.page} pageNumber={i + 1}/>;
                        }
                    }else
                    if(this.state.page >= this.state.persons.length/50-4){
                        for (var i = Math.ceil(this.state.persons.length/50-7); i < Math.ceil(this.state.persons.length/50)-1; i++) {
                            pages[i] = <PageNumber key = {i} updateData={this.updatePage} activePage = {this.state.page} pageNumber={i + 1}/>;
                        }
                    }
                }
                pages[Math.ceil(this.state.persons.length/50)] =  <PageNumber key = {Math.ceil(this.state.persons.length/50)} updateData={this.updatePage} activePage = {this.state.page} pageNumber = {Math.ceil(this.state.persons.length/50)}/>;
            }else
            for(var i=0;i<this.state.persons.length/50;i++){
                pages[i] =  <PageNumber key = {i} updateData={this.updatePage} activePage = {this.state.page} pageNumber = {i+1}/>;
            }
            return  pages;
        }
            rendCol=(key) => this.state.persons.map(person => person[key]).slice((this.state.page-1)*50,(this.state.page-1)*50+50);

        render() {
            return (
                <div className = "Table">
                    <div className ="Table__cols">
                        <ul>
                            <li key = "0" className="Block">
                                id
                                <button onClick={(e) => this.arrowClick("id")} className="Arrow" style ={{color : this.state.arrowColor['id']}}>
                                    <FontAwesomeIcon icon={this.state.arrowDirection['id']}/>
                                </button>
                            </li>
                            <Col updateData = {this.updateInfoBlock} page = {this.state.page} Blocks={this.rendCol('id')}/>
                        </ul>
                        <ul>
                            <li key = "0" className="Block">
                                first name
                                <button onClick={(e) => this.arrowClick("firstName")} className="Arrow" style ={{color : this.state.arrowColor['firstName']}}>
                                    <FontAwesomeIcon icon={this.state.arrowDirection['firstName']}/>
                                </button>
                            </li>
                            <Col updateData = {this.updateInfoBlock} page = {this.state.page} Blocks={this.rendCol('firstName')}/>
                        </ul>
                        <ul>
                            <li key = "0" className="Block">
                                last name
                                <button onClick={(e) => this.arrowClick("lastName")} className="Arrow" style ={{color : this.state.arrowColor['lastName']}}>
                                    <FontAwesomeIcon icon={this.state.arrowDirection['lastName']}/>
                                </button>
                            </li>
                            <Col updateData = {this.updateInfoBlock} page = {this.state.page} Blocks={this.rendCol('lastName')}/>
                        </ul>
                        <ul>
                            <li key = "0" className="Block">
                                email
                                <button onClick={(e) => this.arrowClick("email")} className="Arrow" style ={{color : this.state.arrowColor['email']}}>
                                    <FontAwesomeIcon icon={this.state.arrowDirection['email']}/>
                                </button>
                            </li>
                            <Col updateData = {this.updateInfoBlock} page = {this.state.page} Blocks={this.rendCol('email')}/>
                        </ul>
                        <ul>
                            <li key = "0" className="Block">
                                phone
                                <button onClick={(e) => this.arrowClick("phone")} className="Arrow" style ={{color : this.state.arrowColor['phone']}}>
                                    <FontAwesomeIcon icon={this.state.arrowDirection['phone']}/>
                                </button>
                            </li>
                            <Col updateData = {this.updateInfoBlock} page = {this.state.page} Blocks={this.rendCol('phone')}/>
                        </ul>
                    </div>
                    <div className = "Table__nav">
                        <button onClick={(e) => this.nextPrevPageClick(-1)} className="Prev">
                            <FontAwesomeIcon icon="arrow-left"/>
                        </button>
                        {this.state.PageNumbers = this.pageNumbers()}
                        <button onClick={(e) => this.nextPrevPageClick(1)} className="Next">
                            <FontAwesomeIcon icon="arrow-right"/>
                        </button>
                    </div>
                    <div>
                        <InfoBlock infoBlock = {this.state.infoBlockPerson} />
                    </div>
                </div>
            );

        }
}
/* {this.state.PageNumbers}*/

