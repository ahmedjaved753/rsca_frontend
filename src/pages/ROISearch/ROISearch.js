import { Map, TileLayer, FeatureGroup, MapControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import React, { useState, useEffect, useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext/postContext"
import { Button } from "antd";

function ROISearch() {


  const [editableFG, setEditableFG] = useState(null);
  const { searchingCords, setSearchingCords, setCenter } = useContext(PostsContext)

  const onCreated = e => {
    console.log("center", e.layer.getCenter().lat)
    setCenter([e.layer.getCenter().lat, e.layer.getCenter().lng])
    const drawnItems = editableFG.leafletElement._layers;
    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;
        const layer = drawnItems[layerid];
        editableFG.leafletElement.removeLayer(layer);
      });
    }
    setSearchingCords(e.layer.getLatLngs());
  };

  const onEdited = e => {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
      //do whatever you want; most likely save back to db
      setCenter([layer.getCenter().lat, layer.getCenter().lng])
      setSearchingCords(layer.getLatLngs())
    });
  }

  const onDeleted = e => {
    setSearchingCords([])
  }
  useEffect(() => {
    console.log("searching coords", searchingCords)
  }, [searchingCords])
  const onFeatureGroupReady = reactFGref => {
    // store the ref for future access to content
    setEditableFG(reactFGref);
  };


  return (
    <div style={{ paddingRight: ".8rem", width: "100vw" }}>
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
            onEdited={onEdited}
            onDeleted={onDeleted}
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
