class StateApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      articles: this.mapIntoObject(this.rawData.articles),
      authors: this.mapIntoObject(this.rawData.authors)
    };
  }

  mapIntoObject(arr) {
    let result = {};
    if(typeof arr === 'object') {
      Object.keys(arr).map(function(key) {
        return result[arr[key].id] = arr[key];
      });
    }

    return Object.keys(result).length ? result : arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }
  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  }
  getState = () => {
    return this.data;
  }
}

export default StateApi;
