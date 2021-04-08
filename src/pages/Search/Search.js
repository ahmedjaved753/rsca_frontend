import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message, Spin } from "antd";
import Calendar from "../../components/Calendar/Calendar";
import Navbar from "../../components/Navbar/Navbar";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import { Select } from "antd";
import ROISearch from "../ROISearch/ROISearch";
import "./search.css";
import { getAccessAuthHeader } from "../../helpers/localStorage";
import { GET_POSTS_BY_DATE_RANGE, GET_POSTS_BY_ROI } from "../../helpers/routes";
import axios from "axios";
import { authContext } from "../../contexts/AuthContext/AuthProvider";

function Search() {

  const [dates, setDates] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { setDates: setDatesInContext, isSearchingByDates, toggleSearchToDates, toggleSearchToROI, dates: datesInContext, updatePostsFromResponse, clearAllData, searchingCords, setSearchingCords } = useContext(PostsContext);
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
    fetchPosts(GET_POSTS_BY_DATE_RANGE, config);

  };

  function fetchPosts(url, config) {
    setLoadingPosts(true);
    //perform get request with config
    axios
      .get(url, config)
      .then((response) => {
        //if request successfully gets data them clean and update state
        console.log(response.data);
        updatePostsFromResponse(response);
        setLoadingPosts(false);
        if (response.status === 204) {
          message.info("No data found");
        } else {
          history.push("/posts");
        }

      })
      .catch((err) => {
        //if we get some error the
        //if it is error due to token invalidation
        console.log(err)
        return
        if (err.response.status === 401) {
          //refresh the token
          refreshAccessToken().then((response) => {
            //if refresh token is successful
            //send request again
            axios
              .get(url, config)
              .then(response => {
                //if data comes successfully then update posts
                updatePostsFromResponse(response);
                setLoadingPosts(false);
                if (response.status === 204) {
                  message.info("No data found");
                } else {
                  history.push("/posts");
                }
              }).catch(err => {
                //if error in second time fetch
                setLoadingPosts(false);
                message.error(err.response.statusText);
              });
          }).catch(err => {
            //if there is error with error in fetching token
            logout();
          });
        }
        // If the error is not because of token
        console.log("Error Reading data " + err);
        setLoadingPosts(false);
      });
  }

  const fetchDataByROI = () => {
    if (!searchingCords || searchingCords.length === 0) {
      message.error("Please select any area first...");
      return;
    }
    const config = {
      //access token in header for jwt auth
      headers: getAccessAuthHeader(),

      params: {
        coordinates: searchingCords[0].map(obj => obj.lat + "," + obj.lng).reduce((a, b) => a + "|" + b)
      }
    };
    setSearchingCords([]);
    fetchPosts(GET_POSTS_BY_ROI, config);
  };

  useEffect(() => {
    clearAllData();
  }, []);

  function handleClick() {
    if (isSearchingByDates()) {
      console.log(dates, "ye rhi dates");
      // eslint-disable-next-line
      if (dates[0] == undefined || dates[1] == undefined) {
        message.error("Please select the start and end dates");
        return;
      } else {
        setDatesInContext(dates);
        fetchDataByDates();
      }
    } else {
      fetchDataByROI();
    }
  }

  function handleSearchByChange(e) {
    if (e === "dates") {
      toggleSearchToDates();
    } else if (e === "roi") {
      toggleSearchToROI();
    }
  }

  console.log("search page rerendring");

  return (
    <div className="search-container">
      <Navbar />
      <main className="main-content-search">
        <div className="buttons-container">

          <Select defaultValue="dates" style={{ width: "30%", margin: "10px" }} onChange={handleSearchByChange}>
            <Select.Option value="dates">Search By Dates</Select.Option>
            <Select.Option value="roi">Search By ROI</Select.Option>
          </Select>
        </div>
        {

          isSearchingByDates() ? (
            <div className="calender-and-filters-container">
              {
                loadingPosts ? <Spin className="loader" size="large" tip={"Fetching posts..."} /> :
                  <Calendar setDates={setDates} />
              }
            </div>
          ) : (
            loadingPosts ? <Spin className="loader" size="large" tip={"Fetching posts..."} /> :
              <ROISearch />
          )
        }

        <button onClick={() => {
          if (!loadingPosts) {
            handleClick();
          }
        }} className="search-button">Search
        </button>
      </main>
    </div>
  );
}

export default Search;
