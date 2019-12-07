import React from 'react';

const SegmentList = props => (
  <ul className="segments">
    {props.list &&
      props.list.map(segment => (
        <li key={segment.date}>
          {segment.date}: {segment.value}
        </li>
      ))}
  </ul>
);

export default SegmentList;
