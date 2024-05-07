import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { ProfilePage } from '../pages/profile/page';

test('Renders the Profile page', () => {
  render(
    <Router>
      <ProfilePage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
