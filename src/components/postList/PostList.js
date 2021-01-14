import React, { useContext, useEffect } from "react";
import PostListItem from "./PostListItem";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import axios from "axios";
import { getAccessAuthHeader } from '../../helpers/localStorage'
import {GET_POST_MARKERS_BY_POST_ID} from '../../routes'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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
  } = useContext(PostsContext);
  function handleMarkerClick(markerID) {
    console.log(markerID);
    const marker = filteredMarkers.find((marker) => marker.id === markerID);
    console.log(marker);
    setMarkerToShow(marker);
    setCenter([marker.lat, marker.lon]);
  }
  useEffect(() => {
    var fil = markers.filter((marker) => {
      for (var i = 0; i < marker.classes.length; i++) {
        if (filters.includes(marker.classes[i])) {
          return true;
        }
      }
      return false;
    });
    setFilteredMarkers(fil);
  }, [markers, filters,setFilteredMarkers]);
  function handlePostsClick(postIDs) {
    if (postIDs.length === 0) return;
    if (markers.find((marker) => marker.postID === postIDs)) {
      return;
    }
    const postClicked = posts.find((post) => post.id === postIDs);
    setCenter(postClicked.completePath[0]);
    const idsString = postIDs.toString();
    const config = {
      headers: getAccessAuthHeader(),

      params: {
        post_id: idsString,
      },
    };
    const url = GET_POST_MARKERS_BY_POST_ID;
    axios
      .get(url, config)
      .then((response) => {
        updateMarkersFromResponse(response);
      })
      .catch((err) => {});
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Posts
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
          />
        );
      })}
    </List>
  );
}
