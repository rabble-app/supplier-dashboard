/** @format */

interface ICloseIcon {
  color: string;
  size: number;
}

const CloseIcon = ({ color, size }: ICloseIcon) => {
  return (
    <svg
      width={size*4}
      height={size*4}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
    >
      <path
        d="M17.3433 17.3398L28.657 28.6536"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.343 28.6536L28.6567 17.3398"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
