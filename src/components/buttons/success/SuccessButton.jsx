import React from "react";

import "./successButton.css";

class SuccessButton extends React.Component {
  render() {
    const { onClick, title, style } = this.props;
    return (
      <button className="btn__success" style={style} onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default SuccessButton;
