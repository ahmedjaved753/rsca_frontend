import React, { useEffect, useContext } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import "./postMapPage.css";
//for list
import L from "leaflet";
import ClassFiltersList from "../../components/classFiltersList/ClassFiltersList";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import { getRandomColorOptions } from "../../contexts/PostsContext/utils";
import PostList from "../../components/postList/PostList";
import { getAccessAuthHeader } from "../../helpers/localStorage";
import { GET_POSTS_BY_DATE_RANGE, BASE } from "../../routes";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { authContext } from "../../contexts/AuthContext/AuthProvider";
import { message } from "antd";
import Menu from "../../components/Menu/Menu";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function PostMapPage() {
  const { filteredPosts, center, markerToShow, updatePostsFromResponse,dates } = useContext(
    PostsContext
  );
  const { refreshAccessToken, logout } = useContext(authContext);

  useEffect(() => {
    const fetchData = () => {
      const config = {
        headers: getAccessAuthHeader(),

        params: {
          start_date: dates[0],
          end_date: dates[1],
        }
      };
      const url = GET_POSTS_BY_DATE_RANGE;
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data);
          updatePostsFromResponse(response);
        })
        .catch((err) => {
          //if it is error due to token invalidation
          if (err.response.status === 401) {
            //refresh the token
            refreshAccessToken().then((response) => {
              //if refresh token is successful
              const config = {
                headers: getAccessAuthHeader(),

                params: {
                  start_date: dates[0],
                  end_date: dates[1],
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

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

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
