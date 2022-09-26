import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<>
			<Router>
				<div className='container'>
					<Navbar />
					<Routes>
						<Route path='/' element={<Dashboard />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/register' element={<Register />}></Route>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
