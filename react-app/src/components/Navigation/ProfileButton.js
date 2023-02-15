import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import BreweryFormModal from "../BreweryFormModal";
import { thunkMyBadges, thunkAllBadges } from "../../store/badge";
import { thunkMyBrewery } from "../../store/brewery";
import { thunkMyReviews } from "../../store/review";
import { login } from "../../store/session";
import profile from '../../assets/profile.png'


function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleClick = async () => {
    dispatch(thunkMyBadges(user?.id))
    await dispatch(thunkAllBadges())
    setShowMenu(false)
    history.push("/user/badges")
    // console.log('%%%%!%!%!%!%!%!%%!%!%!%!!%!%!%!%!%')
  }

  const handleBrew = () => {
    dispatch(thunkMyBrewery(user?.id))
    setShowMenu(false)
    history.push(`/users/${user.id}/brewery`)
  }

  const handleReview = () => {
    dispatch(thunkMyReviews(user?.id))
    setShowMenu(false)
    history.push(`/users/${user.id}/reviews`)
  }

  const demoUser = async (e) => {
    await dispatch(login('demo@gmail.com', 'password'));
    setShowMenu(false)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profilebutton dropdown">
      <div onClick={openMenu}
      >
        <img src={profile} style={{ border: '1px solid black', cursor: 'pointer',height: '3vw', width: '3vw' }} />
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.name}</div>
            <OpenModalButton
              buttonText="Make a Brewery"
              onItemClick={closeMenu}
              modalComponent={<BreweryFormModal id={user.id} />}
            />
            <div>
              <div

                onClick={handleClick}>My Badges</div>
            </div>
            <div>
              <div

                onClick={handleBrew}>My Breweries</div>
            </div>
            <div>
              <div

                onClick={handleReview}>My Reviews</div>
            </div>
            <div>
              <div onClick={handleLogout}>Log Out</div>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <div onClick={demoUser}>
              Demo User
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
