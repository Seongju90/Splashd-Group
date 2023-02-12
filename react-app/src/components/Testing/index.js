import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// TESTING IMPORTS
import { thunkOneBrewery, thunkAllBrewery } from '../../store/brewery';

function Tester() {
    const dispatch = useDispatch()

    const tester = async () => {
        let sight = await dispatch(thunkOneBrewery(1)).catch((e)=>console.log(e, 'was caught'))
        console.log(sight, 'was returned')
        // console.log('Hey')
        return sight
    }
    const posttester = async () => {
        // let sight = await dispatch().catch((e)=>console.log(e, 'was caught'))
        // console.log(sight, 'was returned')
        console.log('Hey')
        // return sight
    }

    return (
        <>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>

            </ul>
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
            <div onClick={()=>posttester()}
            style={{
                border: '2px solid black',
                margin: '10px',
                width: 'fit-content',
                padding: '5px'
            }}
            >
            Test Post
            </div>
        </>
    );
}

export default Tester;