import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Button, Spin } from "antd";
import { FaLessThan, FaGreaterThan, FaCalendarAlt } from "react-icons/fa";
import { CgArrowLongRight } from "react-icons/cg";
import DateComp from "../Date/Date";
import { getDays } from "../../helpers/calendar";
import { getAccessAuthHeader } from "../../helpers/localStorage";
import { GET_NUMBER_OF_POSTS_OF_A_MONTH } from "../../helpers/routes";
import "./calendar.css";

function Calendar({ setDates }) {

  const [dayInCalender, setDayInCalender] = useState(new Date().getDate());
  const [monthInCalendar, setMonthInCalendar] = useState((new Date().getMonth() + 1));
  const [yearInCalendar, setYearInCalendar] = useState((new Date().getFullYear()));
  const [noOfPosts, setNoOfPosts] = useState(new Array(getDays(monthInCalendar, yearInCalendar)).fill(0));
  const [yearIncreased, setYearIncreased] = useState(0);
  const [yearDecreased, setYearDecreased] = useState(0);
  const [startDateIsClicked, setStartDateIsClicked] = useState(false);
  const [endDateIsClicked, setEndDateIsClicked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(setDates)
  console.log(monthInCalendar, yearInCalendar, "month year huhhu");
  useEffect(() => {
    console.log("1")
    if (yearIncreased !== 0) {
      setYearInCalendar(oy => oy + 1);
    }
  }, [yearIncreased]);

  useEffect(() => {
    console.log("2")
    if (yearDecreased !== 0) {
      setYearInCalendar(oy => oy - 1);
    }
  }, [yearDecreased]);
  useEffect(() => {
    console.log("3")
    setLoading(true);
    axios.get(GET_NUMBER_OF_POSTS_OF_A_MONTH, {
      headers: getAccessAuthHeader(),
      params: { month: monthInCalendar, year: yearInCalendar }
    })
      .then(response => {
        console.log(response, "ye raha response");
        setNoOfPosts(op => {
          const newPosts = new Array(getDays(monthInCalendar, yearInCalendar)).fill(0);
          for (let day in response.data) {
            newPosts[day - 1] = response.data[day];
          }
          return newPosts;
        });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      }
      );

  }, [monthInCalendar, yearInCalendar]);

  const buttonStyles = {
    backgroundColor: "#FF4C60"
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function increaseMonth() {
    setMonthInCalendar(oldMonth => {
      const newMonth = (oldMonth % 12) + 1;
      if (newMonth === 1) setYearIncreased(yearIncreased + 1);
      return newMonth;
    });
  }

  function decrementMonth() {
    setMonthInCalendar(oldMonth => {
      let newMonth = oldMonth - 1;
      if (newMonth === 0) {
        setYearDecreased(yearDecreased - 1);
        newMonth = 12;
      }
      ;
      return newMonth;
    });
  }

  useEffect(() => {
    console.log("4")
    if (startDateIsClicked) {
      setStartDate(`${dayInCalender}-${monthInCalendar}-${yearInCalendar}`);
      setDates(od => {
        const nd = [startDate, od[1]];
        return nd;
      });
    } else if (endDateIsClicked) {
      setEndDate(`${dayInCalender}-${monthInCalendar}-${yearInCalendar}`);
      setDates(od => {
        const nd = [od[0], endDate];
        return nd;
      });
    }
  }, [monthInCalendar, dayInCalender, setDates, yearInCalendar, startDateIsClicked, endDateIsClicked, startDate, endDate]);

  useEffect(() => setStartDateIsClicked(true), []);

  return (
    loading ? <Spin className="loader" size="large" tip={"loading calendar data..."} /> : <div className="calendar-container">

      <div className="row1">
        <Button onClick={() => {
          setStartDateIsClicked(true);
          setEndDateIsClicked(false);
        }} style={{
          ...buttonStyles,
          boxShadow: startDateIsClicked ? "inset 1px 3px 4px 0px rgba(0,0,0,0.3)" : "none"
        }} type="primary" shape="round"
          icon={<FaCalendarAlt style={{ marginRight: "0.2em", borderColor: "transparent" }} />}
          size="large">
          {startDateIsClicked ? `${dayInCalender}-${monthInCalendar}-${yearInCalendar}` : startDate ? startDate : "Start Date"}
        </Button>
        <CgArrowLongRight style={{ width: "4em", height: "4em" }} />
        <Button onClick={() => {
          setEndDateIsClicked(true);
          setStartDateIsClicked(false);
        }} style={{
          ...buttonStyles,
          boxShadow: endDateIsClicked ? "inset 1px 3px 4px 0px rgba(0,0,0,0.3)" : "none"
        }} type="primary" shape="round"
          icon={<FaCalendarAlt style={{ marginRight: "0.2em", borderColor: "transparent" }} />}
          size="large">
          {endDateIsClicked ? `${dayInCalender}-${monthInCalendar}-${yearInCalendar}` : endDate ? endDate : "End Date"}
        </Button>
      </div>
      <div className="row2">
        <h3>{months[monthInCalendar - 1]}, {yearInCalendar}</h3>
        <div className="icons-container">
          <span style={{
            cursor: "pointer",
            display: "inline-flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "0.4em",
            borderRadius: "50%",
            backgroundColor: "gray",
            opacity: ".5",
            marginRight: "0.5em"
          }}><FaLessThan onClick={decrementMonth} /></span>
          <span style={{
            cursor: "pointer",
            display: "inline-flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "0.4em",
            borderRadius: "50%",
            backgroundColor: "gray",
            opacity: ".5"
          }}><FaGreaterThan onClick={increaseMonth} /></span>
        </div>
      </div>
      <div className="calendar-core">
        {_.range(1, getDays(monthInCalendar, yearInCalendar) + 1).map((n) => (
          <DateComp month={monthInCalendar} year={yearInCalendar} day={dayInCalender} setDay={setDayInCalender}
            key={uuid()} dateNum={n} postCount={noOfPosts[n - 1]} />
        ))}
        <Button
          onClick={() => {
            var date = new Date();
            date.setDate(date.getDate() - 1);
            setDayInCalender(date.getDate());
            setMonthInCalendar(date.getMonth() + 1);
            setYearInCalendar(date.getFullYear());
          }}
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
          onClick={() => {
            var date = new Date();
            setDayInCalender(date.getDate());
            setMonthInCalendar(date.getMonth() + 1);
            setYearInCalendar(date.getFullYear());
          }}
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
          onClick={() => {
            setStartDateIsClicked(false);
            setEndDateIsClicked(false);
            setStartDate(null);
            setEndDate(null);
            setDates([]);
          }}
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

    </div>

  );
}

export default Calendar;