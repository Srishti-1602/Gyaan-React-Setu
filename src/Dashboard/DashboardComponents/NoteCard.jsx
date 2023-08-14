import React from "react";
import RemixCom from "../../IconUtils/Remix";
import Star from "../../IconUtils/Star";
import View from "../../IconUtils/Views";

const NoteCard = ({
	key,
	noteId,
	noteTitle,
	noteSubject,
	noteCreator,
	noteLastEdited,
	noteContent,
	starsNum,
	remixNum,
	viewsNum,
}) => {
	return (
		<div className="col-display col-lg-3 col-md-5 col-sm-5 note-rec">
			<div className="note-rec-head">
				<h3 className="card-title-note">{noteTitle}</h3>
			</div>
			<div className="note-rec-body">
				<p>Subject: {noteSubject}</p>
				<p>Creator: {noteCreator}</p>
				<p>Last Edited: {noteLastEdited}</p>
				{/* <p>Comments: </p> */}
			</div>
			<div className="icon-my-notes">
				<ul>
					<li>
						<RemixCom />
						<span className="IconDash">{remixNum}</span>
					</li>
					<li>
						<Star noteId={"-Nbhzu5nn--2osZw_-wD"} />
						<span className="IconDash"></span>
					</li>
					<li>
						<View />
						{/* <Stars /> */}
						<span className="IconDash">{viewsNum}</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NoteCard;
