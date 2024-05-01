/** @format */

interface IEyeOpenIcon {
  color: string;
}

const EyeOpenIcon = ({ color }: IEyeOpenIcon) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3866 8.49995C10.3866 9.81995 9.31995 10.8866 7.99995 10.8866C6.67995 10.8866 5.61328 9.81995 5.61328 8.49995C5.61328 7.17995 6.67995 6.11328 7.99995 6.11328C9.31995 6.11328 10.3866 7.17995 10.3866 8.49995Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9999 14.0133C10.3532 14.0133 12.5466 12.6266 14.0732 10.2266C14.6732 9.28665 14.6732 7.70665 14.0732 6.76665C12.5466 4.36665 10.3532 2.97998 7.9999 2.97998C5.64656 2.97998 3.45323 4.36665 1.92656 6.76665C1.32656 7.70665 1.32656 9.28665 1.92656 10.2266C3.45323 12.6266 5.64656 14.0133 7.9999 14.0133Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeOpenIcon;
