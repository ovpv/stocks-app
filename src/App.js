import React, { Component } from "react";
import "./App.scss";
import ConfigData from "./config";

export default class App extends Component {
  socket;
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.socket = new WebSocket(ConfigData.url);
    this.socket.onmessage = event => {
      let Data = JSON.parse(event.data);
      Data.forEach(([name, price]) => {
        this.setState(prevstate => ({
          data: { ...prevstate.data, [name]: price }
        }));
      });
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <h2>Hello world</h2>
        {Object.keys(data).map((key, index) => (
          <div key={index}>
            <div>{key}</div>
            <div>{data[key]}</div>
          </div>
        ))}
      </div>
    );
  }
}
