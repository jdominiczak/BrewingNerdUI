import React, { Component } from 'react';

export default function BodyContent(props) {
  return (
    <section className="content">
      {props.children}
    </section>
  );
}
