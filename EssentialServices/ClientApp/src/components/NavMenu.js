import React, { Component } from "react";
import {
  Dropdown,
  ActionButton,
  mergeStyleSets,
  FontClassNames,
} from "@fluentui/react";
import logo from "./logo.svg";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "./NavMenu.css";

const languages = [
  { key: "ar", text: "Arabic" },
  { key: "en", text: "English", selected: true },
  { key: "fr", text: "French" },
];

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <div className={`${styles.root} border-bottom box-shadow`}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.title}>Essentials</div>
          <ActionButton href="/add">Add place</ActionButton>
          <div className={styles.divider}></div>
          <Dropdown options={languages} />
          <ActionButton
            iconProps={{ iconName: "MapPin" }}
            text="Set location"
          />
          <LoginMenu />
        </div>
      </header>
    );
  }
}

const styles = mergeStyleSets({
  root: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: [FontClassNames.xLarge],
  divider: {
    flex: "1 1 auto",
  },
});
