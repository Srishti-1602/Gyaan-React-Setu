import React, { useState } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';

const PopoverButton = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const [clickedButton, setClickedButton] = useState('');

  const handleClick = (event, buttonName) => {
    setShowPopover(!showPopover);
    setTarget(event.target);
    setClickedButton(buttonName);
  };

  const handlePopoverHide = () => {
    setShowPopover(false);
    setClickedButton('');
  };

  const handleButtonClick = () => {
    console.log(`${clickedButton}: Click me`);
  };

  return (
    <>
      <i
                className="fa fa-plus-circle"
                style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
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
              <Button onClick={handleButtonClick.bind(null, 'ABC')}
              style={{ marginBottom: '10px' }}>ABC</Button>
              <Button onClick={handleButtonClick.bind(null, 'XYZ')}>XYZ</Button>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default PopoverButton;
