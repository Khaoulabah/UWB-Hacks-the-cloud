import React, { Component } from "react";
// import { Container } from 'reactstrap';
import { NavMenu } from "./NavMenu";
import { mergeStyleSets } from "@fluentui/react";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className={styles.root}>
        <NavMenu />
        {this.props.children}
      </div>
    );
  }
}

const styles = mergeStyleSets({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    selectors: {
      "&> div": {
        display: "flex",
        flex: "1 1 auto",
        overflow: "hidden",
      },
    },
  },
});
