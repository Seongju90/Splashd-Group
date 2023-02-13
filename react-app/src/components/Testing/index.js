import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BeerFormModal from '../BeerFormModal';
import EditBeerModal from '../EditBeerModal';
import ReviewFormModal from '../ReviewFormModal';
import EditReviewModal from '../EditReviewModal';

// TESTING IMPORTS
import { thunkOneBrewery, thunkAllBrewery } from '../../store/brewery';
import BreweryFormModal from '../BreweryFormModal';
import { thunkOneBeer, thunkCreateBeer, thunkAllBeer, thunkRemoveBeer } from '../../store/beer';

function Tester() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [beer, setBeer] = useState(useSelector((state) => state.beer.onebeer))
    const closeMenu = () => setShowMenu(false);

    const tester = async () => {
        let sight = await dispatch(thunkAllBeer()).catch((e)=>console.log(e, 'was caught'))
        console.log(sight, 'was returned')
        // console.log('Hey')
        return sight
    }

    const remove = () => {
        const goodbye = dispatch(thunkRemoveBeer(3)).catch((e)=>console.log(e, 'was caught'))
        console.log("goodbye")
        // console.log('Hey')
        return goodbye
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
            <div onClick={()=>remove()}
            style={{
                border: '2px solid black',
                margin: '10px',
                width: 'fit-content',
                padding: '5px'
            }}
            >
            remove
            </div>
            <OpenModalButton
              buttonText="Post Test"
              onItemClick={closeMenu}
              modalComponent={<EditBeerModal />}
            />
            <OpenModalButton
            buttonText="Create a Review"
            modalComponent={<ReviewFormModal/>}
            />
            <OpenModalButton
            buttonText="Edit a Review"
            modalComponent={<EditReviewModal />}
            />
        </>
    );
}

export default Tester;
