import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import SearchAndFilter from "./SearchAndFilter";
import { mergeStyleSets, getTheme } from "@fluentui/react";
import { PlaceTile } from "./PlaceTile";
import { GoogleApiConfig } from "../constants";

function Home(props) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("api/place");
      const newPlaces = await response.json();
      setPlaces(newPlaces);
    }

    getData();
  }, []);

  return (
    <div className={styles.root}>
      <SearchAndFilter />
      <div className={styles.mainContent}>
        <div className={styles.list}>
          {places.map((place) => (
            <PlaceTile
              place={place}
              isSelected={selectedPlace && place.id === selectedPlace.id}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
        </div>
        <div className={styles.mapContainer}>
          <Map
            google={props.google}
            initialCenter={{ lat: 47.67921, lng: -122.15585 }}
          >
            <Marker position={{ lat: 47.67921, lng: -122.15585 }} />
          </Map>
        </div>
      </div>
    </div>
  );
}

const styles = mergeStyleSets({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
  },
  mainContent: {
    flex: "1 1 auto",
    display: "flex",
    borderTop: `1px solid ${getTheme().palette.neutralTertiaryAlt}`,
    overflow: "hidden",
  },
  list: {
    width: 500,
    height: "100%",
    overflowX: "auto",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});

export default GoogleApiWrapper(GoogleApiConfig)(Home);
