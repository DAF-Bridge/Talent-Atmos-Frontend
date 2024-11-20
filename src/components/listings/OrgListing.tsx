"use client";

import { Organization } from "@/lib/types";
import React from "react";
import { useEffect, useState } from "react";
import OrgCard from "../cards/OrgCard";

export default function OrgListing() {
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    fetch("/api/orgs")
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
