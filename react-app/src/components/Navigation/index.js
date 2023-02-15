import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div id='navcontainer'>
			{/* {isLoaded && ( */}
			<div className='navcont navleft'>
				<div className='homebutton navcont'
					onClick={() => window.scroll(0, 0) || history.push('/')}
				>Splashd</div>
			</div >
			<div className='navcont navright'>
				<ProfileButton className='navcont navright' user={sessionUser} />
				<div>
				</div>
			</div>

		</div >
	);
}

export default Navigation;