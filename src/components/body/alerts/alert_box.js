import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


/*
* Alert Box inputs: title, time, created, modified, resolved, type,
*                   description, sourceLink, sourceText, acknowledged,
*        functions: toggleAlert(), deleteAlert()
*/

export default function AlertBox(props) {
  if (props.loading) {
    return (
      <div className="col-md-12">
        <div className="box box-danger">
          <div className="box-header with-border">
            <h3 className="box-title">Loading</h3>
          </div>
          <div className="box-body no-padding" />
          <div className="overlay">
            <i className="fa fa-refresh fa-spin" />
          </div>
        </div>
      </div>
    );
  }
  if (props.error) {
    return (
      <div className="col-md-12">
        <div className="box box-danger">
          <div className="box-header with-border">
            <h3 className="box-title">Error</h3>
          </div>
          <div className="box-body no-padding">
            <div className="row">
              <div className="col-md-12">
                <h1 style={{ textAlign: 'center' }}>404 - Alert Not Found</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-md-12">
      <div className="box box-danger">
        <div className="box-header with-border">
          <h3 className="box-title">{props.title}</h3>
          <div className="pull-right">
            <span className="time">
              <i className="fa fa-clock-o" />
              {props.time}
            </span>
          </div>
        </div>
        <div className="box-body no-padding">
          <div className="row">
            <div className="col-md-4">

              <div className="pad box-pane">
                <dl className="dl-horizontal dl-horizontal-narrow">
                  <dt>Status</dt>
                  <dd>{props.active ? 'Acknowledged' : 'New'}</dd>
                  <dt>Created</dt>
                  <dd>{props.created}</dd>
                  <dt>Modified</dt>
                  <dd>{props.modified}</dd>
                  <dt>Resolved</dt>
                  <dd>{props.resolved}</dd>
                  <dt>Type</dt>
                  <dd>{props.type}</dd>
                </dl>
              </div>
            </div>
            <div className="col-md-8">
              <div className="pad">
                <p>{props.description}</p>
                <p>Source: <Link to={props.sourceLink || '#'}>{props.sourceText}</Link> </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="pad">
                {!props.active ?
                  <a
                    className="btn btn-success btn-xs"
                    tabIndex="0"
                    role="button"
                    onClick={() => props.toggleAlert(props.url, true)}
                  >Acknowledge Alert</a> :
                  <a
                    className="btn btn-warning btn-xs"
                    tabIndex="-1"
                    role="button"
                    onClick={() => props.toggleAlert(props.url, false)}
                  >Reset Alert</a>
                }
                <a
                  className="btn btn-danger btn-xs pull-right"
                  tabIndex="-1"
                  role="button"
                  onClick={() => props.deleteAlert(props.id)}
                >Delete Alert</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AlertBox.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  created: PropTypes.string,
  modified: PropTypes.string,
  resolved: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  sourceLink: PropTypes.string,
  sourceText: PropTypes.string,
  toggleAlert: PropTypes.func.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

AlertBox.defaultProps = {
  loading: false,
  error: false,
  created: '',
  modified: '',
  description: '',
  sourceLink: '',
  sourceText: '',
};
