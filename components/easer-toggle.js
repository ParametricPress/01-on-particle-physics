import React from 'react';
import TWEEN from 'tween.js';
import raf from 'raf';

// Example:
// [EaserToggle value:time targetValue:10 ] Start! [/easer]

const stages = {
  INITIAL: 0,
  ANIMATING: 1,
  FINAL: 2
}

let isEasing = false;

const animate = () => {
  const update = TWEEN.update();
  requestAnimationFrame(animate);
};

class EaserToggle extends React.PureComponent {

  constructor(props) {
    super(props);

    this._initialValue = this.value;
    this.state = {
      stage: stages.INITIAL,
      isToggleOn: true
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
		this.setState(function(prevState) {
      if (this.state.isToggleOn) {
        this.onClick();
      } else {
        this.onStop();
      }
			return {isToggleOn: !prevState.isToggleOn};
		});
	}

  onClick() {
    if (isEasing || this.state.stage !== stages.INITIAL) {
      return;
    }
    isEasing = true;
    TWEEN.removeAll();
    this.setState({stage: stages.ANIMATING});
    let _tween = { value : +this.props.value };
    new TWEEN.Tween(_tween)
      .to({value: this.props.targetValue}, 3000) // TODO: add 'time' variable
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        this.props.updateProps({ value: _tween.value });
      }).onStop(() => {
        this.setState({stage: stages.INITIAL });
      }).onComplete(() => {
        isEasing = false;
        this.setState({stage: stages.INITIAL });
        this.handleClick();
      }).start();

    animate();
  }

  onStop() {
    isEasing = false;
    TWEEN.removeAll();
    this.setState({stage: stages.INITIAL });
  }


  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'Go!' : 'Stop.'}
      </button>
    );
  }
}


export default EaserToggle;
