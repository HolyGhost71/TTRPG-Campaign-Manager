import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";

export default function NPCs() {
  const [npcArray, setNpcArray] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/campaigns/1/entities?type=NPC")
      .then((response) => {
        setNpcArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
