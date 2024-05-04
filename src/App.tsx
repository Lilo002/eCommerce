import { RouterProvider } from 'react-router-dom';

import { sessionContext } from './context/sessionContext';
import { useSession } from './hooks/useSession';
import { router } from './router';

import './styles/_app.scss';

function App() {
  const session = useSession();

  return (
    <sessionContext.Provider value={{ session }}>
      <RouterProvider router={router} />
    </sessionContext.Provider>
  );
}

export default App;
