import React, { useState, useRef, useEffect } from 'react'
import './main.css'
import Navbar1 from '../NewNav/NewNav'
import JsonNode from './JSONnode/JsonNode'
import Search from './Search/Search'
import SaveButton from './SaveButton';
import CommentSection from './CommentSection'
import FeedbackComponent from './FeedbackSection'
import Remix from './Remix'

const data = {}

export default function Main(props) {
    const [jsonData, setJsonData] = useState(data);
    
    const handleSetData = newData => {
        setJsonData(newData);
    }

    const handleSearch = searchQuery => {
        console.log(`Search query: ${searchQuery}`);
        setJsonData(searchQuery);
    }

    return (
        <div className="MainContent" >
            <Navbar1 />

            {/* Notes Area */}
            <div className='your-topics'>
                <Search onSearch={handleSearch} />
            </div>

            <div className='rectnotes'>
                <div className='icon'>
                    <SaveButton />
                    <Remix />
                    <CommentSection />
                    <FeedbackComponent />
                </div>
                <div id='tree-view'>
                    <JsonNode data={jsonData} setData={handleSetData} />
                </div>
            </div>
        </div>
    );
}