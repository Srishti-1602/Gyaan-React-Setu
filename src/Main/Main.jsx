import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useRef } from 'react';
import './main.css';
import JsonNode from './JSONnode/JsonNode';
import Search  from './Search/Search';
import CommentIcon from '../icons/discuss-line.png';
import RemixIcon from '../icons/share-forward-box-line.png';
import Upward from '../icons/icons8-send-letter-50.png';
import { Navigate } from 'react-router-dom';
import Navbar1 from '../NewNav/NewNav';

const data = {
  id: 'A function of a real variable f(x) is differentiable at a point a of its domain, if its domain contains an open interval I containing a, and the limit","exists. This means that, for every positive real number \\(\\varepsilon \\) (even very small), there exists a positive real number \\\\(\\\\delta \\\\) such that, for every h such that \\\\(\\|h|<\\delta \\\\) and h≠0{\\displaystyle h\\neq 0} then $f(a+h)$ is defined, and',
  name: 'John Doe',
  paragraphs: 'dsadas',
  age: 30,
  hobbies: {paragraphs:['dsadas'], basketball: 'football', music: 'movies'},
  address: {
    street: {paragraphs: ['afasfsa', 'IMAGE_URL: https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg', 'dsafafa'], '123 Main St': 'Apt 1',},
    city: 'Anytown',
    state: 'CA',
    url: ['https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL'],
    paragraphs: ['afasfsa', 'dsafafa', 'IMAGE_URL: https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg', "new element", 'dasfsafsa', 'ds', 'dsafsa', 'fsafsa'],
  },
};

export default function Main(props) {
  const [jsonData, setJsonData] = useState(data);
  const [showSaveNote, setShowSaveNote] = useState(false);

  const handleSetData = (newData) => {
    setJsonData(newData);
  };

  const handleSearch = (searchQuery) => {
    console.log(`Search query: ${searchQuery}`);
    setJsonData(searchQuery);
  };
  const isLoggedIn = props.isLoggedIn;

  const handleSaveButtonClick = () => {
      if (isLoggedIn) {
        setShowSaveNote(true);
      } else {
        // Redirect to login page
        return <Navigate to="/login" />;
      }
    };

const rectNotesRef = useRef(null);

 const handleScrollToTop = () => {
  const rectNotesElement = rectNotesRef.current;
    window.scrollTo({
      top: rectNotesElement.offsetTop,
      behavior: 'smooth'
    });
 };

  return (
    <div>
    <Navbar1 />
      
      <div className='your-topics'>
      <Search onSearch={handleSearch} />
      </div>
      
      
      <div className="card bg-dark text-white save-note" id="save-in-rect" style={{ display: showSaveNote ? 'block' : 'none' }}>
			<span className="close" id="close-save-form-button">&times;</span>
			<div className="card-body p-5 text-center card-save">
				<div className="mb-md-5 mt-md-4 pb-5">
					<h2 className="fw-bold mb-2 text-uppercase save-head">Save Note</h2>
					<div className="save-inforec">
						<div className="save-info">
							<form id="savenote-form" onsubmit="return false;">
								<input
									type="text"
									className="save-title"
									id="save-title"
									placeholder="Note Title"
									required />
								<input
									type="text"
									className="save-title"
									id="save-subject"
									placeholder="Subject"
									required />
								<button type="submit" class="sign-up" id="save-button"
									>Save</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>      

      <div className='rectnotes'>
      <div className='saveNotesDiv'>
        <button type='button' className='savebutt' id='save-prompt-button' onSubmit={handleSaveButtonClick}>
          Save
        </button>    
      </div>
        <div className='icon'>
        <a href=" "> <img src={RemixIcon} alt="My Icon" className='remixic' ref={rectNotesRef}/></a>
        <a href=" "> <img src={CommentIcon} alt="My Icon" className='commic'/></a>
        </div>
        <div className='notes'>
          <a href=" " onClick={handleScrollToTop}> <img src={Upward} alt="My Icon" className='upward'/></a>
        </div>
        <div id='Summary-Preview'></div>
        <div id="tree-view">
          <JsonNode data={jsonData} setData={handleSetData} />
        </div>
      </div>
    </div>
  );
}
