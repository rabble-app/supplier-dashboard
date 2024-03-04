/** @format */

export const nwroUsersGraphConfig = {
  xField: "week",
  yField: "value",
  smooth: false,
  height: 400,
  xAxis: {
    range: [0, 1],
  },
  yAxis: {
    range: [0, 1],
  },
  areaStyle: {
    fill: "l(270) 0:#ffffff 0.5:#D6F318 1:#D6F318",
    stroke: "transparent",
    size: 0.3,
  },
  animate: true,
  line: {
    color: "#9db401",
    size: 0.3,
    state: {
      active: {
        style: {
          color: "#9db401",
          lineWidth: 0.3,
        },
      },
    },
  },
  point: {
    shape: "circle",
    size: 4,
    style: {
      stroke: "#d0d5dd",
      fill: "#334054",
    },

    state: {
      active: {
        style: {
          stroke: "#d0d5dd",
          fill: "#334054",
        },
      },
    },
  },
  interactions: [
    { type: "element-active" },
    { type: "element-highlight-by-x" },
  ],
};

export const usersGraphConfig = {
  isGroup: true,
  xField: "username",
  animate: true,
  yField: "value",
  seriesField: "name",
  color: ["#FFD11A", "#027A48", "#18AEF9"],
  marginRatio: 0,
  interactions: [{ type: "element-highlight", enable: false }],
  tooltip: {
    shared: false,
    customContent: (title: any, items: any) => {
      return (
        <div className="p-2">
          <p className="text-xs text-grey-5">{title}</p>
          {items.map((item: any) => {
            if (item.name === "Shares per app") {
              return (
                <h3 key={item.name} className="text-grey-6 text-sm font-medium">
                  120 shares
                </h3>
              );
            } else if (item.name === "Shares per supplier") {
              return (
                <>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">
                      Supplier 01
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">
                      Supplier 02
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">
                      Supplier 03
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">
                      Supplier 04
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                </>
              );
            }
            return (
              <>
                <div className="flex gap-1.5 items-center">
                  <h3 className="text-grey-6 text-sm font-medium">
                    Product 01
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                  <p className="text-grey-5 text-xs">50</p>
                </div>
                <div className="flex gap-1.5 items-center">
                  <h3 className="text-grey-6 text-sm font-medium">
                    Product 02
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                  <p className="text-grey-5 text-xs">50</p>
                </div>
                <div className="flex gap-1.5 items-center">
                  <h3 className="text-grey-6 text-sm font-medium">
                    Product 03
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                  <p className="text-grey-5 text-xs">50</p>
                </div>
                <div className="flex gap-1.5 items-center">
                  <h3 className="text-grey-6 text-sm font-medium">
                    Product 04
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                  <p className="text-grey-5 text-xs">50</p>
                </div>
              </>
            );
          })}
        </div>
      );
    },
  },
};

const currentYear = new Date().getFullYear();

export const yearsTab = [
  { label: "1 Year", value: currentYear },
  { label: "2 Years", value: currentYear - 1 },
  { label: "3 Years", value: currentYear - 2 },
  { label: "4 Years", value: currentYear - 3 },
];

export const data1 = [
  {
    week: "1",
    value: 3.8,
  },
  {
    week: "2",
    value: 2,
  },
  {
    week: "3",
    value: 5.1,
  },
  {
    week: "4",
    value: 5.9,
  },
  {
    week: "5",
    value: 4.9,
  },
  {
    week: "6",
    value: 4.5,
  },
  {
    week: "7",
    value: 7.2,
  },
];

export const data2 = [
  { name: "Shares per app", username: "Username 1", value: 331.68 },
  { name: "Shares per app", username: "Username2", value: 547.61 },
  { name: "Shares per app", username: "Username 3", value: 403.37 },
  { name: "Shares per app", username: "Username 4", value: 631.8 },
  { name: "Shares per app", username: "Username 5", value: 761.63 },
  { name: "Shares per app", username: "Username 6", value: 182.65 },
  { name: "Shares per app", username: "Username 7", value: 132.62 },
  { name: "Shares per supplier", username: "Username 1", value: 649.56 },
  { name: "Shares per supplier", username: "Username2", value: 388.69 },
  { name: "Shares per supplier", username: "Username 3", value: 701.0 },
  { name: "Shares per supplier", username: "Username 4", value: 686.52 },
  { name: "Shares per supplier", username: "Username 5", value: 362.47 },
  { name: "Shares per supplier", username: "Username 6", value: 500.5 },
  { name: "Shares per supplier", username: "Username 7", value: 397.04 },
  { name: "Shares per product", username: "Username 1", value: 543.58 },
  { name: "Shares per product", username: "Username2", value: 434.74 },
  { name: "Shares per product", username: "Username 3", value: 573.21 },
  { name: "Shares per product", username: "Username 4", value: 971.57 },
  { name: "Shares per product", username: "Username 5", value: 159.62 },
  { name: "Shares per product", username: "Username 6", value: 140.98 },
  { name: "Shares per product", username: "Username 7", value: 564.92 },
];
