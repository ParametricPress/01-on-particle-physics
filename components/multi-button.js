import React from 'react';
const ReactDOM = require('react-dom');

class MultiButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleClick(value) {
    this.props.updateProps({
      value: value,
      reset: 0
    });
  }

  render() {
    const {
      idyll,
      hasError,
      updateProps,
      options,
      value,
      ...props
    } = this.props;

    return (
      <div className="parametric-multi-button-container">
        {options.map(d => {
          return (
            <button
              key={d.value}
              className={`parametric-multi-button ${d.value === value ? 'selected' : ''}`}
              onClick={() => this.handleClick(d.value)}
            >
              {d.label || d.value}
            </button>
          );
        })}
      </div>
    );
  }
}

export default MultiButton;
