import React, { Component } from "react";
import Home from "../components/home/";
import Confirmation from "../components/Confirmation";
import Account from "../components/Account";
import Transaction from "../components/Transaction";
import { DrawerNavigator } from "react-navigation";
import DrawBar from "../components/DrawBar";
export default (DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    Confirmation: { screen: Confirmation },
    Account: {screen: Account },
    Transaction : {screen: Transaction }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
));
