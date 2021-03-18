//react stuff
import React, { useEffect, useContext } from "react";
import "leaflet/dist/leaflet.css";
//for showing maps
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet-3";
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
//urls on which requests will be sent
import { GET_POSTS_BY_DATE_RANGE, BASE } from "../../helpers/routes";
//marker icons for map
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
//auth context for whole application
import { authContext } from "../../contexts/AuthContext/AuthProvider";
//side menu for page
import Navbar from '../../components/Navbar/Navbar'
//-----setting marker icon settings and stuff------
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

//-------------------------------------------------

function PostMapPage() {
  //stuff imported from page context that will be used here
  const {
    filteredPosts//these posts will be rendered on map
    , center//center for the whole map
    , markerToShow//the only marker that will be shown at a time
    , setCenter,
    posts,
    setSelectedPostID
  } = useContext(
    PostsContext
  );




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
            alt=""
          />
        </Popup>
      </Marker>
    );
  }

  useEffect(() => {
    posts?.map(p => setCenter(p.completePath[0]))
  }, [posts]);

  function handleVectorClick(postid) {
    setSelectedPostID(postid)
  }

  return (
    <div className="posts-container">
      <Navbar />
      <div className="map-container-mine">
        <MapContainer
          center={center}
          zoom={25}
          scrollWheelZoom={true}
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
              eventHandlers={{
                click: () => {
                  handleVectorClick(post.id);
                }
              }}
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
