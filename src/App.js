import React, { Component, Suspense } from "react";
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
import up from "./assets/up.png";
import down from "./assets/down.png";
import loader from "./assets/skeleton.gif";
import TimeAgo from "react-timeago";

/**
 *
 * Base app component
 * @export
 * @class App
 * @extends {Component}
 *
 * @method componentDidMount
 * @method updateTime
 * @method updatePriceData
 * @method render
 *
 */
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
								: 0,
							lastUpdated: prevstate.data[name]
								? this.updateTime(
										prevstate.data[name].lastUpdated,
										prevstate.data[name].diff
								  )
								: 0
						}
					}
				}));
			});
		};
	}
	/**
	 * Method to update timeago if there is a change in price
	 *
	 * @param {number} prevTime
	 * @param {Int16Array} diff
	 * @returns number
	 * @memberof App
	 */
	updateTime(prevTime, diff) {
		let now = Date.now();
		now = new Date(now);
		if (diff === 0) {
			return prevTime;
		}
		return now;
	}
	/**
	 * Method to provide array pricedata of length=5 for reaact Sparklines
	 *
	 * @param {Array} pricedata
	 * @param {Float} price
	 * @returns Array
	 * @memberof App
	 */
	updatePriceData(pricedata, price) {
		pricedata.push(price);
		if (pricedata.length > 5) {
			pricedata.splice(0, pricedata.length - 5);
		}
		return pricedata;
	}
	render() {
		const { data } = this.state;
		return (
			<div className="App">
				<h2>Live Stocks App</h2>
				<div
					className="container"
					style={{
						marginBottom: "100px"
					}}
				>
					<Suspense fallback={<image src={loader} alt="app is loading" />}>
						<DataTable>
							{Object.keys(data).map((key, index) => (
								<TableRow key={index} count={Object.keys(data).length}>
									<TableCell component="th" scope="row">
										{key}{" "}
										{data[key].diff !== 0 ? (
											<img
												src={data[key].diff <= 0 ? up : down}
												height={15}
												width={15}
												alt="Logo"
											/>
										) : (
											` `
										)}
									</TableCell>
									<TableCell align="right">
										{Number.parseFloat(data[key].price).toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{Number.parseFloat(data[key].diff).toFixed(2)}
									</TableCell>
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
									<TableCell align="right">
										{data[key].lastUpdated !== 0 ? (
											<TimeAgo date={data[key].lastUpdated} />
										) : (
											`Not updated yet.`
										)}
									</TableCell>
								</TableRow>
							))}
						</DataTable>
					</Suspense>
				</div>
				<div
					style={{
						backgroundColor: "#f3f3f3",
						position: "fixed",
						width: "100%",
						minHeight: "50px",
						bottom: 0,
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<span>created by Vishnuprasad</span>
				</div>
			</div>
		);
	}
}
