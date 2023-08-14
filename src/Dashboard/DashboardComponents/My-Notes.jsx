import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { getDatabase, ref, onValue } from "firebase/database";

const MyNotes = ({ userId }) => {
	return (
		<div className="row row-notes-display">
			<NoteCard
				noteTitle="SI and CI Engine"
				noteSubject="Thermal Engineering"
				noteCreator="Srishti"
				noteLastEdited="5-8-2023"
				remixNum="1"
				starsNum="3"
				viewsNum="5"
			/>
			<NoteCard
				noteTitle="Breaks"
				noteSubject="Automobile Engineering"
				noteCreator="Srishti"
				noteLastEdited="30-7-2023"
				remixNum="0"
				starsNum="1"
				viewsNum="2"
			/>
		</div>
	);
};

export default MyNotes;
