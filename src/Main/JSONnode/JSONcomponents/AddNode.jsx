import React, { useState } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';

const PopoverButton = ({ nodeKey, mydata, setData }) => {
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
    const existingValue = mydata[keyText];
    console.log(existingValue);
    let newValue;

    if (typeof existingValue === 'object' && !Array.isArray(existingValue)) {
      // Handle the case when the existing value is already an object
      newValue = {
        ...existingValue,
        searchFor: ['subnodeValue'],
      };
    } else {
      // Handle the case when the existing value is a string
      newValue = {
        searchFor: ['subnodeValue'],
        value: existingValue,
      };
    }

    const newData = {
      ...mydata,
      [keyText]: newValue,
    };
    setData(newData);
    setShowPopover(false);
  };

  /* 

  const handleAddYourOwnNotes = (keyText) => {
    const existingValue = mydata[keyText];
    console.log(existingValue);
    let newValue;

    if (typeof existingValue === 'object' && !Array.isArray(existingValue)) {
      // Handle the case when the existing value is already an object
      newValue = {
        ...existingValue,
        newSubtitle,
      };
    } else {
      // Handle the case when the existing value is a string
      newValue = {
        newSubtitle,
        value: existingValue,
      };
    }

    const newData = {
      ...mydata,
      [keyText]: newValue,
    };
    setData(newData);
    setShowPopover(false);
  } */

  let newSubtitle = {
    newParagraph: ['myParagraph']
  }
  
  const setNestedData = (keyText, mydata) => {
    const handleAddYourOwnNotes = (keyText, nestedData) => {
      const updatedData = { ...nestedData };
    
      const addNewValue = (data) => {
        Object.keys(data).forEach((key) => {
          if (key === keyText) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
              // If the existing value is an object, update it with the new value
              data[key] = {
                ...data[key],
                newSubtitle
              };
            } else {
              // If the existing value is a string, create a new object with the new value
              data[key] = {
                newSubtitle,
                value: data[key],
              };
            }
          } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            // Recursively call addNewValue for nested objects
            addNewValue(data[key]);
          }
        });
      };
    
      addNewValue(updatedData);
    
      return updatedData;
    };
    
    const newData = handleAddYourOwnNotes(keyText, mydata);
    setData(newData);
    setShowPopover(false);
    
  }
  

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
              <Button onClick={() => setNestedData(val, mydata)}>Add Your Own Notes</Button>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default PopoverButton;