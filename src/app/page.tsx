"use client";

import { useState } from "react";
import { Search } from "@/components/Search";
import { Grid } from "@/components/Product/Grid";
import { useProductsQuery } from "@/hooks/useProductsQuery";

export default function Home() {
  const [term, setTerm] = useState("");
  const { data, isLoading, error } = useProductsQuery(term);

  const getStatusText = () => {
    if (isLoading) return "SEARCHING...";
    if (error) return "FAILED TO LOAD PRODUCTS";
    return `${data?.length ?? 0} RESULTS`;
  };

  return (
    <div className="o-container o-section">
      <Search value={term} onChange={setTerm} />
      <div className="c-status">
        <p>{getStatusText()}</p>
      </div>
      <Grid products={data} isLoading={isLoading} error={error} />
    </div>
  );
}
