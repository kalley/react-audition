// @flow
import React, { PureComponent } from 'react';
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

export default class ScreenReaderText extends PureComponent<Props, State> {
  static defaultProps = {
    initialText: ''
  };

  state = {
    text: this.props.initialText
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  unmounted: boolean = false;

  setText(text: string) {
    if (this.unmounted) {
      return;
    }

    this.setState({ text });
  }

  render() {
    return <Text aria-live="polite">{this.state.text}</Text>;
  }
}
