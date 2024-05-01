/** @format */

interface IEyeSlashIcon {
  color: string;
}

const EyeSlashIcon = ({ color }: IEyeSlashIcon) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.68661 6.81328L6.31328 10.1866C5.87995 9.75328 5.61328 9.15995 5.61328 8.49995C5.61328 7.17995 6.67995 6.11328 7.99995 6.11328C8.65995 6.11328 9.25328 6.37995 9.68661 6.81328Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8799 4.34682C10.7132 3.46682 9.3799 2.98682 7.9999 2.98682C5.64656 2.98682 3.45323 4.37348 1.92656 6.77348C1.32656 7.71348 1.32656 9.29348 1.92656 10.2335C2.45323 11.0602 3.06656 11.7735 3.73323 12.3468"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.61328 13.52C6.37328 13.84 7.17995 14.0133 7.99995 14.0133C10.3533 14.0133 12.5466 12.6266 14.0733 10.2266C14.6733 9.28662 14.6733 7.70662 14.0733 6.76662C13.8533 6.41995 13.6133 6.09329 13.3666 5.78662"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.34 8.9668C10.1666 9.9068 9.39996 10.6735 8.45996 10.8468"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.31301 10.187L1.33301 15.167"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6665 1.8335L9.68652 6.8135"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeSlashIcon;
