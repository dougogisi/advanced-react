import React from 'react';
import ArticleList from '../ArticleList';

// import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const testProps = {
  articles: {
    a: { id: 'a', title: '', body: '' },
    b: { id: 'b', title: '', body: '' },
  }
};

describe('ArticleList', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
