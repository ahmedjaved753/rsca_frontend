import { Map, TileLayer, FeatureGroup, MapControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

function ROISearch() {
  const [rectCords, setRectCords] = useState({});

  const [editableFG, setEditableFG] = useState(null);

  const onCreated = e => {
    console.log(e);
    console.log(editableFG);

    const drawnItems = editableFG.leafletElement._layers;
    console.log(drawnItems);
    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;
        const layer = drawnItems[layerid];
        editableFG.leafletElement.removeLayer(layer);
      });
      console.log(drawnItems);
    }
    const data = {
      type: e.layerType,
      coordinates: e.layer.getLatLngs()
    };
    setRectCords(data);
  };

  const onFeatureGroupReady = reactFGref => {
    // store the ref for future access to content
    setEditableFG(reactFGref);
  };

  function _created(e) {
    console.log(e);
    const data = {
      type: e.layerType,
      coordinates: e.layer.getLatLngs()
    };
    setRectCords(data);

  }

  useEffect(() => {
    console.log(rectCords);
  }, [rectCords]);

  return (
    <div style={{ display: "grid", margin: "2rem", gridGap: ".5rem" }}>
      <Map
        center={[31, 74]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "80vh" }}
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
      <div style={{ textAlign: "center" }}>
        <Button type="primary" shape="round" size={"large"}>
          Search
        </Button>
      </div>
    </div>

  );
}

export default ROISearch;
