import React, { useState, createContext } from "react";
import { cleanPostsData, cleanMarkersData } from "./utils";

export const POTHOLES = "pothole";
export const BLEEDS = "bleed";
export const CRACKS = "crack";

export const PostsContext = createContext();

export function PostsContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [zoom, setZoom] = useState(25);
  const [center, setCenter] = useState([31.57, 31.57]);
  const [markerToShow, setMarkerToShow] = useState(null);
  const [filters, setFilters] = useState([POTHOLES, CRACKS, BLEEDS]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [dates,setDates]=useState([])

  function updatePostsFromResponse(response) {
    setPosts(cleanPostsData(response));
  }

  function appendPosts(newPosts) {
    setPosts((previousPosts) => [...previousPosts, ...newPosts]);
  }
  function appendMarkers(newMarkers) {
    setMarkers((previousMarkers) => [...previousMarkers, ...newMarkers]);
  }

  function updateMarkersFromResponse(response) {
    const cleanedMarkers = cleanMarkersData(response);
    setMarkers(cleanedMarkers);
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        markers,
        setPosts,
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
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}
