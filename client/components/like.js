import React from 'react';

const Like = (props) => {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      id="heart"
      // onClick={() => props.handleClick('likes')}
    >
      <g transform="translate(100 100)">
        <path
          transform="translate(-50 -50)"
          fill="tomato"
          d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"
        />
      </g>
    </svg>
  );
};

export default Like;
