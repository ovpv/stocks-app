import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

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

class DataTable extends React.Component {
	// handleChangePage = (event, page) => {
	// 	this.setState({ page });
	// };

	// handleChangeRowsPerPage = event => {
	// 	this.setState({ page: 0, rowsPerPage: event.target.value });
	// };

	render() {
		const { classes } = this.props;
		// const { rowsPerPage, page } = this.state;
		// const emptyRows =
		// 	rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
