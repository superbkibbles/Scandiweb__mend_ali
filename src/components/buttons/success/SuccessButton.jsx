import React from "react";

import "./successButton.css";

class SuccessButton extends React.Component {
  render() {
    const { onClick, title, className } = this.props;
    return (
      <button className={`btn__success ${className}`} onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default SuccessButton;
