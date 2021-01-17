import { useState } from 'react'
import Calendar from '../../components/Calendar/Calendar'
import Menu from '../../components/Menu/Menu'
import './search.css'

function Search() {

    function handleClick() {

    }

    return (
        <div className="search-container">
            <Menu />
            <main className="main-content">
                <div className="buttons-container">

                </div>
                <div className="calender-and-filters-container">
                    <Calendar />
                </div>
                <button onClick={handleClick} className="search-button">Search</button>
            </main>
        </div>
    )
}

export default Search
