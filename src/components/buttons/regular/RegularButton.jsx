import React from "react";

import "./regularButton.css";

class RegularButton extends React.Component {
  render() {
    const { title, onClick } = this.props;
    return (
      <button className="btn__regular" onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default RegularButton;
