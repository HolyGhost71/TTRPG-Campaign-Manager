import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams } from "react-router-dom";

export default function PCs() {
  const [pcArray, setPcArray] = useState<any[]>([]);

  useEffect(() => {
    api
      .get(`/campaigns/${useParams().campaignId}/entities?type=PLAYER`)
      .then((response) => {
        setPcArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">PCs</div>
      <div className="entity-grid">
        {pcArray.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </>
  );
}
