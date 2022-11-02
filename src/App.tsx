import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import Student from 'features/student';
import AddEditPage from 'features/student/pages/AddEditPage';
import ListPage from 'features/student/pages/ListPage';
import React from 'react';
import {Routes,Route, Navigate} from 'react-router-dom'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} replace/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin' element={<PrivateRoute/>}>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/students" element={<Student/>}>
              <Route path="" element={<ListPage/>}/>
              <Route path="add" element={<AddEditPage/>}/>
              <Route path=":studentId" element={<AddEditPage/>}/>
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
