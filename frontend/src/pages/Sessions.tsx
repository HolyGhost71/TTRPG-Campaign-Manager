import { useEffect, useState } from "react";

import api from "../api/api";
import { useParams } from "react-router-dom";

export default function Sessions() {
  const [sessionsArray, setSessionsArray] = useState<any[]>([]);

  const campaignId = useParams().campaignId;

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=SESSIOM`)
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
