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

  function updatePostsFromResponse(response) {
    const cleanedPosts = cleanPostsData(response);
    setPosts(cleanedPosts);
    setFilteredPosts(cleanedPosts);
  }

  function removePostFromFilteredPosts(postID) {
    console.log("removing post with", postID);
    const newFilteredPosts = filteredPosts.filter(e => e.id !== postID);
    setFilteredPosts(newFilteredPosts);
    console.log(newFilteredPosts);
  }

  function importPostFromFilteredPosts(postID) {
    console.log("importing post with", postID);
    const indexOfPostToAdd = posts.findIndex(e => e.id === postID);
    let newPosts = [...filteredPosts, posts[indexOfPostToAdd]];
    newPosts = [...new Set(newPosts)];
    setFilteredPosts(newPosts);
    console.log(newPosts);
  }

  function appendPosts(newPosts) {
    setPosts((previousPosts) => [...previousPosts, ...newPosts]);
  }

  function appendMarkers(newMarkers) {
    let allMarkers = [...markers, ...newMarkers];
    allMarkers = [...new Set(allMarkers)];
    setMarkers(allMarkers);
  }

  function updateMarkersFromResponse(response) {
    const cleanedMarkers = cleanMarkersData(response);
    appendMarkers(cleanedMarkers);
  }

  function resetFilteredPosts(){
    setFilteredPosts([])
  }

  function populateFilteredPostsWithAll(){
    setFilteredPosts(posts)
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
