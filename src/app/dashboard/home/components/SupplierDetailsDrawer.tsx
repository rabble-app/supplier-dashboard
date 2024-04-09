/** @format */

"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Drawer, Spin, message } from "antd";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import PhoneNumberInput from "@/components/PhoneInput";
import Select from "@/components/Select";
import "react-phone-number-input/style.css";
import { handleUploadProducerImage } from "../api";
import EditIcon from "@/components/svgs/EditIcon";

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
  isFetchingCategories: boolean;
  producerData: any;
  categoriesData: any;
  updateProducer: (fieldName: string, value: string | number) => void;
  updateCategories: (
    type: "add" | "remove",
    categories?: string[],
    id?: string
  ) => void;
}

const SupplierDetailsDrawer = ({
  open,
  setOpen,
  isFetchingCategories,
  producerData,
  categoriesData: categories,
  updateProducer,
  updateCategories,
}: ISupplierDetailsDrawer) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    businessAddress: "",
    phone: "",
    website: "",
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const updateProducerImage = async (file: File) => {
    const loadingKey = "uploading logo";
    message.loading({
      content: "Uploading producer logo...",
      key: loadingKey,
    });

    try {
      const res = await handleUploadProducerImage(producerData?.id, file);

      if (res.statusCode === 400 || res.statusCode === 500) {
        throw new Error(JSON.stringify(res));
      } else {
        console.log("res", res);
        message.success("Producer logo updated successfully");
        setImage(res?.Location);
        await queryClient.refetchQueries({ queryKey: ["current-producer"] });
      }
    } catch (error) {
      message.error("Error uploading producer logo");
      setError("Error uploading producer logo !");
    } finally {
      message.destroy(loadingKey);
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length) {
      setError("");
      setLoading(true);

      await updateProducerImage(files[0]);
    }
  };

  const onButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
    }

    inputFile.current?.click();
  };

  useEffect(() => {
    if (producerData) {
      setFormData({
        businessName: producerData.businessName || "",
        description: producerData.description || "",
        businessAddress: producerData.businessAddress || "",
        phone: producerData.user?.phone || "",
        website: producerData.website || "",
      });

      setSelectedCategoryId(producerData.categories?.[0]?.category?.id);
      setSelectedCategoryIds(
        producerData.categories
          ?.map((cat: any) => cat.category.id)
          .filter(
            (catId: any) => catId !== producerData.categories?.[0]?.category?.id
          ) || []
      );
      setImage(producerData?.imageUrl);
    }
    // eslint-disable-next-line
  }, [producerData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClose = () => {
    setOpen(false);
  };

  const availableCategories: any =
    categories?.filter((cat: any) => !selectedCategoryIds.includes(cat.id)) ||
    [];

  const handleCategorySelected = (id: string) => {
    setSelectedCategoryIds((prevIds) => {
      let data;
      if (prevIds.includes(id)) {
        const _id = producerData.categories?.find(
          (cat: any) => cat.category.id === id
        )?.id;
        data = prevIds.filter((prevId) => prevId !== id);
        updateCategories("remove", undefined, _id);
      } else {
        data = [...prevIds, id];
        updateCategories("add", [selectedCategoryId, ...data]);
      }
      return data;
    });
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
          <div
            className="bg-grey-1 rounded-lg flex flex-col h-[180px] w-[610px] justify-center items-center cursor-pointer py-[30px] relative group z-[1px] overflow-hidden"
            onClick={() =>
              !error || image || producerData?.imageUrl ? onButtonClick() : null
            }
          >
            {image || producerData?.imageUrl ? (
              <>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 hidden group-hover:block z-10"></div>
                <EditIcon
                  className={`hidden group-hover:block absolute left-[48%] top-[45%] text-white z-10`}
                  color="#ffffff"
                  size={7}
                />
                <Image
                  src={image || producerData?.imageUrl}
                  width={610}
                  height={180}
                  className="absolute w-[610px] h-[180px] object-cover rounded-lg"
                  alt="no-image"
                />
              </>
            ) : (
              <>
                <Image
                  src={"/images/icons/picture-rectangle.svg"}
                  width={96}
                  height={96}
                  alt="no-image"
                />
                {!loading && (
                  <p
                    className={`${
                      error ? "text-danger font-medium" : "text-grey-2"
                    } text-sm `}
                  >
                    {error ? (
                      <p>
                        {error}
                        <span
                          className="text-blue-1 cursor-pointer"
                          onClick={onButtonClick}
                        >
                          &nbsp;Try again
                        </span>
                      </p>
                    ) : (
                      "Upload supplier logo"
                    )}
                  </p>
                )}
                {loading && (
                  <span className="text-lg">
                    <Spin /> Uploading supplier logo, please wait...
                  </span>
                )}
              </>
            )}
          </div>
          <input
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            ref={inputFile}
            onChange={handleFileUpload}
            type="file"
          />
          {loading && producerData?.imageUrl && (
            <span className="text-lg">
              <Spin className="custom-spin" /> Updating supplier logo, please
              wait...
            </span>
          )}
          {error && producerData?.imageUrl && (
            <span className="text-lg text-danger">
              Error updating producer logo !
              <span
                className="text-blue-1 cursor-pointer"
                onClick={onButtonClick}
              >
                &nbsp;Try again
              </span>
            </span>
          )}

          <Input
            label="Business Name"
            id="bus_name"
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            onBlur={() => updateProducer("businessName", formData.businessName)}
          />

          <div className="flex flex-col">
            <label
              className="text-grey-2 leading-6 text-base font-medium mb-1"
              htmlFor="bus_desc"
            >
              Short Business Description
            </label>
            <textarea
              className="bg-grey-1 rounded-lg leading-[30px] p-[25px] text-xl focus:outline-primary-light-1 text-grey-6 font-normal"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={() => updateProducer("description", formData.description)}
            />
          </div>

          <Input
            label="Business Address"
            id="bus_address"
            type="text"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            onBlur={() =>
              updateProducer("businessAddress", formData.businessAddress)
            }
          />

          <div className="flex flex-col">
            <label className="text-grey-2 leading-6 text-base font-medium mb-1">
              Business Phone Number
            </label>
            <PhoneNumberInput
              name="phone"
              required={true}
              value={`+44${formData.phone}`}
              disabled
            />
          </div>

          <Input
            label="Website"
            id="website"
            type="text"
            name="website"
            value={formData?.website}
            onChange={handleChange}
            onBlur={() => updateProducer("website", formData.website)}
          />
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
              value={selectedCategoryId}
              onChange={setSelectedCategoryId}
              onBlur={() => {
                if (
                  producerData.categories?.[0]?.category?.id !==
                  selectedCategoryId
                ) {
                  updateCategories(
                    "remove",
                    undefined,
                    producerData.categories?.[0]?.id
                  );
                  updateCategories("add", [
                    selectedCategoryId,
                    ...selectedCategoryIds,
                  ]);
                }
              }}
              required={true}
            />

            <div>
              <label className="text-grey-2 text-base leading-6 font-light">
                Select any other categories you sell (optional)
              </label>
              <div className="mt-5 flex gap-4 flex-wrap w-[98%]">
                {isFetchingCategories && (
                  <span className="text-lg">
                    <Spin className="custom-spin mr-1" /> Loading categories...
                  </span>
                )}
                {categories?.length > 0 &&
                  !isFetchingCategories &&
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
            label="Done"
            className="text-2xl w-full"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default SupplierDetailsDrawer;
