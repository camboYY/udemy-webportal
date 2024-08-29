import React from "react";

export default function Docs({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      Our docs page {params.slug?.length > 0 ? params.slug[0] : "hello"}
    </div>
  );
}
