/** @format */
"use client";

import Image from "next/image";
import React from "react";

interface ITeamDetailsHeading {
  title: string;
  subtitle: string;
  rightIcon?: React.ReactNode;
}

const TeamDetailsHeading = ({
  title,
  subtitle,
  rightIcon,
}: ITeamDetailsHeading) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="font-gosha text-xl font-bold text-black">{title}</h2>
        <div className="flex gap-1 items-center">
          <Image
            src="/images/icons/tag-right.svg"
            width={20}
            height={20}
            alt="tag-right"
          />
          <p className="text-grey-5 text-xs font-medium">{subtitle}</p>
        </div>
      </div>
      {rightIcon ? rightIcon : null}
    </div>
  );
};

export default TeamDetailsHeading;
