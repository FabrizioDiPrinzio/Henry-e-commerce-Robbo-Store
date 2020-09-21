import React, {useState, useEffect} from 'react';
import UserFormLine from './userFormLine/UserFormLine.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormAdmin.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin() {
	// const userList = useSelector(state => state.users)
	// const dispatch = useDispatch()

	const [userList, setUserList] = useState([]);

	useEffect(() => {
		//dispatch(allActions.userActions.LO QUE SEA)

		axios.get(`${urlBack}/user`).then(response => {
			setUserList(response.data);
			console.log(response.data);
		});
	}, []);

	// const userList = useSelector(state => state.users)
	return (
		<div className="userFormAdmin">
			<h2> Panel de Control de Usuarios </h2>
			<div className="userTableTitleContainer">
				<div className="userTableTitle">
					<h5 class="userTableTitlelabel">Nombre</h5>
					<h5 class="userTableTitlelabel">Email</h5>
					<h5 class="userTableTitlelabel">Password</h5>
					<h5 class="userTableTitlelabel">Rol</h5>
					<h5 class="userTableTitlelabel">Action</h5>
				</div>
			</div>
			<div className="userListContainer">
				<ul className="userList">
					{userList &&
						userList.map(user => (
							<li className="listItem" key={user.id}>
								<UserFormLine userInfo={user} />
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
