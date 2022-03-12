import React from "react";

import "./dropdown.css";

class Dropdown extends React.Component {
  render() {
    const { visible, data, onSelect } = this.props;
    return (
      <ul className={`dropdown ${visible ? "dropdown__show" : ""}`}>
        {data?.map((el, i) => (
          <li key={i} className="dropdown__item" onClick={() => onSelect(el.symbol)}>
            {el.symbol}  {el.label}
          </li>
        ))}
      </ul>
    );
  }
}

export default Dropdown;
