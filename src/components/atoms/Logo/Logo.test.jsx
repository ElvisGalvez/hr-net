import React from 'react';
import renderer from 'react-test-renderer';
import Logo from './index'; 

describe('Logo', () => {
  it('renders correctly when expanded', () => {
    const tree = renderer
      .create(<Logo isExpanded={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when collapsed', () => {
    const tree = renderer
      .create(<Logo isExpanded={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
