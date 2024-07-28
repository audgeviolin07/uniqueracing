import { AccountsContextProvider } from './accounts/AccountsContext';
import './App.css';
import { AccountsPage } from './pages/Accounts';
import { SdkProvider } from './sdk/SdkContext';
import { SignByLocalSignerModalProvider } from './signModal/SignByLocalSignerModalContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/game';

function App() {
  return (
    <Router>
      <div className="App">
      <SdkProvider>
        <SignByLocalSignerModalProvider>
          <AccountsContextProvider>
            <Routes>
              <Route path='/' element={<AccountsPage />} />
              <Route path='/game' element={<Game />} />
            </Routes>
          </AccountsContextProvider>
        </SignByLocalSignerModalProvider>
      </SdkProvider>
    </div>
    </Router>
  );
}

export default App;
