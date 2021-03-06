import React, { useContext, useEffect } from "react";
import PostListItem from "./PostListItem";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import axios from "axios";
import { getAccessAuthHeader } from "../../helpers/localStorage";
import { GET_POST_MARKERS_BY_POST_ID } from "../../helpers/routes";
import { message } from "antd";
import { authContext } from "../../contexts/AuthContext/AuthProvider";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function PostList(props) {
  const classes = useStyles();
  const {
    filteredMarkers,
    setFilteredMarkers,
    setMarkerToShow,
    markers,
    setCenter,
    posts,
    updateMarkersFromResponse,
    filters,
    showAll,
    setShowAll,
    resetFilteredPosts,
    populateFilteredPostsWithAll,
    selectedPostID,
    setSelectedPostID
  } = useContext(PostsContext);
  const { refreshAccessToken, logout } = useContext(authContext);

  function handleMarkerClick(markerID) {
    console.log(markerID);
    const marker = filteredMarkers.find((marker) => marker.id === markerID);
    console.log(marker);
    setMarkerToShow(marker);
    setCenter([marker.lat, marker.lon]);
  }

  useEffect(() => {
    const fil = markers.filter((marker) => {
      for (let i = 0; i < marker.classes.length; i++) {
        if (filters.includes(marker.classes[i])) {
          return true;
        }
      }
      return false;
    });
    setFilteredMarkers(fil);
  }, [markers, filters, setFilteredMarkers]);

  useEffect(() => {
    if (showAll) {
      populateFilteredPostsWithAll();
    } else {
      resetFilteredPosts();
    }
  }, [showAll]);

  function handlePostsClick(postIDs) {
    setSelectedPostID(postIDs)
    const postClicked = posts.find((post) => post.id === postIDs);
    setCenter(postClicked.completePath[0]);
    if (postIDs.length === 0) return;
    if (markers.find((marker) => marker.postID === postIDs)) {
      return;
    }

    const idsString = postIDs.toString();
    const config = {
      headers: getAccessAuthHeader(),

      params: {
        post_id: idsString
      }
    };
    const url = GET_POST_MARKERS_BY_POST_ID;
    axios
      .get(url, config)
      .then((response) => {
        updateMarkersFromResponse(response);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          //refresh the token
          refreshAccessToken().then((response) => {
            //if refresh token is successful
            const config = {
              headers: getAccessAuthHeader(),

              params: {
                post_id: idsString
              }
            };
            //send request again
            axios
              .get(url, config)
              .then(response => {
                //if data comes successfully then update posts
                updateMarkersFromResponse(response);
              }).catch(err => {
                //if error in second time fetch
                message.error(err.response.statusText);
              });
          }).catch(err => {
            //if there is error with error in fetching token
            logout();
          });
        }
        console.log("Error Reading data " + err);
      });
  }


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <div>
            <p>Posts</p>
            <div style={{
              display: "flex",
              textAlign: "center"
            }}>
              <Checkbox checked={showAll} value={"Show All"} onChange={() => setShowAll(!showAll)} />
              <p>Show all</p>
            </div>
            <hr />
          </div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {posts.map((post, index) => {
        var markersOfThisPost = filteredMarkers.filter(
          (marker) => marker.postID === post.id
        );
        return (
          <PostListItem
            postTitle={post.title}
            postID={post.id}
            markers={markersOfThisPost}
            onMarkerClick={handleMarkerClick}
            onPostItemClick={handlePostsClick}
            innerKey={post.key}
            key={index}
            selected={post.id===selectedPostID}
          />
        );
      })}
    </List>
  );
}
