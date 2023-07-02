import React, { useState } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';

const PopoverButton = ({ nodeKey }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const [clickedButton, setClickedButton] = useState('');

  const val = nodeKey;


  const handleClick = (event, buttonName) => {
    setShowPopover(!showPopover);
    setTarget(event.target);
    setClickedButton(buttonName);
  };

  const handlePopoverHide = () => {
    setShowPopover(false);
    setClickedButton('');
  };

  const handleGenerateNewSubtopic = (keyText) => {
    console.log(keyText);
  };

  return (
    <>
      <i
        className="fa fa-plus-circle"
        style={{ cursor: 'pointer', color: 'white', fontSize: '16px' }}
        onClick={handleClick}
      ></i>
      <Overlay
        show={showPopover}
        target={target}
        placement="right"
        container={document.body}
        rootClose
        onHide={handlePopoverHide}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button onClick={() => handleGenerateNewSubtopic(val)} style={{ marginBottom: '10px' }}>
                Generate New Subtopic
              </Button>
              <Button onClick={() => handleGenerateNewSubtopic(val)}>Add Your Own Notes</Button>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default PopoverButton;
