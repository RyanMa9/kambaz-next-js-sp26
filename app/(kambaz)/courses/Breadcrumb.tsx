"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  return (
    <span>
      {course?.name} &gt; {capitalize(pathname.split("/").pop())}
    </span>
  );
}
function capitalize(str: string | undefined) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
