import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar';
import Login from './pages/Login';
import Register from './pages/Register';

import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'

function App() {
  const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
