import React from "react";
import PropTypes from "prop-types";
export function GranSpinner(props) {
	return (
		<div
			className="spinner-border mx-auto"
			role="status"
			style={{ width: "100px", height: "100px", marginTop: props.marginTop }}>
			<span className="sr-only">Loading...</span>
		</div>
	);
}

GranSpinner.propTypes = {
	marginTop: PropTypes.string
};
