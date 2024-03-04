/** @format */

"use client";
import { Drawer } from "antd";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import TeamDetailsHeading from "./TeamDetailsHeading";
import { getStatusClass } from "../../orders/util";
import TeamDetailsInfo from "./TeamDetailsInfo";
import DropdownIcon from "@/components/svgs/DropdownIcon";

interface ITeamSectionDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TeamSectionDrawer = ({ open, setOpen }: ITeamSectionDrawer) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      closeIcon={<CloseButton className="absolute right-5 top-5" />}
      placement="right"
      onClose={onClose}
      open={open}
      width={650}
      className="relative px-5 pt-14 custom-drawer"
    >
      <div className="">
        <h1 className="font-gosha text-[32px] leading-10 mb-2">Team Details</h1>
        <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
          These details will be used to help deliver team details on RABBLE.
        </p>

        <div className="bg-white-1 rounded-lg p-6">
          <TeamDetailsHeading
            title="Farm2Door"
            subtitle="Fruits and Vegetables"
            rightIcon={
              <span
                className={`${getStatusClass(
                  "Pending"
                )} leading-[18px] text-xs py-1 px-2 rounded-[100px] capitalize`}
              >
                Pending
              </span>
            }
          />
          <TeamDetailsInfo
            title="Delivery address"
            subtitle="street 17, Nottingham"
          />
          <TeamDetailsInfo title="Frequency" subtitle="Every 1 month" />
          <TeamDetailsInfo title="Delivery date" subtitle="22 June 2023" />

          <div className="bg-white rounded-lg px-4 py-2.5 mt-6 flex justify-between items-center shadow-custom-1">
            <div className="flex items-center gap-2">
              <div className="bg-black rounded-full w-8 h-8 flex justify-center items-center text-xs text-primary font-gosha">
                SW
              </div>
              <div>
                <h3 className="text-base text-black font-gosha">
                  Swift Squad Basket
                </h3>
                <p className="text-grey-2 text-sm">3 items</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-grey-2 font-gosha text-base font-bold">
                &#163;240.00
              </p>
              <DropdownIcon color="#0053F5" size="16" />
            </div>
          </div>
        </div>

        <div className="pb-10 absolute bottom-0 left-5 right-5">
          <Button
            label="Mark Order as Completed"
            className="text-2xl w-full"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default TeamSectionDrawer;
