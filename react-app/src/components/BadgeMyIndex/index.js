import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { thunkAllBeer } from '../../store/beer';
import { thunkMyBadges } from '../../store/badge';
// import BeerCard from '../BeerCard';

export default function MyBadges() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session?.user)
    const badges = useSelector(state => state.badges);
    const history = useHistory()
    const { mybadges, ...allbadges } = badges
    useEffect(() => {
        dispatch(thunkMyBadges(user?.id));
    }, [dispatch]);
    console.log("mybadges", mybadges)


    return (
        <div>
            {mybadges?.length ? mybadges.map(badge =>
                <div className='mybadge-badge'>
                    <div className='badge-icon'>
                        <img className='badge-icon' src={badge.icon} />
                    </div>
                    <div className='badge-description'>
                        {badge.description}
                        
                    </div>
                </div>
            ) :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Sorry! Out Of Luck!</h1>
                    <h3 style={{ paddingTop: '8vw' }}>Try having a drink and Checking In some Beers!</h3>
                </div>

            }

        </div>
    )
}
