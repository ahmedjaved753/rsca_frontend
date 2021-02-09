import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import Calendar from "../../components/Calendar/Calendar";
import Menu from "../../components/Menu/Menu";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import {Select } from "antd";
import ROISearch from "../ROISearch/ROISearch";
import "./search.css";

const Option={Select}
function Search() {
  const [dates, setDates] = useState([]);
  const { setDates: setDatesInContext, isSearchingByDates, toggleSearchToDates, toggleSearchToROI } = useContext(PostsContext);
  const history = useHistory();

  function handleClick() {
    console.log(dates, "ye rhi dates");
    // eslint-disable-next-line
    if (dates[0] == undefined || dates[1] == undefined) {
      message.error("Please select the start and end dates");
      return;
    } else {
      setDatesInContext(dates);
      history.push("/posts");
    }
  }

  function handleSearchByChange(e) {
    if(e==="dates"){
      toggleSearchToDates()
    }else if(e==="roi"){
      toggleSearchToROI()
    }
  }

  return (
    <div className="search-container">
      <Menu />
      <main className="main-content">
        <div className="buttons-container">

          <Select defaultValue="dates" style={{ width: "30%", margin:"10px" }} onChange={handleSearchByChange}>
            <Option value="dates">Search By Dates</Option>
            <Option value="roi">Search By ROI</Option>
          </Select>
        </div>
        {
          isSearchingByDates() ? (
            <div className="calender-and-filters-container">
              <Calendar setDates={setDates} />
            </div>
          ) : (<ROISearch />)
        }

        <button onClick={handleClick} className="search-button">Search</button>
      </main>
    </div>
  );
}

export default Search;
