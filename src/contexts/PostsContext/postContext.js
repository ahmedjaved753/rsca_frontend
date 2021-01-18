import React, { useState, createContext } from "react";
import { cleanPostsData, cleanMarkersData } from "./utils";

export const POTHOLES = "pothole";
export const BLEEDS = "bleed";
export const CRACKS = "crack";

export const PostsContext = createContext();

export function PostsContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [zoom, setZoom] = useState(25);
  const [center, setCenter] = useState([31.57, 31.57]);
  const [markerToShow, setMarkerToShow] = useState(null);
  const [filters, setFilters] = useState([POTHOLES, CRACKS, BLEEDS]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [dates, setDates] = useState([]);
  const [showAll, setShowAll] = useState(true);

  /**
   * gets returned post data from server cleans that and updates post state with it
   * @param response- response returned from get request to server for posts
   */
  function updatePostsFromResponse(response) {
    //get required data and put it in right format
    const cleanedPosts = cleanPostsData(response);
    //update posts state and filtered state for initial start of page
    setPosts(cleanedPosts);
    setFilteredPosts(cleanedPosts);
  }

  /**
   * removes one post from filtered posts
   * @param postID - id of the post to be removed
   */
  function removePostFromFilteredPosts(postID) {
    const newFilteredPosts = filteredPosts.filter(e => e.id !== postID);
    setFilteredPosts(newFilteredPosts);
  }

  /**
   * gets a post from all posts {posts state} and adds that in the filtered post
   * @param postID- post id of the post to be copied from all posts
   */
  function importPostFromFilteredPosts(postID) {
    const indexOfPostToAdd = posts.findIndex(e => e.id === postID);
    let newPosts = [...filteredPosts, posts[indexOfPostToAdd]];
    newPosts = [...new Set(newPosts)];
    setFilteredPosts(newPosts);
  }

  /**
   * appends given posts to the previous posts in state
   * @param newPosts- posts to be appended
   */
  function appendPosts(newPosts) {
    setPosts((previousPosts) => [...previousPosts, ...newPosts]);
  }

  /**
   * appends given markers with existing ones in the state
   * @param newMarkers- new markers to be appended
   */
  function appendMarkers(newMarkers) {
    let allMarkers = [...markers, ...newMarkers];
    allMarkers = [...new Set(allMarkers)];
    setMarkers(allMarkers);
  }

  /**
   * gets markers from response returned from server and appends them to existing markers
   * @param response- response from server
   */
  function updateMarkersFromResponse(response) {
    const cleanedMarkers = cleanMarkersData(response);
    appendMarkers(cleanedMarkers);
  }

  /**
   * resets the filtered posts to empty array
   */
  function resetFilteredPosts() {
    setFilteredPosts([]);
  }

  /**
   * set filteredPosts state with all posts
   */
  function populateFilteredPostsWithAll() {
    setFilteredPosts(posts);
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        markers,
        zoom,
        setZoom,
        center,
        setCenter,
        markerToShow,
        setMarkerToShow,
        updatePostsFromResponse,
        updateMarkersFromResponse,
        appendMarkers,
        appendPosts,
        filteredMarkers,
        setFilteredMarkers,
        filters,
        setFilters,
        dates,
        setDates,
        filteredPosts,
        setFilteredPosts,
        removePostFromFilteredPosts,
        importPostFromFilteredPosts,
        showAll,
        setShowAll,
        resetFilteredPosts,
        populateFilteredPostsWithAll
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}
