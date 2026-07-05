import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";

export default function Items() {
  const [itemArray, setItemArray] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/campaigns/1/entities?type=ITEM")
      .then((response) => {
        setItemArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">Items</div>
      <div className="entity-grid">
        {itemArray.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </>
  );
}
