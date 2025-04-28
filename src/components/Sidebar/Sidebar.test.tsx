import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const setFilter = jest.fn();

  it('renderiza el título "Filters" y los acordeones', () => {
    render(<Sidebar setFilter={setFilter} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Brands')).toBeInTheDocument();
  });
});