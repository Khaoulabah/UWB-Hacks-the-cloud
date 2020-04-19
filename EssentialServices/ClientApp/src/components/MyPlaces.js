import React, { useState, useEffect, useCallback } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import SearchAndFilter from "./SearchAndFilter";
import {
  mergeStyleSets,
  getTheme,
  ActionButton,
  IconButton,
  Stack,
  Panel,
  PanelType,
} from "@fluentui/react";
import { PlaceTile } from "./PlaceTile";
import { GoogleApiConfig } from "../constants";
import authService from "./api-authorization/AuthorizeService";
import { PlaceForm } from "./PlaceForm";

export default function MyPlaces() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isPanelShown, setIsPanelShown] = useState(false);

  async function fetchData() {
    const user = await authService.getUser();
    const response = await fetch("api/myplace/" + user.sid);
    const newPlaces = await response.json();
    setPlaces(newPlaces);
  }

  useEffect(fetchData, []);

  const isSelected = useCallback(
    (place) => selectedPlace && place.id === selectedPlace.id,
    [selectedPlace]
  );
  return (
    <div className={styles.root}>
      <ActionButton
        iconProps={{ iconName: "Add" }}
        onClick={() => {
          setSelectedPlace(null);
          setIsPanelShown(true);
        }}
      >
        Add place
      </ActionButton>
      <Panel
        isOpen={isPanelShown}
        onDismiss={() => setIsPanelShown(false)}
        type={PanelType.medium}
      >
        <PlaceForm
          place={selectedPlace}
          onSubmit={() => {
            setIsPanelShown(false);
            fetchData();
          }}
        />
      </Panel>
      <div className={styles.mainContent}>
        <div className={styles.list}>
          {places.map((place) => (
            <div className={styles.listItem}>
              <PlaceTile
                place={place}
                isSelected={isSelected(place)}
                onClick={() => setSelectedPlace(place)}
              />
              <Stack verticalAlign={"space-evenly"}>
                <ActionButton
                  iconProps={{ iconName: "Delete" }}
                  text="Delete"
                  onClick={async () => {
                    await fetch("api/myplace/" + place.id, {
                      method: "DELETE",
                    });
                    fetchData();
                  }}
                />
                <ActionButton
                  iconProps={{ iconName: "Edit" }}
                  text="Edit"
                  onClick={async () => {
                    setSelectedPlace(place);
                    setIsPanelShown(true);
                  }}
                />
              </Stack>
            </div>
          ))}
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
    justifyContent: "center",
    borderTop: `1px solid ${getTheme().palette.neutralTertiaryAlt}`,
    overflow: "hidden",
  },
  list: {
    width: 500,
    height: "100%",
    minWidth: 500,
    width: "80%",
    overflowX: "auto",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
  },
});
