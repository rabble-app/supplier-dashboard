/** @format */

"use client";
import { useState } from "react";
import { Drawer } from "antd";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Image from "next/image";
import Input from "@/components/auth/Input";
import PhoneNumberInput from "@/components/PhoneInput";
import "react-phone-number-input/style.css";
import Select from "@/components/Select";
import { categories } from "../data";

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SupplierDetailsDrawer = ({ open, setOpen }: ISupplierDetailsDrawer) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const onClose = () => {
    setOpen(false);
  };

  const availableCategories: any =
    categories?.filter((cat: any) => !selectedCategoryIds.includes(cat.id)) ||
    [];

  const handleCategorySelected = (id: string) => {
    setSelectedCategoryIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
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
      <div className="overflow-y-scroll">
        <h1 className="font-gosha text-[32px] leading-10 mb-2">
          Supplier details
        </h1>
        <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
          These details will be used to help local customers connect with you on
          RABBLE.
        </p>

        <div className="flex flex-col gap-4">
          <div className="bg-grey-1 rounded-lg flex flex-col justify-center items-center cursor-pointer py-[30px]">
            <Image
              src="/images/icons/picture-rectangle.svg"
              width={96}
              height={96}
              alt="no-image"
            />
            <p className="text-grey-2 text-sm">Upload supplier logo</p>
          </div>

          <Input label="Business Name" id="bus_name" type="text" />

          <div className="flex flex-col">
            <label
              className="text-grey-2 leading-6 text-base font-medium mb-1"
              htmlFor="bus_desc"
            >
              Short Business Description
            </label>
            <textarea
              className="bg-grey-1 rounded-lg leading-[30px] p-[25px] text-xl focus:outline-primary-light-1 text-grey-6 font-normal"
              name="bus_desc"
            />
          </div>

          <Input label="Business Address" id="bus_address" type="text" />

          <div className="flex flex-col">
            <label className="text-grey-2 leading-6 text-base font-medium mb-1">
              Business Phone Number
            </label>
            <PhoneNumberInput name="phone" required={true} />
          </div>

          <Input label="Website" id="website" type="text" />
        </div>

        <div className="mt-[56px]">
          <h1 className="font-gosha text-[32px] leading-10 mb-2">
            Goods and Services
          </h1>
          <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
            Select the categories you specialise in, this enables us to promote
            you in relevant searches on RABBLE
          </p>

          <div className="flex flex-col gap-10 mt-6 mb-20">
            <Select
              id="main_category"
              label="Main Category"
              placeholder="Select a Category"
              options={availableCategories}
              onChange={setSelectedCategoryId}
              required={true}
            />

            <div>
              <label className="text-grey-2 text-base leading-6 font-light">
                Select any other categories you sell (optional)
              </label>
              <div className="mt-5 flex gap-4 flex-wrap w-[98%]">
                {categories.length > 0 &&
                  categories?.map((cat: any) => {
                    if (cat.id !== selectedCategoryId)
                      return (
                        <div
                          key={cat.id}
                          onClick={() => handleCategorySelected(cat.id)}
                          className={`${
                            selectedCategoryIds.includes(cat.id)
                              ? "bg-black text-primary"
                              : "bg-grey-1 text-grey-2"
                          }  rounded-[100px] text-base leading-5 font-gosha px-6 py-2.5 cursor-pointer select-none`}
                        >
                          <h4>{cat.name}</h4>
                        </div>
                      );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10  bottom-0 left-5 right-5">
          <Button
            label="Save Changes"
            className="text-2xl w-full"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default SupplierDetailsDrawer;
