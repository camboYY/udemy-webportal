import React from "react";

export default function ProductReview({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  return (
    <div>
      ProductReview {params.productId} {params.reviewId}
    </div>
  );
}
