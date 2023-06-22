import {Route, Routes } from 'react-router-dom';
import '../styles/App.css'
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';
import {AuthProvider} from '../contexts/AuthContext'
import RequireAuth from './RequireAuth';
import NotRequireAuth from './NotRequireAuth';

function App() {
  return (
    <div>
      <AuthProvider>
          <Layout>
            <Routes>
                  <Route path='/' element={<Home/>}></Route>
                  <Route path='/signup' element={<NotRequireAuth><Signup/></NotRequireAuth>}></Route>
                  <Route path='/login' element={<NotRequireAuth><Login/></NotRequireAuth>}></Route>
                  <Route path='/quiz/:id' element={<RequireAuth><Quiz/></RequireAuth>}></Route>
                  <Route path='/result/:id' element={<RequireAuth><Result/></RequireAuth>}></Route>
            </Routes>
          </Layout>
        </AuthProvider>
    </div>
  );
}

export default App;
