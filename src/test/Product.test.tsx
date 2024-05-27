import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import { SessionContextProviderMock } from '../__mocks__/sessionContextProviderMock';
import { ProductPage } from '../pages/product/page';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ productId: '1' }),
  useNavigate: () => jest.fn(),
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-testid">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide-testid">{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Pagination: () => null,
}));

jest.mock('swiper/css/navigation', () => jest.fn());
jest.mock('swiper/css/pagination', () => jest.fn());
jest.mock('swiper/css/effect-flip', () => jest.fn());
jest.mock('swiper/css', () => jest.fn());

describe('ProductPage component', () => {
  test('renders product details when product is found', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/products/1']}>
        <SessionContextProviderMock>
          <Routes>
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </SessionContextProviderMock>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getByText('Mock Product')).toBeInTheDocument();
      expect(getByText('Mock Description')).toBeInTheDocument();
      expect(getByText('Details')).toBeInTheDocument();
    });
  });

  test('redirects to not found page when product is not found', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/products/invalid-product-id']}>
        <SessionContextProviderMock>
          <Routes>
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </SessionContextProviderMock>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(getByText('Product not found')).toBeInTheDocument();
    });
  });
});
