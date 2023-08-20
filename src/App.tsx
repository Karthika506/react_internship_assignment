import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import './App.css'
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<FirstPage/>} />
          <Route path='/second' element={<SecondPage/>} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
