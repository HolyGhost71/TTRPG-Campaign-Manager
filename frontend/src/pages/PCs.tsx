import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams, useNavigate } from "react-router-dom";

export default function PCs() {
  const [pcArray, setPcArray] = useState<any[]>([]);

  const campaignId = useParams().campaignId;

  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=PLAYER`)
      .then((response) => {
        setPcArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-heading">PCs</div>
      {loading ? (
        <div className="popup">
          Fetching Player Characters from server<span className="dots"></span>
        </div>
      ) : pcArray.length === 0 ? (
        <div className="popup">No Player Characters found!.</div>
      ) : (
        <div className="entity-grid">
          {pcArray.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>
      )}
      <button
        className="creation-button"
        onClick={() => {
          navigator(`/campaigns/${campaignId}/create-entity`, {
            state: { type: "PLAYER" },
          });
        }}
      >
        Create New PC
      </button>
    </>
  );
}
