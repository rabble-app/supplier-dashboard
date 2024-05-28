/** @format */

import { Checkbox, CheckboxProps } from "antd";

import { Region, RegionOptionType } from "../interfaces";

export default function GeneralMinOrder({
  onChange,
  isChecked,
  handleUpdateRegion,
  disabled,
}: {
  onChange: CheckboxProps["onChange"];
  isChecked: boolean;
  handleUpdateRegion: (
    type: RegionOptionType,
    region: Region | undefined,
    value: string
  ) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-2 items-center justify-between custom-check mb-2.5">
      <Checkbox className="flex my-1" onChange={onChange}>
        <p className="text-grey-2 text-base">
          Use the same min for all Regions
        </p>
      </Checkbox>

      {isChecked && (
        <div className="flex items-center gap-3.5">
          <p className="text-sm text-grey-2 font-medium">Min Order</p>
          <div
            className={`${
              disabled ? "bg-grey-4" : "bg-grey-1"
            } rounded-lg text-sm px-4 py-1 flex items-center gap-3`}
          >
            <p className="text-grey-6 font-medium">£</p>
            <input
              className={`w-14 text-base text-right ${
                disabled ? "bg-grey-4" : "bg-grey-1"
              } pr-2 outline-none ${disabled ? "cursor-not-allowed" : ""}`}
              type="number"
              placeholder="0.00"
              step=".01"
              onChange={(e) =>
                handleUpdateRegion("genMinOrder", undefined, e.target.value)
              }
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
}
