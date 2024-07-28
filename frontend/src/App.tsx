import { AccountsContextProvider } from './accounts/AccountsContext';
import './App.css';
import { AccountsPage } from './pages/Accounts';
import CarGame from './pages/CarGame';
import CarTrade from './pages/CarTrade';
import CarAchievements from './pages/CarAchievements';
import { TestPage } from './pages/Test';
import { SdkProvider } from './sdk/SdkContext';
import { SignByLocalSignerModalProvider } from './signModal/SignByLocalSignerModalContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WinnerPage from './pages/WinnerPage';

function App() {
  return (
    <Router>
      <div className="App">
      <SdkProvider>
        <SignByLocalSignerModalProvider>
          <AccountsContextProvider>
            <Routes>
              <Route path='/' element={<AccountsPage />} />
              <Route path='/game' element={<CarGame />} />
              <Route path='/achievements' element={<CarAchievements />} />
              <Route path='/trade' element={<CarTrade />} />
              <Route path='/cargame' element={<CarGame />} />
              <Route path='/test' element={<TestPage />} />
              <Route path='/winner' element={<WinnerPage />} />
            </Routes>
          </AccountsContextProvider>
        </SignByLocalSignerModalProvider>
      </SdkProvider>
    </div>
    </Router>
  );
}

export default App;
