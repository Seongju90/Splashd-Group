import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../zCSS/splashpage.css'
import SplashImg from '../../assets/engin-akyurt-UK2oSR1WaIo-unsplash.jpg'
import PhoneImg from '../../assets/masthead-img-main-removebg-preview.png'
import Logo from '../../assets/images-removebg-preview.png'


function SplashPage() {
    const history = useHistory()

    const navigateToAllBeers = () => {
        history.push(`/`)
    }

    return (
        <>
            <div className="splash-page-container">
                <img src={SplashImg} className='home-background-image'/>
                <div className='logo-phone-img-container'>
                    <div className="text-log-subcontainer">
                        <img src={Logo} className='logo-img'
                            width='150px'
                            height='150px'
                        />
                        <div className='splashpage-text'>
                            Discover your favorite beers!
                        </div>
                        <button
                            className="splash-navigate-all-beers"
                            onClick={() => navigateToAllBeers()}
                        ><span>See our collection of beers!</span>
                        </button>
                    </div>
                    <img src={PhoneImg} className='phone-img'
                        width='500px'
                        height='500px'
                    />
                </div>
            </div>
        </>
    )
}

export default SplashPage
