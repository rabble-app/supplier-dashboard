/** @format */

export const categories = [
  { id: "41803e32-9e9d-4b34-aea8-7d968f2c9481", name: "Alcohol" },
  { id: "4ddcc7fc-2a98-4554-b063-ee67a95a3fae", name: "Bakery" },
  { id: "fd84e1d4-efe7-4002-83b8-4f64b2dd0225", name: "Coffee and Tea" },
  { id: "0e0d8e2c-57fe-4920-aff1-c5d85cd331f2", name: "Drinks" },
  { id: "959f4744-3144-4683-9505-c480d38cbd11", name: "Farm and Dairy" },
  { id: "8c185bca-14fb-4ab8-b14f-fb54f9045108", name: "Fish and Seafood" },
  { id: "20944a73-d4e0-41ce-9a87-29f90be6e3fb", name: "Fruits and Vegetables" },
  { id: "cc781471-51eb-4ce6-b1dc-72716b2382da", name: "General" },
  { id: "06b8af73-49e5-48ed-a39e-185bec8b6659", name: "Meat" },
  { id: "6da76c89-745e-4941-a766-b06d503da50e", name: "Speciality" },
  { id: "1e99a2c1-6c32-423b-b0f2-d609800f0ebb", name: "circuit16" },
  { id: "f1070beb-589f-47ea-8a9d-eaaf7fe5686f", name: "implementation6" },
  { id: "5411f7e3-450a-470d-a8eb-8d00804954f2", name: "installation24" },
  { id: "efa6fa1e-c334-4e8f-8ab1-0dd57ccc3f2f", name: "structure" },
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const times = [
  "0:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const commonAreas = [
  "Bromley - BR",
  "Croydon - CR",
  "Dartford - DA",
  "Enfield - EN",
  "Harlow - CM",
  "Harrow - HA",
];

export const regions = [
  {
    region: "West Midlands",
    areas: commonAreas,
  },
  {
    region: "East Midlands",
    areas: commonAreas,
  },
  {
    region: "East of England",
    areas: [
      ...commonAreas,
      "Doncaster - DN",
      "Grimsby - DN",
      "Hull - HU",
      "Leeds - LS",
      "Sheffield - S",
      "Wakefield - WF",
      "Wolverhampton - WV",
      "Worcester - WR",
      "Coventry - CV",
      "Derby - DE",
      "Leicester - LE",
      "Lincoln - LN",
    ],
  },
  {
    region: "London",
    areas: commonAreas,
  },
  {
    region: "North East",
    areas: commonAreas,
  },
  {
    region: "North West",
    areas:commonAreas,
  },
  {
    region: "South East",
    areas: commonAreas,
  },
  {
    region: "South West",
    areas: commonAreas,
  },
];