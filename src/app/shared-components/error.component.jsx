import React, { Component } from 'react';

class Error extends Component {
  render() {
    return <div className="section center-align">
      <h1 className="center-align">:(</h1><br/>
      <b> Sorry, but it seems something went wrong and we can not render this view.</b><br/>
      <p>{this.props.children}</p>
    </div>;
  }
}

export default Error;