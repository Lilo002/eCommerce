import { BrowserRouter as Router } from 'react-router-dom';

import { sessionContext } from '../context/sessionContext';
import { useSession } from '../hooks/useSession';

import { GlobalLayout } from './ui/Layout';

function App() {
  const session = useSession();

  return (
    <sessionContext.Provider value={{ session }}>
      <Router>
        <GlobalLayout />
      </Router>
    </sessionContext.Provider>
  );
}

export default App;
