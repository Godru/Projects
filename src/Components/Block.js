import React, { Component } from 'react';
import '../App.css';
class Block extends Component{
    constructor(props){
        super(props);
        this.state = {
            block: undefined,
            blockNumber: undefined
        };
    }

    render(){
    this.state.block = this.props.block;
    this.state.blockNumber = this.props.blockNumber;
    return (
        <li onClick={() => { this.props.updateData(this.props.blockNumber)}} className="Block"> {this.state.block} </li>
    );
};
}export default Block;