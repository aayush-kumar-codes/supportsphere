import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComponentA from '../components/ComponentA';
import ComponentB from '../components/ComponentB';

describe('Frontend Components', () => {
  test('renders ComponentA correctly', () => {
    render(<ComponentA />);
    const element = screen.getByText(/Component A/i);
    expect(element).toBeInTheDocument();
  });

  test('ComponentA handles click event', () => {
    render(<ComponentA />);
    const button = screen.getByRole('button', { name: /Click Me/i });
    button.click();
    const message = screen.getByText(/Button clicked/i);
    expect(message).toBeInTheDocument();
  });

  test('renders ComponentB with props', () => {
    const testProp = 'Test Prop';
    render(<ComponentB propValue={testProp} />);
    const element = screen.getByText(testProp);
    expect(element).toBeInTheDocument();
  });

  test('ComponentB handles empty prop gracefully', () => {
    render(<ComponentB propValue={null} />);
    const fallbackElement = screen.getByText(/No data available/i);
    expect(fallbackElement).toBeInTheDocument();
  });

  test('ComponentA matches snapshot', () => {
    const { asFragment } = render(<ComponentA />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('ComponentB matches snapshot with props', () => {
    const testProp = 'Snapshot Test';
    const { asFragment } = render(<ComponentB propValue={testProp} />);
    expect(asFragment()).toMatchSnapshot();
  });
});