import React from 'react';

export default function BodyHeader(props) {
    return (
      <section className="content-header">
        <h1>
          {props.headerTitle}
          <small>{props.headerSmallTitle}</small>
        </h1>
        <ol className="breadcrumb">
          {props.breadcrumbs.map((x, i) => (
              <li key={i}><a href={x.link}>{x.name}</a></li>
          ))}
        </ol>
      </section>
    )
}
