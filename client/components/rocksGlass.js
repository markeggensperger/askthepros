import './rocksGlass.css';
import React from 'react';

function Icon() {
  return (
    <div id='rocks_glass_animation'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='300'
        viewBox='-8.233 -8.233 122.466 122.466'
        id='rocksGlass'
      >
        <path
          fill='#FFF'
          stroke='#464646'
          strokeWidth='5.616'
          d='M12.556 103L3 3h100l-9.653 100H12.556h0z'
          vectorEffect='non-scaling-stroke'
        />
        <path
          fill='#934803'
          d='M12.251 56.089h81.5l-4.9 42.022h-71.5l-5.1-42.022z'
          opacity='0.8'
        />
        <g opacity='0.6' id='iceLeft'>
          <path
            fill='#BBDEFB'
            d='M46.751 81.733l-19.089 2.938-11-19.053 19.089-2.938 11 19.053z'
          />
          <path
            fill='#2196F3'
            d='M46.751 81.733l12.088-15.062-11-19.053L35.751 62.68l11 19.053z'
          />
          <path
            fill='#90CAF9'
            d='M16.662 65.618l12.089-15.062 19.088-2.938L35.751 62.68l-19.089 2.938z'
          />
        </g>
        <g opacity='0.6' id='iceRight'>
          <path
            fill='#BBDEFB'
            d='M61.218 92.7L45.643 81.28l5.694-21.25 15.575 11.42-5.694 21.25z'
          />
          <path
            fill='#2196F3'
            d='M61.218 92.7l19.198-2.102 5.694-21.251-19.198 2.103-5.694 21.25z'
          />
          <path
            fill='#90CAF9'
            d='M51.337 60.03l19.198-2.103 15.575 11.42-19.198 2.103-15.575-11.42z'
          />
        </g>
        <path
          fill='#A2A2A2'
          fillRule='evenodd'
          d='M89.776 14.76c-1.737-.073-3.378.95-3.475 2.338l-.289 4.09c-.097 1.388 1.254 2.557 3.088 2.63h.193c1.738 0 3.186-1.023 3.282-2.41l.29-4.091c.193-1.315-1.158-2.484-3.089-2.557zm-1.062 14.317c-1.834-.073-3.378.95-3.475 2.338L80.703 91.24H23.56c-1.834 0-3.379 1.095-3.379 2.556s1.448 2.557 3.379 2.557h60.328c1.737 0 3.185-1.023 3.282-2.411l4.73-62.235c.096-1.315-1.352-2.557-3.186-2.63z'
          opacity='0.5'
        />
      </svg>
    </div>
  );
}

export default Icon;