//react stuff
import React, { useEffect, useContext, useState } from "react";
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
import {
  PostsContext, POTHOLES,
  CRACKS,
  BLEEDS
} from "../../contexts/PostsContext/postContext";
//to get random options for post path vector
import { getRandomColorOptions } from "../../helpers/postsHandlingUtils";
//side list component for showing post lists
import PostList from "../../components/postList/PostList";
//urls on which requests will be sent
import { GET_POSTS_BY_DATE_RANGE, BASE, GET_POST_MARKERS_BY_POST_IDS } from "../../helpers/routes";
//marker icons for map
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
//auth context for whole application
import { authContext } from "../../contexts/AuthContext/AuthProvider";
//side menu for page
import Navbar from "../../components/Navbar/Navbar";
import { storages, BACKEND_STATIC_STORAGE } from "../../settings";
import { Button, Modal } from "antd";
import axios from "axios";
import { getAccessAuthHeader } from "../../helpers/localStorage";
import {
  PDFDownloadLink
} from "@react-pdf/renderer";

import ReportPDF from "../../components/ReportPDF/ReportPDF";
//-----setting marker icon settings and stuff------
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41]
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
    setSelectedPostID,
    filters
  } = useContext(
    PostsContext
  );

  const [generatingReps, setGeneratingReps] = useState(false);

  function ReportModel(reportData) {
    setGeneratingReps(false);


    Modal.success({
      title: "Report Has been successfully generated",
      content: (
        <PDFDownloadLink
          document={<ReportPDF reportData={reportData} />}
          fileName={"report" + new Date().getTime() + ".pdf"}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading . . ." : "Download"
          }
        </PDFDownloadLink>
      ),
      onOk() {
      }
    });
  }

  function getAndGenReportData() {
    setGeneratingReps(true);
    const idsAndTitles = filteredPosts.map(e => [e.id, e.title]);
    const ids = idsAndTitles.map(e => e[0]);
    axios.get(GET_POST_MARKERS_BY_POST_IDS(ids), {
      headers: getAccessAuthHeader()
    }).then(res => {
      let allMarkers = res.data;
      let fil = allMarkers.filter(e => {
        let classes = e.marker_classes.split("and").map(e => e.trim());
        for (let i = 0; i < classes.length; i++) {
          if (filters.includes(classes[i])) return true;
        }
        return false;

      });

      //this is report data
      let _reportData = [];
      idsAndTitles.forEach(idAndTitle => {
        const markersOfCurrentPost = fil.filter(e => e.post == idAndTitle[0]);
        console.log(markersOfCurrentPost);
        const totalMarkers = markersOfCurrentPost.length;
        const onlyPotholes = markersOfCurrentPost.filter(m => m.marker_classes.trim().toLowerCase() === POTHOLES).length;
        const onlyCracks = markersOfCurrentPost.filter(m => m.marker_classes.trim().toLowerCase() === CRACKS).length;
        const onlyBleeds = markersOfCurrentPost.filter(m => m.marker_classes.trim() === BLEEDS).length;
        const potholesAndCracks = markersOfCurrentPost.filter(m => m.marker_classes.replace(/\s/g, "").toLowerCase() === POTHOLES + "and" + CRACKS).length;
        const potholesAndBleeds = markersOfCurrentPost.filter(m => m.marker_classes.trim().replace(/\s/g, "").toLowerCase() === POTHOLES + "and" + BLEEDS).length;
        const cracksAndBleeds = markersOfCurrentPost.filter(m => m.marker_classes.trim().replace(/\s/g, "").toLowerCase() === CRACKS + "and" + BLEEDS).length;
        _reportData.push({
          postTitle: idAndTitle[1],
          totalMarkers: totalMarkers,
          onlyPotholes: onlyPotholes,
          onlyCracks: onlyCracks,
          onlyBleeds: onlyBleeds,
          potholesAndCracks: potholesAndCracks,
          potholesAndBleeds: potholesAndBleeds,
          cracksAndBleeds: cracksAndBleeds
        });

      });
      console.log("reppppp", _reportData);

      ReportModel(_reportData);

    });
  }


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
          {
            BACKEND_STATIC_STORAGE == storages.LOCAL_FS ? (
              <img
                src={BASE + props.marker.imagePath.substring(1)}
                width={200}
                height={200}
                alt=""
              />
            ) : (
              <img
                src={props.marker.imagePath}
                width={200}
                height={200}
                alt=""
              />
            )
          }

        </Popup>
      </Marker>
    );
  }

  useEffect(() => {
    posts?.map(p => setCenter(p.completePath[0]));
  }, [posts]);

  function handleVectorClick(postid) {
    setSelectedPostID(postid);
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

        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={getAndGenReportData} loading={generatingReps}>
            {
              generatingReps ? "loading" : "Get Report"
            } </Button>
        </div>


        <ClassFiltersList />
        <PostList />
      </div>
    </div>
  );
}

export default PostMapPage;
