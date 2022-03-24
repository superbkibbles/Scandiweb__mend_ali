import React from "react";

import "./regularButton.css";

class RegularButton extends React.Component {
  render() {
    const { title, onClick, className } = this.props;
    return (
      <button className={`btn__regular ${className}`}  onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default RegularButton;
