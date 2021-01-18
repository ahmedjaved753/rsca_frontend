//react stuff
import React, { useEffect, useContext } from "react";
//to send requests to server
import axios from "axios";
//must be included for maps
import "leaflet/dist/leaflet.css";
//for showing maps
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
//pages own css
import "./postMapPage.css";
//for showing marker currently
import L from "leaflet";
//class filters side component
import ClassFiltersList from "../../components/classFiltersList/ClassFiltersList";
//context for the whole page
import { PostsContext } from "../../contexts/PostsContext/postContext";
//to get random options for post path vector
import { getRandomColorOptions } from "../../helpers/postsHandlingUtils";
//side list component for showing post lists
import PostList from "../../components/postList/PostList";
//sending request needs access token stored
import { getAccessAuthHeader } from "../../helpers/localStorage";
//urls on which requests will be sent
import { GET_POSTS_BY_DATE_RANGE, BASE } from "../../helpers/routes";
//marker icons for map
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
//auth context for whole application
import { authContext } from "../../contexts/AuthContext/AuthProvider";
//to show success or error messages
import { message } from "antd";
//side menu for page
import Menu from "../../components/Menu/Menu";

//-----setting marker icon settings and stuff------
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

//-------------------------------------------------

function PostMapPage() {
  //stuff imported from page context that will be used here
  const {
    filteredPosts//these posts will be rendered on map
    , center//center for the whole map
    , markerToShow//the only marker that will be shown at a time
    , updatePostsFromResponse// function that will parse posts data and update posts state
    , dates // dates for which posts will be fetched from server.
  } = useContext(
    PostsContext
  );

  //auth stuff imported from auth context
  const {
    refreshAccessToken //function to refresh access token if it expires {returns promise}
    , logout // function to logout if something happens in auth process
  } = useContext(authContext);

  //will be called once the page is loaded with empty data and everytime dependencies changes
  useEffect(() => {
    const fetchData = () => {
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
    fetchData();
  }, [dates]);

  /**
   * invisible component inside map to move maps visible area
   * @param center- new center for map
   * @param zoom- new zoom level for map
   */
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  /**
   * Marker component to be rendered on map
   * @param props- contains marker object
   * @returns {JSX.Element}
   */
  function CustomMarker(props) {
    return (
      <Marker
        position={[props.marker.lat, props.marker.lon]}
        key={props.marker.id}
      >
        <Popup>
          <img
            src={BASE + props.marker.imagePath.substring(1)}
            width={200}
            height={200}
          />
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="posts-container">
      <Menu />
      <div className="map-container-mine">
        <MapContainer
          center={center}
          zoom={25}
          scrollWheelZoom={false}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={center} zoom={25} scrollWheelZoom={false} />
          {filteredPosts.map((post) => (
            <Polyline
              pathOptions={getRandomColorOptions()}
              positions={post.completePath}
              key={post.id}
            />
          ))}
          {markerToShow !== null ? (
            <CustomMarker marker={markerToShow} center={center} zoom={25} />
          ) : null}
        </MapContainer>
      </div>
      <div className="side-lists">
        <ClassFiltersList />
        <PostList />
      </div>
    </div>
  );
}

export default PostMapPage;
