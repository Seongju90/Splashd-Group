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
    history.push("/user/badges")
    console.log('%%%%!%!%!%!%!%!%%!%!%!%!!%!%!%!%!%')
  }
  const handleBrew = () => {
    dispatch(thunkMyBrewery(user?.id))
    history.push(`/users/${user.id}/brewery`)
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <OpenModalButton
              buttonText="Make a Brewery"
              onItemClick={closeMenu}
              modalComponent={<BreweryFormModal />}
            />
            <div>
            <button
            type='button'
            onClick={handleClick}>My Badges</button>
            </div>
            <div>
              <button
                type='button'
                onClick={handleBrew}>My Breweries</button>
            </div>
            <div>
              <button onClick={handleLogout}>Log Out</button>
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
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
