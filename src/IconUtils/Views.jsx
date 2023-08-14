import React, { useRef } from "react";
import ViewIcon from "../icons/eye-line.png";

const Views = ({ viewsNum }) => {
	const rectNotesRef = useRef(null);

	return (
		<a>
			<img src={ViewIcon} alt="View" className="ViewComm" id="ViewCommunity" />
			{"  "}
			{viewsNum}
		</a>
	);
};

export default Views;
