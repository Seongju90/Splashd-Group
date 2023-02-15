import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyBrewery } from '../../store/brewery';

export default function MyBreweries() {
    const dispatch = useDispatch()
    const history = useHistory()
    let user = useSelector(state => state.session?.user)
    // console.log('%@!%^#^@#$%^!@$#^%!@$^%#$@!%^#$^@!', myBreweries)
    let userId = user?.id
    // let userId = 10
    let mybreweries = useSelector(state => state.brewery?.mybreweries)

    // useEffect(() => async () => {
    //     await dispatch(thunkMyBrewery(userId))
    // }, [dispatch])
    useEffect(() => {
        dispatch(thunkMyBrewery(userId))
    }, [dispatch])

    return (
        <div>
            My Breweries
            {mybreweries?mybreweries[0]?.id: null}
            <button onClick={() => history.push(`/brewery/${mybreweries[0]?.id}`)}>
                Edit your beers
            </button>
        </div>
    )
}
