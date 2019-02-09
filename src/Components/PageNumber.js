import React, { Component } from 'react';
import '../App.css';

function PageNumber(props) {
    let {pageNumber,activePage} = props;
    let color = "black";
    if(activePage === pageNumber)
        color="blue";
        return (
            <button onClick={() => { props.updateData(pageNumber)}} style={{color: color}}> {pageNumber} </button>
        );
}export default PageNumber;

