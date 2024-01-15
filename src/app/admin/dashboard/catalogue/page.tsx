/** @format */
"use server";

import { handleGetCatalogue } from "./api";
import CatalogueOverview from "./components/CatalogueOverview";
import { getStatusByTab } from "./util";

const Catalogue = async ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
    page?: string;
    query?: string;
  };
}) => {
  const activeTab = searchParams?.tab || "pending-approval";
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  const status = getStatusByTab(activeTab);

  const catalogues = await handleGetCatalogue(currentPage, query, status);

  return (
    <CatalogueOverview
      activeTab={activeTab}
      pageSize={7}
      catalogues={catalogues}
    />
  );
};

export default Catalogue;
