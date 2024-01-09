/** @format */
"use server";

import CatalogueOverview from "./components/CatalogueOverview";

const Catalogue = async ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
  };
}) => {
  const activeTab = searchParams?.tab || "pending-approval";

  return <CatalogueOverview activeTab={activeTab} />;
};

export default Catalogue;
