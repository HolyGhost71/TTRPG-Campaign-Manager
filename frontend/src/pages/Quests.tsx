import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import SmallEntityCard from "../components/EntityCard/SmallEntityCard";

export default function Quests() {
  const [questArray, setQuestArray] = useState<any[]>([]);

  const campaignId = useParams().campaignId;

  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=QUEST`)
      .then((response) => {
        const sortedQuests = [...response.data].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setQuestArray(sortedQuests);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [campaignId]);

  return (
    <>
      <div className="page-heading">Quest Log</div>

      {loading ? (
        <div className="popup">
          Fetching Quests from server<span className="dots"></span>
        </div>
      ) : questArray.length === 0 ? (
        <div className="popup">No Quests found!.</div>
      ) : (
        <>
          <div className="page-subheading" style={{ marginBottom: -20 }}>
            In progress
          </div>
          <div className="entity-grid">
            {questArray.map(
              (entity) =>
                entity.questDetails.status === "In progress" && (
                  <SmallEntityCard key={entity.id} entity={entity} />
                ),
            )}
          </div>

          <div className="page-subheading" style={{ marginBottom: -20 }}>
            Completed
          </div>
          <div className="entity-grid">
            {questArray.map(
              (entity) =>
                entity.questDetails.status === "Completed" && (
                  <SmallEntityCard key={entity.id} entity={entity} />
                ),
            )}
          </div>
        </>
      )}
      <button
        className="creation-button"
        onClick={() => {
          navigator(`/campaigns/${campaignId}/create-entity`, {
            state: { type: "QUEST" },
          });
        }}
      >
        Create New Quest
      </button>
    </>
  );
}
