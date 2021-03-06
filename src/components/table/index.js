import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

/**
 * styles set by default for the material ui table
 *
 * @param {*} theme
 * @returns object
 *
 */
const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: "auto"
	}
});

/**
 *  Component which renders the data in Material ui Table
 *
 * @class DataTable
 * @extends {Component}
 *
 * @method render
 */
class DataTable extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Stock</TableCell>
								<TableCell align="right">Price (in $)</TableCell>
								<TableCell align="right">Difference</TableCell>
								<TableCell align="right">Graph</TableCell>
								<TableCell align="right">Last updated</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{this.props.children}</TableBody>
					</Table>
				</div>
			</Paper>
		);
	}
}

DataTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataTable);
