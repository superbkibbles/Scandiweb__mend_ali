import React from "react";

import "./regularButton.css";

class RegularButton extends React.Component {
  render() {
    const { title, style, onClick } = this.props;
    return (
      <button className="btn__regular" onClick={onClick} style={style}>
        {title}
      </button>
    );
  }
}

export default RegularButton;
