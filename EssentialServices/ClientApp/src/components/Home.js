import React, { useState, useEffect, useCallback } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import SearchAndFilter from "./SearchAndFilter";
import { mergeStyleSets, getTheme } from "@fluentui/react";
import { PlaceTile } from "./PlaceTile";
import { GoogleApiConfig } from "../constants";

function Home(props) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/place");
      const newPlaces = await response.json();
      setPlaces(newPlaces);
    }

    fetchData();
  }, []);

  const initialCenter = selectedPlace
    ? selectedPlace.coordinates
    : { lat: 47.67921, lng: -122.15585 };

  const isSelected = useCallback(
    (place) => selectedPlace && place.id === selectedPlace.id,
    [selectedPlace]
  );
  return (
    <div className={styles.root}>
      <SearchAndFilter
        onFilterChanged={async (type) => {
          let url = "";
          if (type === "all") url = "api/place";
          else url = "api/place/" + type;
          const response = await fetch(url);
          const newPlaces = await response.json();
          setPlaces(newPlaces);
        }}
      />
      <div className={styles.mainContent}>
        <div className={styles.list}>
          {places.map((place) => (
            <PlaceTile
              place={place}
              isSelected={isSelected(place)}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
        </div>
        <div className={styles.mapContainer}>
          <Map google={props.google} initialCenter={initialCenter}>
            {places.map((place) => (
              <Marker
                position={place.coordinates}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
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
