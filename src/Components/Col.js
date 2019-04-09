import React, { Component } from 'react';
import '../App.css';
import Block from './Block.js';

class Col extends Component{
    constructor(props){
        super(props);
        this.state = {
            Blocks: {}
        };
    }
    updateData = (value) => {
        this.props.updateData(value + (this.props.page-1)*50);
    };


    render(){
    this.state.Blocks = this.props.Blocks.map((block,i) => <Block updateData = {this.updateData} key ={i} block ={block} blockNumber = {i}/>);
    return (
        <ul className="Col">
            {this.state.Blocks}
        </ul>
    );
};
}export default Col;