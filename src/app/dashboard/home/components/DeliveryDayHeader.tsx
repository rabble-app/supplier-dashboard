/** @format */

import { Spin } from "antd";

import Button from "@/components/Button";
import EditIcon from "@/components/svgs/EditIcon";

export default function DeliveryDayHeader({
  title,
  editMode,
  setEditMode,
  handleSave,
  className = "",
  isEditing,
  isUpdatingDeliveryDay,
}: Readonly<{
  title: string;
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  className?: string;
  isEditing?: boolean;
  isUpdatingDeliveryDay?: boolean;
}>) {
  return (
    <div
      className={`flex gap-2 items-center ${
        editMode ? "justify-between" : ""
      } ${className}`}
    >
      <h2 className="text-grey-2 text-xl font-gosha">{title}</h2>

      {isEditing && (
        <>
          {!editMode && (
            <EditIcon
              color="#667085"
              className="cursor-pointer"
              onClick={() => setEditMode?.(true)}
            />
          )}

          {editMode && (
            <div className="flex gap-2.5">
              <Button
                label="Cancel"
                className="text-grey-2 bg-white-3"
                size="xs"
                onClick={() => setEditMode?.(false)}
              />
              <Button
                label={isUpdatingDeliveryDay ? <Spin size="small" /> : "Save"}
                className="bg-primary"
                size="xs"
                onClick={handleSave}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
