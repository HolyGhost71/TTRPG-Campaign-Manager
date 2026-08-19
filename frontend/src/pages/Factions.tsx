import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams, useNavigate } from "react-router-dom";

export default function Factions() {
  const [factionArray, setFactionArray] = useState<any[]>([]);

  const campaignId = useParams().campaignId;

  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=FACTION`)
      .then((response) => {
        setFactionArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-heading">Factions</div>
      {loading ? (
        <div className="popup">
          Fetching Factions from server<span className="dots"></span>
        </div>
      ) : factionArray.length === 0 ? (
        <div className="popup">No Factions found!.</div>
      ) : (
        <div className="entity-grid">
          {factionArray.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>
      )}
      <button
        className="creation-button"
        onClick={() => {
          navigator(`/campaigns/${campaignId}/create-entity`, {
            state: { type: "FACTION" },
          });
        }}
      >
        Create New Faction
      </button>
    </>
  );
}
