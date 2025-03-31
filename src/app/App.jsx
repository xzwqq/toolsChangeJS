import {
	unstable_HistoryRouter as HistoryRouter,
	Routes,
	Route,
} from 'react-router-dom';
import Registration from '../pages/Registration/Registration.jsx';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import { history } from './providers/history.js';
import MyProfile from '../pages/MyProfile/MyProfile.jsx';
import { EditContainer } from '../features/editContainer/index.js';
import { useDispatch, useSelector } from 'react-redux';
import ToolsSend from '../pages/ToolsSend/ToolsSend.jsx';
import Spinner from '../lib/spinner/Spinner.jsx';
import { useEffect } from 'react';
import { HelperActions } from '../utils/helper/helperSlice.js';

function App() {
	const dispatch = useDispatch()
	const isLoading = useSelector(state => state.helper.isLoading)
	useEffect(() => {
		const unlisten = history.listen(({ location }) => {
		  console.log('Новый путь:', location.pathname);
		  dispatch(HelperActions.reset())
		});
		
		return () => unlisten();
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [history]);


		return (
			<>
				{isLoading ? <Spinner/> : null}
				<HistoryRouter history={history}>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/registration' element={<Registration />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/my' element={<MyProfile />}></Route>
						<Route path='/toolsend' element={<ToolsSend />}></Route>
						<Route path='/edit/:id' element={<EditContainer />}></Route>
					</Routes>
				</HistoryRouter>
			</>
		);
	
}

export default App;
