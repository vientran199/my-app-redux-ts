import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import {Routes,Route, Navigate} from 'react-router-dom'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} replace/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin' element={<PrivateRoute/>}>
          <Route path='/admin' element={<AdminLayout/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
