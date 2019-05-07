import React, { Component } from "react";
import "./App.scss";
import ConfigData from "./config";

export default class App extends Component {
	socket;
	constructor() {
		super();
		this.state = {
			data: ""
		};
	}
	componentDidMount() {
		this.socket = new WebSocket(ConfigData.url);
		this.socket.onmessage = event => {
			this.setState({
				data: JSON.parse(event.data)
			});
		};
	}
	render() {
		console.log(this.state.data);
		return (
			<div className="App">
				<h2>Hello world</h2>
			</div>
		);
	}
}
