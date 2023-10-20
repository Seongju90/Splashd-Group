import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkAllBeer } from '../../store/beer';
import BeerCard from '../BeerCard';
import '../../zCSS/beermany.css'

export default function ManyBeers() {
    const dispatch = useDispatch()
    let user = useSelector(state => state.session?.user)
    let allinfo = useSelector(state => state.beer);
    // let history = useHistory()
    const {onebeer, ...allbeers} = allinfo
    useEffect(() => {
        dispatch(thunkAllBeer());
    }, [dispatch]);



    return allbeers && (
        <div className='beers-container'>
            <h2 className='home-title'>Some Beers To Check Out:</h2>
            {Object.values(allbeers).length ? Object.values(allbeers).map(beer =>
                <div className='beer-card'>
                    <BeerCard beer={beer} user={user}/>
                </div>
            ) :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Sorry! Out Of Luck!</h1>
                    <h3 style={{ paddingTop: '8vw' }}>Try searching for something less specific!</h3>
                </div>
            }
        </div>
    )
}
