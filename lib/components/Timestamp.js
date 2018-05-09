import React from 'react';
import storeProvider from './storeProvider'; // demonstrating reading from state directly as as lesson in optimisation and showing situations when you do need a value to be globally available

class Timestamp extends React.Component {
  render() {
    return (
      <div>
        {this.props.timestamp.toString()}
      </div>
    );
  }
}

function extraProps(store, originalProps) {
  return {
    timestamp: store.getState().timestamp
  };
}

export default storeProvider(extraProps)(Timestamp);
