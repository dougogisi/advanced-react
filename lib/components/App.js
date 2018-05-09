import React from 'react';
import PropTypes from 'prop-types';

// import DataApi from 'state-api'; // by setting the node path this will work locally and will work when we want to import this from npm packages
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';
import Timestamp from './Timestamp';

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
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.props.store.unsubscribe(this.subscriptionId));
  }
  // setSearchTerm = ( searchTerm ) => {
  //   this.setState({ searchTerm });
  // }
  // articleActions = {
  //   lookupAuthor: (authorId) => this.state.authors[authorId]
  // }
  // update when the store state changes.... subscribe
  render() {
    let { articles, searchTerm } = this.state;
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.toLowerCase().match(searchTerm)
          || value.body.toLowerCase().match(searchTerm);
      });
    }

    return (
      <div>
        <Timestamp />
        <SearchBar doSearch={this.props.store.setSearchTerm}/>
        <ArticleList
          articles={articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;
