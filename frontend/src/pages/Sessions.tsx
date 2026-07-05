import { useEffect, useState } from "react";

import api from "../api/api";

export default function Sessions() {
  const [sessionsArray, setSessionsArray] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/campaigns/1/entities?type=Session")
      .then((response) => {
        setSessionsArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">Sessions</div>
    </>
  );
}
