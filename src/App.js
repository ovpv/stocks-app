import React, { Component } from "react";
import "./App.scss";
import ConfigData from "./config";
import DataTable from "./components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
	Sparklines,
	SparklinesLine,
	SparklinesReferenceLine
} from "react-sparklines";
export default class App extends Component {
	socket;
	constructor() {
		super();
		this.state = {
			data: {}
		};
	}
	componentDidMount() {
		this.socket = new WebSocket(ConfigData.url);
		this.socket.onmessage = event => {
			let Data = JSON.parse(event.data);
			Data.forEach(([name, price]) => {
				this.setState(prevstate => ({
					data: {
						...prevstate.data,
						[name]: {
							price,
							pricedata: prevstate.data[name]
								? this.updatePriceData(prevstate.data[name].pricedata, price)
								: [],
							diff: prevstate.data[name]
								? prevstate.data[name].price - price
								: 0
						}
					}
				}));
			});
		};
	}
	updatePriceData(pricedata, price) {
		pricedata.push(price);
		if (pricedata.length > 5) {
			pricedata.splice(0, pricedata.length - 5);
		}
		return pricedata;
	}
	render() {
		const { data } = this.state;
		console.log(data);
		return (
			<div className="App">
				<h2>Hello world</h2>
				<DataTable>
					{Object.keys(data).map((key, index) => (
						<TableRow key={index} count={Object.keys(data).length}>
							<TableCell component="th" scope="row">
								{key}
							</TableCell>
							<TableCell align="right">{data[key].price}</TableCell>
							<TableCell align="right">{data[key].diff}</TableCell>
							<TableCell align="right">
								<Sparklines
									data={data[key].pricedata}
									limit={5}
									width={100}
									height={20}
									margin={5}
								>
									<SparklinesLine color="blue" />
									<SparklinesReferenceLine type="mean" />
								</Sparklines>
							</TableCell>
						</TableRow>
					))}
				</DataTable>
			</div>
		);
	}
}
