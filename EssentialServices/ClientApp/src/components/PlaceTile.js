import React from "react";
import {
  Image,
  mergeStyleSets,
  ImageFit,
  getTheme,
  FontClassNames,
  css,
} from "@fluentui/react";

export function PlaceTile(props) {
  return (
    <div
      className={css(styles.root, props.isSelected && "selected")}
      data-is-focusable={true}
      onClick={props.onClick}
    >
      <div className={styles.container}>
        <Image
          src={props.place.image}
          className={styles.image}
          imageFit={ImageFit.cover}
        />
        <div>
          <div className={FontClassNames.xLarge}>{props.place.name}</div>
          <div className={FontClassNames.medium}>
            {props.place.address || props.place.coordinates}
          </div>
          <div className={FontClassNames.medium}>{props.place.phoneNumber}</div>
        </div>
      </div>
      {/* <div>Hours: {props.place.hours}</div> */}
    </div>
  );
}

const theme = getTheme();
const styles = mergeStyleSets({
  root: {
    padding: 8,
    borderBottom: `1px solid ${theme.palette.neutralTertiaryAlt}`,
    cursor: "pointer",
    selectors: {
      ":hover": {
        backgroundColor: theme.palette.neutralLighter,
      },
      ":active": {
        backgroundColor: theme.palette.neutralLight,
      },
      "&.selected": {
        backgroundColor: theme.palette.neutralLight,
      },
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    marginRight: 8,
    width: 70,
    height: 70,
    border: `2px solid ${theme.palette.neutralLight}`,
    borderRadius: 8,
  },
});
