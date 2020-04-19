import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Dropdown,
  ActionButton,
  mergeStyleSets,
  FontClassNames,
} from "@fluentui/react";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "./NavMenu.css";
import authService from "./api-authorization/AuthorizeService";

const logo =
  "https://camo.githubusercontent.com/7bb69dedc6732ff2477f11fd2f4f5e2e83ac0ad4/68747470733a2f2f696d6167652e666c617469636f6e2e636f6d2f69636f6e732f7376672f3636322f3636323332352e737667";
const languages = [
  { key: "ar", text: "Arabic" },
  { key: "en", text: "English", selected: true },
  { key: "fr", text: "French" },
];

export function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateState = useCallback(
    async () => setIsLoggedIn(await authService.isAuthenticated()),
    []
  );
  useEffect(() => {
    const sub = authService.subscribe(updateState);
    updateState();
    return () => authService.unsubscribe(sub);
  });

  return (
    <header>
      <div className={`${styles.root} border-bottom box-shadow`}>
        <img src={logo} alt="logo" className={styles.logo} />
        <ActionButton href="/" className={styles.title}>
          Essentials
        </ActionButton>
        <div className={styles.divider}></div>
        {isLoggedIn && <ActionButton href="/myplaces">My Places</ActionButton>}
        <Dropdown options={languages} />
        <ActionButton iconProps={{ iconName: "MapPin" }} text="Set location" />
        <LoginMenu />
      </div>
    </header>
  );
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
    marginRight: 8,
  },
  title: [FontClassNames.xLarge],
  divider: {
    flex: "1 1 auto",
  },
});
