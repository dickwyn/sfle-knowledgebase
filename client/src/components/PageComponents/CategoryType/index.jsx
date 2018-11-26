import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CategoryType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textChange: null,
      borderStyle: "",
      keyWordSearchText: ""
    };
  }

  hover = () => {
    this.setState({
      borderStyle: "1px solid",
      textChange: "bold"
    });
  };
  onBlur = () => {
    this.setState({
      borderStyle: "0px",
      textChange: "normal"
    });
  };

  clicked = () => {
    this.props.history.push(`/browse?${this.props.type}=${this.props.label}`);
  };

  render() {
    return (
      <div
        style={{
          width: "120px",
          border: `${this.state.borderStyle}`,
          fontWeight: `${this.state.textChange}`
        }}
      >
        <div
          onMouseLeave={this.onBlur}
          onMouseEnter={this.hover}
          onClick={this.clicked}
          style={this.props.styleObject}
        >
          {this.props.image && (
            <img
              src={this.props.image}
              alt="No image in record"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <div
            style={{
              fontSize: "16px",
              fontFamily: "Aerial",
              marginTop: "2px",
              marginRight: "5px"
            }}
          >
            {this.props.label}
          </div>
        </div>
      </div>
    );
  }
}

CategoryType.propTypes = {
  type: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  styleObject: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
