/** @format */

interface ITrashIcon {
  color: string;
}

const TrashIcon = ({ color }: ITrashIcon) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66663 3.31301L5.81329 2.43967C5.91996 1.80634 5.99996 1.33301 7.12663 1.33301H8.87329C9.99996 1.33301 10.0866 1.83301 10.1866 2.44634L10.3333 3.31301"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5666 6.09277L12.1332 12.8061C12.0599 13.8528 11.9999 14.6661 10.1399 14.6661H5.85989C3.99989 14.6661 3.93989 13.8528 3.86656 12.8061L3.43323 6.09277"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.88672 11H9.10672"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33337 8.33301H9.66671"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
