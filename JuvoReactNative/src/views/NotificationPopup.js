import React, { Component } from "react";
import { View, Text, NativeModules, NativeEventEmitter } from "react-native";

import HideableView from "./HideableView";

export default class NotificationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.JuvoPlayer = NativeModules.JuvoPlayer;
    this.JuvoEventEmitter = new NativeEventEmitter(this.JuvoPlayer);
    this.keysListenningOff = true;
    this.onTVKeyDown = this.onTVKeyDown.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillMount() {
    this.JuvoEventEmitter.addListener("onTVKeyDown", this.onTVKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    this.keysListenningOff = !nextProps.visible;
  }

  onTVKeyDown(pressed) {
    if (this.keysListenningOff) return;
    switch (pressed.KeyName) {
      case "Right":
        break;
      case "Left":
        break;
      case "Return":
      case "XF86AudioPlay":
      case "XF86PlayBack":
      case "XF86Back":
      case "XF86AudioStop":
        this.handleConfirm();
        break;
      case "Up":
        break;
    }
  }

  handleConfirm() {
    this.keysListenningOff = true;
    this.props.onNotificationPopupDisappeared();
  }

  render() {
    const fadeduration = 300;
    return (
      <View>
        <HideableView visible={this.props.visible} duration={fadeduration}>
          <View
            style={{
              top: 0,
              left: 0,
              width: 850,
              height: 430,
              justifyContent: "space-around",
              alignItems: "center",
              padding: 5,
              backgroundColor: "#ffffff",
              opacity: 0.8
            }}>
            <Text style={{ top: 0, left: 0, fontSize: 40, color: "#000000", textAlign: "center" }}> {this.props.messageText} </Text>
            <Text style={{ top: 0, left: 0, fontSize: 20, color: "#000000", textAlign: "center" }}> Press enter or return key to close </Text>
          </View>
        </HideableView>
      </View>
    );
  }
}