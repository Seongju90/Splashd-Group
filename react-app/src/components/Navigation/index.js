import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div>
			{/* hey */}
			<div>
				<div>
					<NavLink exact to="/">Home</NavLink>
				</div>
				{/* {isLoaded && ( */}
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				{/* )} */}
			</div>
			
		</div>
	);
}

export default Navigation;