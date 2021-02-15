import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import Calendar from "../../components/Calendar/Calendar";
import Menu from "../../components/Menu/Menu";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import {Select } from "antd";
import ROISearch from "../ROISearch/ROISearch";
import "./search.css";
import { getAccessAuthHeader } from "../../helpers/localStorage";
import { GET_POSTS_BY_DATE_RANGE } from "../../helpers/routes";
import axios from "axios";
import { authContext } from "../../contexts/AuthContext/AuthProvider";

const Option={Select}
function Search() {
  const [dates, setDates] = useState([]);
  const { setDates: setDatesInContext, isSearchingByDates, toggleSearchToDates, toggleSearchToROI,dates:datesInContext,updatePostsFromResponse,clearAllData } = useContext(PostsContext);
  const history = useHistory();

  //auth stuff imported from auth context
  const {
    refreshAccessToken //function to refresh access token if it expires {returns promise}
    , logout // function to logout if something happens in auth process
  } = useContext(authContext);

  const fetchDataByDates = () => {
    //configuration for get request
    const config = {
      //access token in header for jwt auth
      headers: getAccessAuthHeader(),
      //start date and end date as url get patterns
      params: {
        start_date: dates[0],
        end_date: dates[1]
      }
    };
    //url for getting posts from urls file
    const url = GET_POSTS_BY_DATE_RANGE;
    //perform get request with config
    axios
      .get(url, config)
      .then((response) => {
        //if request successfully gets data them clean and update state
        console.log(response.data);
        updatePostsFromResponse(response);
        history.push("/posts")
      })
      .catch((err) => {
        //if we get some error the
        //if it is error due to token invalidation
        if (err.response.status === 401) {
          //refresh the token
          refreshAccessToken().then((response) => {
            //if refresh token is successful
            //perform request again
            const config = {
              headers: getAccessAuthHeader(),

              params: {
                start_date: dates[0],
                end_date: dates[1]
              }
            };
            //send request again
            axios
              .get(url, config)
              .then(response => {
                //if data comes successfully then update posts
                updatePostsFromResponse(response);
                history.push("/posts")
              }).catch(err => {
              //if error in second time fetch
              message.error(err.response.statusText);
            });
          }).catch(err => {
            //if there is error with error in fetching token
            logout();
          });
        }
        // If the error is not because of token
        console.log("Error Reading data " + err);
      });
  };

  useEffect(()=>{
    clearAllData();
  },[])

  function handleClick() {
    console.log(dates, "ye rhi dates");
    // eslint-disable-next-line
    if (dates[0] == undefined || dates[1] == undefined) {
      message.error("Please select the start and end dates");
      return;
    } else {
      setDatesInContext(dates);
      fetchDataByDates();
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
