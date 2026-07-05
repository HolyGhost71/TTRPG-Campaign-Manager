import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";

export default function Factions() {
  const [factionArray, setFactionArray] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/campaigns/1/entities?type=FACTION")
      .then((response) => {
        setFactionArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">Factions</div>
      <div className="entity-grid">
        {factionArray.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </>
  );
}
