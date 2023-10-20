import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkOneBrewery } from '../../../store/brewery';
import BadgeFormModal from '../../BadgeFormModal';
// import OpenModalButton from "../OpenModalButton";
// import BeerFormModal from '../BeerFormModal';
// import EditBeerModal from '../EditBeerModal';
// import ReviewFormModal from '../ReviewFormModal';
// import EditReviewModal from '../EditReviewModal';
// import { thunkDeleteReview } from '../../../store/review';

// TESTING IMPORTS
// import { thunkOneBrewery, thunkAllBrewery } from '../../store/brewery';
// import BreweryFormModal from '../BreweryFormModal';
// import { thunkOneBeer, thunkCreateBeer, thunkAllBeer, thunkRemoveBeer } from '../../store/beer';

function Tester() {
    const dispatch = useDispatch()
    // const [showMenu, setShowMenu] = useState(false);
    // const [beer, setBeer] = useState(useSelector((state) => state.beer.onebeer))
    // const closeMenu = () => setShowMenu(false);

    useEffect(
        async () => {
            await dispatch(thunkOneBrewery(1))
        }, []
    )
    const badges = useSelector((state) => state.badges)


    return (
        <>
            {/* <div onClick={()=>tester()}
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
            /> */}
            <BadgeFormModal/>
        </>
    );
}

export default Tester;
