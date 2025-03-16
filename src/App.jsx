import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Pages from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='*' element={<Pages.Homepage/>}/>
        <Route path='/login' element={<Pages.Login/>}/>
        <Route path='/signup' element={<Pages.Signup/>}/>
        <Route path='/dashboard' element={<Pages.Dashboard/>}/>
        <Route path='/preview-book' element={<Pages.PreviewBook/>}/>
        <Route path='/add-book' element={<Pages.AddBook/>}/>
        <Route path='/update-book' element={<Pages.UpdateBook/>}/>
        <Route path='/profile' element={<Pages.ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App;
