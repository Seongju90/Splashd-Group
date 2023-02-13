import { useHistory} from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import { useDispatch } from 'react-redux';

export default function BeerCard({ beer, user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { beer_logo, id, description,
        type, abv, ibu, num_reviews, avg, name } = beer

    const handleClick =()=> {
        dispatch(thunkOneBeer(id))
        history.push(`/beer/${id}`)
    }
        // console.log(beer)
    return beer && (

        <div>
            <div
            onClick={handleClick }
                >
                <img key={`beerlogo${id}`}
                    src={`${beer_logo}`}
                    alt='previewimageforcard'
                />

            </div>

            <div >
                <div>Name: {name}</div>
                <div>Desc: {description}</div>
                <div>Average Rating:{avg}</div>
                <div>Number of Checkins: {num_reviews}</div>
                <div>ABV:{abv}</div>
            </div>
        </div >

    )

}
