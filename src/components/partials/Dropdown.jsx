import React from 'react'

const Dropdown = ({ title = "Filter", options = [], func = () => {} }) => {
  return (
    <div className='select'>
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>
        {Array.isArray(options) && options.map((option, i) => (
          <option key={i} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown