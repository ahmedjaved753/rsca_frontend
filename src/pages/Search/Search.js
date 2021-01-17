import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { message } from 'antd';
import Calendar from '../../components/Calendar/Calendar'
import Menu from '../../components/Menu/Menu'
import { PostsContext } from '../../contexts/PostsContext/postContext'
import './search.css'

function Search() {
    const [dates, setDates] = useState([]);
    const { setDates: setDatesInContext } = useContext(PostsContext)
    const history = useHistory();

    function handleClick() {
        console.log(dates, "ye rhi dates");
        // eslint-disable-next-line
        if (dates[0] == undefined || dates[1] == undefined) {
            message.error("Please select the start and end dates");
            return;
        } else {
            setDatesInContext(dates);
            history.push('/posts')
        }
    }

    return (
        <div className="search-container">
            <Menu />
            <main className="main-content">
                <div className="buttons-container">

                </div>
                <div className="calender-and-filters-container">
                    <Calendar setDates={setDates} />
                </div>
                <button onClick={handleClick} className="search-button">Search</button>
            </main>
        </div>
    )
}

export default Search
