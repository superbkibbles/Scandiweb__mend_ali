import React from "react";

import "./sizeButton.css";

class SizeButton extends React.Component {
  render() {
    const { active, size, notAvailable, onClick } = this.props;
    return (
      <button
        className={`btn__size ${active && "btn__size__activeSize"}`}
        disabled={notAvailable}
        onClick={onClick}
      >
        {size}
      </button>
    );
  }
}

export default SizeButton;
