import React from 'react';
import PropTypes from 'prop-types';

// import DataApi from 'state-api'; // by setting the node path this will work locally and will work when we want to import this from npm packages
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  };
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  state = this.props.store.getState();

  // articleActions = {
  //   lookupAuthor: (authorId) => this.state.authors[authorId]
  // }
  render() {
    return (
      <div>
        <SearchBar />
        <ArticleList
          articles={this.state.articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;
