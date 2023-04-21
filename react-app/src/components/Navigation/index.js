import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import ContactUsModal from '../ContactUsModal';
import OpenModalButton from '../OpenModalButton';
import "../../zCSS/nav.css";


function Navigation() {
	const sessionUser = useSelector(state => state.session?.user);
	const history = useHistory()
	const location = useLocation()

	return (
		<div id='navcontainer'>
			{/* {isLoaded && ( */}
			<div className='navcont navleft'>
				<div className='homebutton navcont'
					onClick={() => window.scroll(0, 0) || history.push('/')}
				>Splashd</div>
			</div >
			<div className='contact-us'>
				{location.pathname === '/' ? null : <OpenModalButton
					buttonText="Contact Us"
					// onItemClick={closeMenu}
					modalComponent={<ContactUsModal />}
				/>}
			</div>
			<div className='navcont navright'>
				<div>
				{location.pathname === '/' ? null : <ProfileButton className='navcont navright' user={sessionUser}/>}
				</div>
			</div>

		</div >
	);
}

export default Navigation;
