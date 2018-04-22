import React from 'react';

import DataApi from '../DataApi';
import { data } from '../testData';
import ArticleList from './ArticleList';

const api = new DataApi(data);

class App extends React.Component {
  // state = {
  //   answer: 42
  // };
  // asyncFunc = () => {
  //   return Promise.resolve(37);
  // };
  //
  // async componentDidMount() {
  //   this.setState({
  //     answer: await this.asyncFunc()
  //   });
  // }

  constructor() {
    super();
    this.state = {
      articles: api.getArticles(),
      authors: api.getAuthors()
    };

    console.log(this.state);
  }
  // lookupAuthor

  articleActions = {
    lookupAuthor: (authorId) => this.state.authors[authorId]
  }

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        articleActions={this.articleActions}
      />
    );
  }
}

export default App;
