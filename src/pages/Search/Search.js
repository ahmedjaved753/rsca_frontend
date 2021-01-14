import React from 'react'
import Calendar from '../../components/Calendar/Calendar'
import Menu from '../../components/Menu/Menu'
import './search.css'

function Search() {

    return (
        <div className="search-container">
            <Menu />
            <main className="main-content">
                <div className="buttons-container">

                </div>
                <div className="calender-and-filters-container">
                    <Calendar />
                </div>
                <div className="search-button-container">
                    <button className="search-button">Search</button>
                </div>
            </main>
        </div>
    )
}

export default Search
