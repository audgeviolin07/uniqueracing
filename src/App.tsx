import { AccountsContextProvider } from "./accounts/AccountsContext";
import "./App.css";
import { AccountsPage } from "./pages/Accounts";
import { TestPage } from "./pages/Test";
import { SdkProvider } from "./sdk/SdkContext";
import { SignByLocalSignerModalProvider } from "./signModal/SignByLocalSignerModalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SdkProvider>
        <SignByLocalSignerModalProvider>
          <AccountsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<AccountsPage />} />
                <Route path="/test" element={<TestPage />} />
              </Routes>
            </BrowserRouter>
          </AccountsContextProvider>
        </SignByLocalSignerModalProvider>
      </SdkProvider>
    </div>
  );
}

export default App;
