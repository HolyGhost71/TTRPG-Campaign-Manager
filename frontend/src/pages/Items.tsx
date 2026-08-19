import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams, useNavigate } from "react-router-dom";

export default function Items() {
  const [itemArray, setItemArray] = useState<any[]>([]);

  const campaignId = useParams().campaignId;

  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=ITEM`)
      .then((response) => {
        setItemArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-heading">Items</div>
      {loading ? (
        <div className="popup">
          Fetching Items from server<span className="dots"></span>
        </div>
      ) : itemArray.length === 0 ? (
        <div className="popup">No Items found!.</div>
      ) : (
        <div className="entity-grid">
          {itemArray.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>
      )}
      <button
        className="creation-button"
        onClick={() => {
          navigator(`/campaigns/${campaignId}/create-entity`, {
            state: { type: "ITEM" },
          });
        }}
      >
        Create New Item
      </button>
    </>
  );
}
