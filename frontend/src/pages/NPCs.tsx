import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams } from "react-router-dom";

export default function NPCs() {
  const [npcArray, setNpcArray] = useState<any[]>([]);
  const [sortType, setSortType] = useState("alphabetical");

  const campaignId = useParams().campaignId;

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=NPC`)
      .then((response) => {
        setNpcArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [campaignId]);

  return (
    <>
      <div className="page-heading">NPCs</div>

      <div className="entity-grid">
        {npcArray.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </>
  );
}
