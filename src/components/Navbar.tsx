/** @format */
"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import routes from "../navigation/routes";
import { useAppSelector } from "@/redux/store";
import useClickOutside from "@/hooks/useClickOutside";

const Navbar = () => {
  const pathname = usePathname();
  const authUser = useAppSelector((state) => state.authReducer);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const adminRoutes = ["/insights"];

  const url = authUser.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";

  useClickOutside(dropdownRef, () => {
    setToggleDropdown(false);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center bg-black text-grey-4 h-[77px]">
      <ul className="flex font-gosha text-2xl leading-7">
        {routes.map((link) => {
          if (authUser.role !== "ADMIN" && adminRoutes.includes(link.path)) {
            return null;
          }
          return (
            <Link
              key={link.path}
              href={`${url}${link.path}`}
            >
              <li
                className={`${
                  pathname.includes(url + link.path)
                    ? "bg-white-1 text-black font-bold"
                    : ""
                } px-10 py-[25px] border-0 border-r-[1px] border-grey-5 cursor-pointer capitalize`}
              >
                {link.title}
              </li>
            </Link>
          );
        })}
      </ul>
      <div
        className="flex justify-between items-center gap-4 pr-5 relative cursor-pointer select-none"
        ref={dropdownRef}
        onClick={() => setToggleDropdown((prev) => !prev)}
      >
        <div className="flex flex-col">
          <h2 className="text-primary font-gosha text-xl leading-6">
            {authUser?.businessName}
          </h2>
          <p className="text-primary-light-2 text-sm leading-6">
            {authUser?.businessEmail}
          </p>
        </div>
        <div className="rounded-[100px] w-16 h-12 bg-primary flex justify-center items-center cursor-pointer">
          {toggleDropdown ? (
            <Image
              src="/images/icons/arrow-up.svg"
              width={32}
              height={32}
              alt="arrow-up-icon"
            />
          ) : (
            <Image
              src="/images/icons/arrow-down.svg"
              width={32}
              height={32}
              alt="arrow-down-icon"
            />
          )}
        </div>
        {toggleDropdown && (
          <ul className="w-[295px] border-[1px] border-grey-4 absolute top-[66px] rounded-lg z-50 right-5 bg-white shadow-custom-2">
            <li className="text-base font-medium text-grey-5 px-4 flex items-center gap-2 cursor-pointer py-[18px]">
              <Image
                src="/images/icons/settings.svg"
                width={24}
                height={24}
                alt="settings-icon"
              />
              Settings
            </li>
            <hr className="border-0 border-t-[1px] border-grey-4" />
            <li
              className="text-base font-medium text-danger px-4 flex items-center gap-2 cursor-pointer py-[18px]"
              onClick={handleLogout}
            >
              <Image
                src="/images/icons/logout.svg"
                width={24}
                height={24}
                alt="logout-icon"
              />
              Logout
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
