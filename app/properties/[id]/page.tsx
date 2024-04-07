"use client";

import { Property } from "@/types/properties.types";
import { fetchProperty } from "@/utils/requests";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    }

    if (!property) {
      fetchPropertyData();
    }
  }, [id, property]);

  return (
    <div>
      <h2>Get Property Page</h2>
    </div>
  );
}
