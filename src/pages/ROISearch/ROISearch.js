import { Map, TileLayer, FeatureGroup, MapControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import React, { useState, useEffect, useContext } from "react";
import {PostsContext} from "../../contexts/PostsContext/postContext"
import { Button } from "antd";

function ROISearch() {


  const [editableFG, setEditableFG] = useState(null);
  const {searchingCords,setSearchingCords}=useContext(PostsContext)

  const onCreated = e => {

    console.log(e)
    const drawnItems = editableFG.leafletElement._layers;
    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;
        const layer = drawnItems[layerid];
        editableFG.leafletElement.removeLayer(layer);
      });
    }
    const data = {
      type: e.layerType,
      coordinates: e.layer.getLatLngs()
    };
    setSearchingCords(data);
  };

  const onFeatureGroupReady = reactFGref => {
    // store the ref for future access to content
    setEditableFG(reactFGref);
  };

  useEffect(() => {
    console.log(searchingCords);
  }, [searchingCords]);

  return (
    <div style={{paddingRight:".8rem"}}>
      <Map
        center={[31.57081041, 74.30725466]}
        zoom={35}
        scrollWheelZoom={true}
        style={{ height: "100%" }}
      >
        <FeatureGroup
          ref={featureGroupRef => {
            onFeatureGroupReady(featureGroupRef);
          }}>
          <EditControl position={"topright"}
                       onCreated={onCreated}
                       draw={{
                         circle: false,
                         line: false,
                         //polygon: false,
                         marker: false,
                         polyline: false,
                         circlemarker: false
                       }} />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>

    </div>

  );
}

export default ROISearch;
