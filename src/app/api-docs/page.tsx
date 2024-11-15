"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/docs")
      .then((response) => response.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return <div>Loading...</div>;
  }

  // Render Swagger UI only in development
  if (process.env.NODE_ENV !== "development") {
    return <div>Swagger UI is only available in development mode.</div>;
  }

  return <SwaggerUI spec={spec} />;
}
