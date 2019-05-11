import React, { Component } from "react";
import "./App.scss";
import ConfigData from "./config";
import DataTable from "./components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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
				<DataTable>
					{Object.keys(data).map((key, index) => (
						<TableRow key={index} count={Object.keys(data).length}>
							<TableCell component="th" scope="row">
								{key}
							</TableCell>
							<TableCell align="right">{data[key]}</TableCell>
						</TableRow>
					))}
				</DataTable>
			</div>
		);
	}
}
