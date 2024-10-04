import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';

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
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/category/:category' element={<Category />} />
          <Route path='/product/:id/:product' element={<Product />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
