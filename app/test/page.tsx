"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function TestPage() {
  const searchParams = useParams();
  const param = searchParams.get("param"); // 'shshsh'

  return <div>Param is: {param}</div>;
}
