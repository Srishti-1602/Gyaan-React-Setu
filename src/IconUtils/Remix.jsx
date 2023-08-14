import React, { useRef } from "react";
import RemixIcon from "../icons/share-forward-box-line.png";

const Remix = ({ remixNum }) => {
	const rectNotesRef = useRef(null);

	return (
		<a>
			<img
				src={RemixIcon}
				alt="Remix"
				className="RemixComm"
				id="RemicCommunity"
			/>
			{"  "}
			{remixNum}
		</a>
	);
};

export default Remix;
