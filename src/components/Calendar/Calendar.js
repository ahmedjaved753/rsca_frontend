import React, { useState, useEffect } from "react";
import _ from "lodash"
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { Button } from "antd";
import DateComp from "../Date/Date";
import { getDays } from "../../helpers/calendar";
import { getAccessAuthHeader } from '../../helpers/localStorage'
import { GET_NUMBER_OF_POSTS_OF_A_MONTH } from '../../routes';
import "./calendar.css";

function Calendar(props) {

    const [monthInCalendar, setMonthInCalendar] = useState((new Date().getMonth() + 1))
    const [yearInCalendar, setYearInCalendar] = useState((new Date().getFullYear()))
    const [noOfPosts, setNoOfPosts] = useState(new Array(getDays(monthInCalendar, yearInCalendar)).fill(0))

    useEffect(() => {
        axios.get(GET_NUMBER_OF_POSTS_OF_A_MONTH, { headers: getAccessAuthHeader(), params: { month: monthInCalendar, year: yearInCalendar } })
            .then(response => {
                console.log(response, "ye raha response");
                setNoOfPosts(op => {
                    const newPosts = new Array(getDays(monthInCalendar, yearInCalendar)).fill(0);
                    for (let day in response.data) {
                        newPosts[day - 1] = response.data[day]
                    }
                    return newPosts;
                })
            })
            .catch(err => console.log(err))
    }, [monthInCalendar, yearInCalendar])

    return (
        <div className="calendar-core">
            {_.range(1, getDays(monthInCalendar, yearInCalendar) + 1).map((n) => (
                <DateComp key={uuid()} dateNum={n} postCount={noOfPosts[n - 1]} />
            ))}
            <Button
                className="set-yesterday-button"
                style={{
                    borderRadius: "10px",
                    border: "1px solid #6C63FF",
                    padding: "0 10px",
                    marginTop: "7px"
                }}
                type="text"
                shape="round"
                ghost
            >
                Set Yesterday
      </Button>
            <Button
                className="set-today-button"
                style={{
                    borderRadius: "10px",
                    border: "1px solid #6C63FF",
                    padding: "0 10px",
                    marginTop: "7px"
                }}
                type="text"
                shape="round"
                ghost
            >
                Set Today
      </Button>
            <Button
                className="clear-button"
                style={{
                    borderRadius: "10px",
                    border: "1px solid #FF4D60",
                    padding: "0 10px",
                    marginTop: "7px"
                }}
                type="text"
                shape="round"
                ghost
            >
                Clear
      </Button>
        </div>
    );
}

export default Calendar;