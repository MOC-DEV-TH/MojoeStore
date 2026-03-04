import React from 'react';
import FallbackUI from './FallbackUI';
import {Alert} from 'react-native';
import {SCREENS, navigate} from '@navigations';

interface ErrorBoundaryState {
  error: any | null;
}

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    return {error};
  }

  componentDidCatch(error: Error, info: {componentStack: string}) {
    console.log('componentDidCatch error', error);
    console.error('componentDidCatch info', info);
  }

  handleOnActionBtn = () => {
    navigate(SCREENS.LOGIN.name);
    this.setState({
      error: null,
    });
  };

  render() {
    return this.state.error ? (
      <FallbackUI error={this.state.error} actionBtn={this.handleOnActionBtn} />
    ) : (
      this.props.children
    );
  }
}
