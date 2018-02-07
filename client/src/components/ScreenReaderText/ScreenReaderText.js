// @flow
import React, { Component } from 'react';
import styled from 'react-emotion';

type Props = {
  initialText: string
};

type State = {
  text: string
};

const Text = styled('div')`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

/*
 * This component is used to let users with screenreaders know something changed.
 * It only updates on state changes because it is more or less a self-contained
 * Component that shouldn't affect any others in any way. You have to manually
 * call `setText` to make this do anything. 
 */
export default class ScreenReaderText extends Component<Props, State> {
  static defaultProps = {
    initialText: ''
  };

  state = {
    text: this.props.initialText
  };

  componentDidMount() {
    if (this.state.text) {
      this.clearText();
    }
  }

  // This component only updates on state changes.
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.text !== this.state.text;
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  unmounted: boolean = false;

  timer: TimeoutID;

  setText(text: string) {
    if (this.unmounted) {
      return;
    }

    clearTimeout(this.timer);

    this.setState({ text });
    this.clearText();
  }

  clearText() {
    this.timer = setTimeout(() => this.setState({ text: '' }), 2000);
  }

  render() {
    return <Text aria-live="polite">{this.state.text}</Text>;
  }
}
