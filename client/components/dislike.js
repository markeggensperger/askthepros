import React from 'react';

function Icon(props) {
  return (
    <div id="dislike_box">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 30 30"
        id="dislike"
        onClick={() => props.handleClick(props.tag, 'dislike')}
      >
        <defs>
          <clipPath id="clip1">
            <path d="M0 0h29.984v29.984H0zm0 0" />
          </clipPath>
          <clipPath id="clip2">
            <path d="M0 0h29.984v29.984H0zm0 0" />
          </clipPath>
        </defs>
        <g>
          <g clipPath="url(#clip1)">
            <path
              fill="tomato"
              fillRule="evenodd"
              d="M29.305 14.992c0 7.903-6.41 14.313-14.313 14.313C7.086 29.305.68 22.895.68 14.992.68 7.086 7.086.68 14.992.68c7.903 0 14.313 6.406 14.313 14.312zm0 0"
            />
          </g>
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M6.879 14.598c-.04.297-.59.742-.61 1.043-.03.55.711 1.62 1.22 1.828.593.238 2.96.222 4.179.195.145-.004 1.082.18.723.934-.23.78-.801 1.726-1.008 2.226-.453 1.098-.375 2.551.195 3.301.695.91 1.973.973 2 .563.192-2.961.758-3.786 1.516-4.372.457-.351.855-.66 1.066-1.195 1.297-3.297 2.254-4.058 2.805-4.058h.125c.105 0 .27-.223.316-.598.153-1.32.446-4.535-.027-6.68-.016-.074-.129-.23-.606-.32-.472-.09-3.28-.61-3.28-.61s-4.766-.453-6.266 0c-.473.141-1.286.848-1.477 1.305-.11.262.043.88-.09 1.13-.191.374-1 .843-1 1.35 0 .36.422.985.395 1.348-.032.36-.785.856-.785 1.219.003.379.66 1.012.609 1.39zm0 0M20.063 7.684a.73.73 0 01.726-.664h2.195c.403 0 .73.328.73.73v6.945c0 .403-.327.73-.73.73H20.79a.732.732 0 01-.73-.73v-.015c0-.02.566-3.672.003-6.996zm0 0"
          />
        </g>
      </svg>
    </div>
  );
}

export default Icon;
