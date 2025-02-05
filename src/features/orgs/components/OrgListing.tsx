"use client";

import { BriefOrganization } from "@/lib/types";
import React, { useEffect, useState } from "react";
import OrgCard from "./OrgCard";
import { formatInternalUrl } from "@/lib/utils";

export default function OrgListing() {
  const [orgs, setOrgs] = useState<BriefOrganization[]>([]);

  useEffect(() => {
    const apiUrl = formatInternalUrl("/api/orgs");
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orgs!", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 content-center">
      {orgs.map((org, index) => (
        <OrgCard key={index} name={org.name} imgUrl={org.imgUrl} />
      ))}
    </div>
  );
}
