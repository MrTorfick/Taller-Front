import { Provider } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router';
import NoEncontrado404 from './components/ErrorPages/NoEncontrado404';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NoEncontrado404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>


  );
}

export default App;
