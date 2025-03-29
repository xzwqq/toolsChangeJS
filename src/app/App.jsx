import {
	unstable_HistoryRouter as HistoryRouter,
	Routes,
	Route
} from 'react-router-dom';
import Registration from '../pages/Registration/Registration.jsx';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import { history } from './providers/history.js';
import MyProfile from '../pages/MyProfile/MyProfile.jsx';
import { EditContainer } from '../features/editContainer/index.js';
import { useSelector } from 'react-redux';
import Spinner from '../lib/spinner/Spinner.jsx';

function App() {
	const isLoading = useSelector(state => state.helper.isLoading)
	if(!isLoading){
		return(
			<>
				<Spinner/>
			</>
		)
	} else{
		return (
			<>
				<HistoryRouter history={history}>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/registration' element={<Registration />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/my' element={<MyProfile />}></Route>
						<Route path='/edit/:id' element={<EditContainer />}></Route>
					</Routes>
				</HistoryRouter>
			</>
		);
	}
	
}

export default App;
