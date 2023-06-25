import React, { useState, useRef, useEffect } from 'react'
import './main.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import Navbar1 from '../NewNav/NewNav'
import JsonNode from './JSONnode/JsonNode'
import Search from './Search/Search'
import SaveButton from './MainComponents/SaveButton';
import CommentSection from './MainComponents/CommentSection'
import FeedbackComponent from './MainComponents/FeedbackSection'
import Remix from './MainComponents/Remix'
import LoadingBar from './Search/loadingAnimation/loadingAnimation'
import { getQueryId } from './Search/queryIdManager';

const data = {}

export default function Main(props) {
    /* Getting User ID */
    const [userId, setUserId] = useState(null); // Store the userId here
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Store the isLoggedIn state here

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserId(user.uid); // Set the userId if the user is logged in
            } else {
                setIsLoggedIn(false);
                setUserId(null); // Reset the userId if the user is not logged in
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);
    /* End of Getting User ID */


    /* Handling Search and Giving JSON output for rendering */
    const [jsonData, setJsonData] = useState(data);
    
    const handleSetData = newData => {
        setJsonData(newData);
        console.log(newData);
    }

    const handleSearch = searchQuery => {
        console.log('Search query:', searchQuery);
        setJsonData(searchQuery);
    }
    console.log(jsonData);
    /* End of Handling Search and Giving JSON output for rendering */


    /* Query Processing status */
    const [queryStatus, setQueryStatus] = useState('static'); // Add query status state
    const queryId = getQueryId(); // Get the queryId from the queryIdManager
    const queryRef = `users/${userId}/Queries/${queryId}`;

    useEffect(() => {
        const database = getDatabase();
        const queryStatusRef = ref(database, `users/${userId}/Queries/currentQueryStatus`); // Replace QUERY_ID and CURRENT_QUERY_ID with actual values

        onValue(queryStatusRef, (snapshot) => {
            const status = snapshot.val() || 'static';
            console.log(status);
            setQueryStatus(status);
        });
    }, [userId]);
    /* End of Query Processing status */

    /* Wokring inside current query */



    /* RETURN COMPONENT */
    return (
        <div className="MainContent" >
            <Navbar1 />

            {/* Notes Area */}
            <div className='your-topics'>
                <Search onSearch={handleSearch} />
            </div>

            <div className='rectnotes'>
                <div className='icon'>
                    <SaveButton jsonData={jsonData} queryRef={queryRef} isLoggedIn={isLoggedIn} />
                    <Remix />
                    <CommentSection />
                    <FeedbackComponent />
                </div>
                <div id='tree-view'>
                    {queryStatus === 'processing' ? <LoadingBar /> : null}
                    <JsonNode data={jsonData} setData={handleSetData} />
                </div>
            </div>
        </div>
    );
}