// @flow
import React from 'react';

type Props = {
  className?: string,
  color: string,
  size: number
};

const title = <title>Caret</title>;

const Caret = ({ className, color = 'currentColor', size }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height={size}
    width={size}
  >
    {title}
    <path
      fill={color}
      fillRule="evenodd"
      d="M256 275.015L439.015 92 512 164.985 256.553 420.43l-.553-.552-.553.553L0 164.987 72.985 92 256 275.015z"
    />
  </svg>
);

Caret.defaultProps = {
  color: 'currentColor'
};

export default Caret;
