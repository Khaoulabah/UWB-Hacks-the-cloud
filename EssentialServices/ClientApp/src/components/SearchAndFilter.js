import React from "react";
import { Dropdown, mergeStyleSets, SearchBox } from "@fluentui/react";

const PlaceTypes = [
  { key: "all", text: "All", selected: true },
  { key: "grocery", text: "Grocery store" },
  { key: "pharmacy", text: "Pharmacy" },
  { key: "doctor", text: "Doctor's Office" },
  { key: "restaurant", text: "Restaurant" },
];

export default function SearchAndFilter() {
  return (
    <div className={styles.root}>
      <SearchBox placeholder="Search"></SearchBox>
      <Dropdown options={PlaceTypes} className={styles.dropdown}></Dropdown>
    </div>
  );
}

const styles = mergeStyleSets({
  root: {
    display: "flex",
    alignItems: "center",
    height: 50,
    padding: 8,
  },
  dropdown: {
    marginLeft: 8,
    width: 150,
  },
});
