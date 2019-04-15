import React from 'react';
import TWEEN from 'tween.js';
import raf from 'raf';

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

class Easer extends React.PureComponent {

  constructor(props) {
    super(props);

    this._initialValue = this.value;
    this.state = {
      stage: stages.INITIAL
    };
    this.onClick = this.onClick.bind(this);
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
      .to({value: this.props.targetValue}, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.props.updateProps({ value: _tween.value });
      }).onStop(() => {
        this.setState({stage: stages.INITIAL });
      }).onComplete(() => {
        isEasing = false;
        this.setState({stage: stages.INITIAL });
      }).start();


    animate();
  }

  render() {
    return (
      <button onClick={this.onClick}>
        {this.props.children}
      </button>
    );
  }
}


export default Easer;
