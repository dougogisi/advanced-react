class StateApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      articles: this.mapIntoObject(this.rawData.articles),
      authors: this.mapIntoObject(this.rawData.authors),
      searchTerm: '',
      timestamp: new Date()
    };
    this.subscriptions = {};
    this.lastSubscriptionId = 0;
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

  subscribe = (cb) => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId;
  }

  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId];
  }

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  }

  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange
    };
    this.notifySubscribers();
  };

  setSearchTerm = ( searchTerm ) => {
    this.mergeWithState({
      searchTerm
    });
    // this.setState({ searchTerm });
    // this.data.searchTerm = searchTerm;
    // this.notifySubscribers();
  }

  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date()
      });
    }, 1000);
  }
}

export default StateApi;
