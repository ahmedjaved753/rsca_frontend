import React, { useEffect, useContext } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "./postMapPage.css";
//for list
import L from "leaflet";
import ClassFiltersList from "../../components/classFiltersList/ClassFiltersList";
import { PostsContext } from "../../contexts/PostsContext/postContext";
import { getRandomColorOptions } from "../../contexts/PostsContext/utils";
import PostList from "../../components/postList/PostList";
import { getAccessAuthHeader } from '../../helpers/localStorage'
import {GET_POSTS_BY_DATE_RANGE,BASE} from "../../routes";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function PostMapPage() {
  const { posts, center, markerToShow, updatePostsFromResponse } = useContext(
    PostsContext
  );

  useEffect(() => {
    const fetchData = () => {
      const config = {
        headers:getAccessAuthHeader(),

        params: {
          start_date: "12-12-2020",
          end_date: "15-01-2021",
        },
      };
      const url = GET_POSTS_BY_DATE_RANGE;
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data);
          updatePostsFromResponse(response);
        })
        .catch((err) => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    };
    fetchData();
  }, []);

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
            src={BASE+props.marker.imagePath.substring(1)}
            width={200}
            height={200}
          />
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="container">
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
        {posts.map((post) => (
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
      <div className="side-lists">
        <PostList />
        <ClassFiltersList />
      </div>
    </div>
  );
}

export default PostMapPage;
