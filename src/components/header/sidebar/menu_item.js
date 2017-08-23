import React, { Component } from 'react';

export default function MenuItem(props){
  return (
    <li><a href={props.link}><i className="fa fa-circle-o"></i> {props.name}</a></li>
  );
}
