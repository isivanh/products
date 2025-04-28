import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListChip } from './ListChip';
import { FilterTypes, ChipData} from '../../types/types';

describe('ListChip', () => {
  const baseProps = {
    setProductStatus: jest.fn(),
    setProductBrand: jest.fn(),
    setChipData: jest.fn(),
    setFilter: jest.fn(),
    productStatus: {},
    productBrand: {},
  };

  it('debería renderizar correctamente (snapshot)', () => {
    const chipData: ChipData[] = [{ key: '1', label: 'test', type: FilterTypes.STATUS }];
    const { asFragment } = render(
      <ListChip {...baseProps} chipData={chipData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('debería mostrar el texto correcto', () => {
    const chipData: ChipData[] = [{ key: '2', label: 'test', type: FilterTypes.BRAND }];
    render(<ListChip {...baseProps} chipData={chipData} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});