import React from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  state = {
    searchTerm: ''
  }
  doSearch = debounce(() => {
    console.log(this.state.searchTerm);
  }, 300);
  handleClick = (e) => {
    this.setState({ searchTerm: e.target.value }, () => {
      this.doSearch();
    });
  }
  render() {
    return (
      <input
        // ref={(input) => this.searchInput = input} one way to accees the searc input value
        type="search"
        placeholder="Enter search term"
        value={this.state.searchTerm}
        onChange={this.handleClick}
      />
    );
  }
}

export default SearchBar;
