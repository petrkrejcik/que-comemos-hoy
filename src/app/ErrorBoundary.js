import React from 'react';
import { Dialog } from 'dialog/Dialog';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) {
      return this.props.children;
    }
    console.error(error.toString());
    return (
      <Dialog open title="Ooops">
        {error.message}
      </Dialog>
    );
  }
}
