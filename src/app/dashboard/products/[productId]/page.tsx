import React from "react";

export default function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  return <div>Product Detail {params.productId}</div>;
}
