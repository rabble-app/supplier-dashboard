/** @format */

import { CloseOutlined } from "@ant-design/icons";

import { days, times } from "../data";

import DeliveryDayHeader from "./DeliveryDayHeader";
import { IDeliveryDay } from "../interfaces";

export default function SelectedDeliveryDayConfig({
  selectedDeliveryDays,
  handleCutOffChange,
  handleDayClick,
  isRemovable = true,
  isEditing,
  isUpdatingDeliveryDay,
  handleUpdateDeliveryDay,
  editModeDays,
  setEditModeDays,
}: {
  selectedDeliveryDays: IDeliveryDay[];
  handleDayClick: (day: (typeof days)[number]) => void;
  handleCutOffChange: (
    type: "day" | "time",
    deliveryDay: IDeliveryDay,
    value: string
  ) => void;
  isRemovable?: boolean;
  isEditing?: boolean;
  isUpdatingDeliveryDay?: boolean;
  handleUpdateDeliveryDay?: () => void;
  editModeDays?: boolean;
  setEditModeDays?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="my-8 mb-2">
      <DeliveryDayHeader
        title="Selected delivery day"
        editMode={editModeDays}
        setEditMode={setEditModeDays}
        handleSave={() => handleUpdateDeliveryDay?.()}
        isEditing={isEditing}
        isUpdatingDeliveryDay={isUpdatingDeliveryDay}
      />
      {selectedDeliveryDays.map((deliveryDay, i) => (
        <div
          key={`${deliveryDay}-${i}`}
          className="my-4 flex items-center justify-between"
        >
          <button
            className={`flex items-center gap-2.5 text-grey-2 px-6 py-2.5 w-fit rounded-[100px] cursor-pointer bg-primary`}
            onClick={() =>
              isRemovable ? handleDayClick(deliveryDay.day) : null
            }
          >
            {isRemovable && <CloseOutlined style={{ color: "#334054" }} />}

            <p className="text-base leading-6 font-semibold capitalize">
              {deliveryDay.day?.toLowerCase()}
            </p>
          </button>
          <div className="flex gap-2 items-center">
            <p>Cut off time:</p>
            <select
              className={`text-grey-6 capitalize font-medium rounded-lg py-1 pl-4 -pr-2 focus:outline-none ${
                editModeDays
                  ? "bg-grey-1 cursor-pointer"
                  : "bg-grey-4 cursor-not-allowed"
              }`}
              onChange={(e) =>
                handleCutOffChange("day", deliveryDay, e.target.value)
              }
              disabled={!editModeDays}
            >
              <option selected key={`${deliveryDay.cutOffDay}`}>
                {deliveryDay.cutOffDay.toLowerCase()}
              </option>
              {days.map(
                (day, i) =>
                  deliveryDay.cutOffDay.toLowerCase() !== day.toLowerCase() && (
                    <option key={`${day}-${i}`} value={day}>
                      {day}
                    </option>
                  )
              )}
            </select>
            <select
              className={`text-grey-6 font-medium rounded-lg py-1 pl-4 -pr-2 focus:outline-none  ${
                editModeDays
                  ? "bg-grey-1 cursor-pointer"
                  : "bg-grey-4 cursor-not-allowed"
              }`}
              onChange={(e) =>
                handleCutOffChange("time", deliveryDay, e.target.value)
              }
              disabled={!editModeDays}
            >
              <option selected key={`${deliveryDay.cutOffTime}`}>
                {deliveryDay.cutOffTime}
              </option>
              {times.map(
                (time, i) =>
                  deliveryDay.cutOffTime !== time && (
                    <option key={`${time}-${i}`} value={time}>
                      {time}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
