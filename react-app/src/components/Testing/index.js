import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BeerFormModal from '../BeerFormModal';
// TESTING IMPORTS
import { thunkOneBrewery, thunkAllBrewery } from '../../store/brewery';
import BreweryFormModal from '../BreweryFormModal';
import { thunkOneBeer, thunkCreateBeer } from '../../store/beer';

function Tester() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const tester = async () => {
        let sight = await dispatch(thunkOneBeer(2)).catch((e)=>console.log(e, 'was caught'))
        console.log(sight, 'was returned')
        // console.log('Hey')
        return sight
    }

    return (
        <>
            <div onClick={()=>tester()}
            style={{
                border: '2px solid black',
                margin: '10px',
                width: 'fit-content',
                padding: '5px'
            }}
            >
            Test Get
            </div>
            <OpenModalButton
              buttonText="Post Test"
              onItemClick={closeMenu}
              modalComponent={<BeerFormModal id='3'/>}
            />
        </>
    );
}

export default Tester;
