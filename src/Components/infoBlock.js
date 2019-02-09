import React, { Component } from 'react';
import '../App.css';

function InfoBlock(props) {
    let {infoBlock} = props;
    if(infoBlock === undefined)
        return <div/>;
    else
        return (
            <div className = 'InfoBlock'>
                Выбран пользователь: {infoBlock['firstName']}<br/>
                Описание: {infoBlock['description']}  <br/>
                Адрес проживания: {infoBlock['address']['streetAddress']}  <br/>
                Город: {infoBlock['address']['city']}  <br/>
                Провинция: {infoBlock['address']['state']}  <br/>
                Индекс: {infoBlock['address']['zip']} <br/>
            </div>
        );
}
export default InfoBlock;