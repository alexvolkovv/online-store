import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";

const MySelect = (props) => {
  const {options, defaultValue, value, onChange} = props
  const [currentValue, setCurrentValue] = useState(defaultValue)
  return (
    <Dropdown className={'mb-2 mr-2'}>
      <Dropdown.Toggle>
        {currentValue}
      </Dropdown.Toggle>
      <Dropdown.Menu>
           {options?.map(option => (
             <Dropdown.Item
               key={option.value}
               value={option.value}
               onClick={() => {
                 setCurrentValue(option.name)
                 onChange(option.value)
               }}
             >
               {option.name}
             </Dropdown.Item>
           ))}
      </Dropdown.Menu>
    </Dropdown>
    // <select
    //   value={value}
    //   onChange={(event) => onChange(event.target.value)}
    // >
    //   <option disabled={true} value="">{defaultValue}</option>
    //   {options?.map(option => (
    //     <option key={option.value} value={option.value}>{option.name}</option>
    //   ))}
    // </select>
  );
};

export default MySelect;