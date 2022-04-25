import React from 'react';

const MySelect = (props) => {
  const {options, defaultValue, value, onChange} = props

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled={true} value="">{defaultValue}</option>
      {options?.map(option => (
        <option key={option.value} value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default MySelect;