import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Main } from '../pages/main/page';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-testid">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide-testid">{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Autoplay: () => null,
}));

jest.mock('swiper/css', () => jest.fn());
jest.mock('swiper/css/autoplay', () => jest.fn());

describe('Main Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Main />);
    expect(screen.getByRole('img', { name: /slide 0/i })).toBeInTheDocument();
  });

  test('renders correct number of slides', () => {
    render(<Main />);
    const slides = screen.getAllByRole('img');
    expect(slides).toHaveLength(3);
  });
});
