// @flow
import React from 'react';

type Props = {
  className?: string,
  color: string,
  size: number,
  sorted: 'ascending' | 'descending' | 'none'
};

// These are statically created since they have no state and don't take props
const title = <title>Sort Arrows</title>;
const upArrow = <path d="M256.286 0L52 220h408.571z" />;
const downArrow = <path d="M256.286 512L460.57 292H52z" />;

const SortArrows = ({ className, color, size, sorted }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
  >
    {title}
    <g fill={color} fillRule="evenodd">
      {(sorted === 'none' || sorted === 'ascending') && upArrow}
      {(sorted === 'none' || sorted === 'descending') && downArrow}
    </g>
  </svg>
);

SortArrows.defaultProps = {
  color: 'currentColor'
};

export default SortArrows;
