import {render} from '@testing-library/react';
import {Spinner} from './spinner';


describe('Spinner component', () => {
  it('should render the spinner element', () => {
    const {getByTestId} = render(<Spinner/>);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
