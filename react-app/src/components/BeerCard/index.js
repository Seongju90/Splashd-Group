import { useHistory } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import { useDispatch } from 'react-redux';
import "../../zCSS/beercard.css"

export default function BeerCard({ beer, user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { beer_logo, id, description,
        type, abv, ibu, name, num_reviews, avg} = beer

    // console.log(beer.brewery.name)
    const breweryName = beer?.brewery?.name
    let num
    if (!num_reviews){
    num = beer?.reviews?.length
    } else{
        num = num_reviews
    }
    let totalReviews = 0;
    beer?.reviews?.forEach(rev => {
        totalReviews += rev.rating
    });
    let average
    if (!avg){
        average = Math.round(totalReviews/num * 100) / 100
    } else{
            average = Math.round(avg * 100) / 100
    }


    const handleClick = () => {
        dispatch(thunkOneBeer(id))
            .then(() => history.push(`/beer/${id}`))
            .then(() => window.scroll(0, 0))
    }
    console.log(beer)
    return beer && (

        <div className="beer-card-main-container">
            <div className="beer-logo-info-container1">
                {/* <div
                    onClick={handleClick}
                > */}
                <img
                    className='beer-icon'
                    key={`beerlogo${id}`}
                    src={`${beer_logo}`}
                    alt='previewimageforcard'
                    onClick={handleClick}
                />
                {/* </div> */}
                <div className="beer-details-information">
                    <div className="beer-detail-name">
                        {name}
                    </div>
                    <div className="beer-detail-brewery" style={{color: "#8a4500"}}>
                        {breweryName}
                    </div>
                    <div className="beer-detail-type" style={{color: "#8a4500"}}>
                        {type}
                    </div>
                    <div className="beer-detail-description" style={{color: "#545151"}}>
                        {description}
                    </div>
                </div>
            </div>
            <div className="beer-info-container" style={{border: "2px solid whitesmoke"}}>
                <div className="beer-detail-abv" style={{color: "#545151"}}>
                    {abv}% ABV
                </div>
                <div className="beer-detail-ibu" style={{color: "#545151"}}>
                    {ibu} IBU
                </div>
                <div className="beer-detail-avgRating" style={{color: "#545151"}}>
                    Average Rating:{average ? average : 'No Reviews!'}
                </div>
                <div className="beer-detail-checkin" style={{color: "#545151"}}>
                    Number of Check-ins: {num ? num : 'Zerroo'}
                </div>
            </div>
        </div >
    )
}
