import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";

export default function Locations() {
  const [locationArray, setLocationArray] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/campaigns/1/entities?type=LOCATION")
      .then((response) => {
        setLocationArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">Locations</div>
      <div className="entity-grid">
        {locationArray.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </>
  );
}
