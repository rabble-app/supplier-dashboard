/** @format */

interface IDropdownIcon {
  color: string;
  size?: string;
}

const DropdownIcon = ({ color, size = "16" }: IDropdownIcon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
    >
      <path
        d="M26.56 11.9333L17.8667 20.6267C16.84 21.6534 15.16 21.6534 14.1333 20.6267L5.44 11.9333"
        stroke={color}
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DropdownIcon;
