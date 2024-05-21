import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { sessionContext } from '../context/sessionContext';
import { useSession } from '../hooks/useSession';

import { GlobalLayout } from './ui/Layout';

function App() {
  const session = useSession();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F4801A',
        },
      }}
    >
      <sessionContext.Provider value={{ session }}>
        <Router>
          <GlobalLayout />
        </Router>
      </sessionContext.Provider>
    </ConfigProvider>
  );
}

export default App;
