import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import SmallEntityCard from "../components/EntityCard/SmallEntityCard";

export default function Quests() {
  const [questArray, setQuestArray] = useState<any[]>([]);

  const campaignId = useParams().campaignId;

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
      });
  }, [campaignId]);

  return (
    <>
      <div className="page-heading">Quest Log</div>

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
  );
}
