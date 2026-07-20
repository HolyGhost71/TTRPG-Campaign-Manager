import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams } from "react-router-dom";
import SmallEntityCard from "../components/EntityCard/SmallEntityCard";

export default function NPCs() {
  const [npcArray, setNpcArray] = useState<any[]>([]);
  const [sortType, setSortType] = useState("alphabetical");
  const [isBigCard, setIsBigCard] = useState(false);

  const campaignId = useParams().campaignId;

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=NPC`)
      .then((response) => {
        const sortedNPCs = [...response.data].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setNpcArray(sortedNPCs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [campaignId]);

  const changeSort = (type: string) => {
    setSortType(type);

    if (type === "alphabetical") {
      setNpcArray([...npcArray].sort((a, b) => a.name.localeCompare(b.name)));
    }
    if (type === "location") {
      setNpcArray(
        [...npcArray].sort((a, b) =>
          a.npcDetails.location.localeCompare(b.npcDetails.location),
        ),
      );
    }
    if (type === "status") {
      setNpcArray(
        [...npcArray].sort((a, b) =>
          a.npcDetails.status.localeCompare(b.npcDetails.status),
        ),
      );
    }
  };

  return (
    <>
      <div className="page-heading">NPCs</div>
      <div>
        <div className="page-body">Sort by</div>
        <select
          style={{ marginLeft: 20, marginTop: 5, marginBottom: 0 }}
          value={sortType}
          onChange={(e) => changeSort(e.target.value)}
        >
          <option value="alphabetical">A-Z</option>
          <option value="location">Location</option>
          <option value="status">Status</option>
        </select>
        <div className="page-body">Toggle card info</div>
        <label style={{ marginLeft: 20, marginTop: 5, marginBottom: 0 }}>
          <input
            type="checkbox"
            checked={isBigCard}
            onChange={(e) => setIsBigCard(e.target.checked)}
          />
        </label>
      </div>

      <div className="entity-grid">
        {npcArray.map((entity) =>
          isBigCard ? (
            <EntityCard key={entity.id} entity={entity} />
          ) : (
            <SmallEntityCard key={entity.id} entity={entity} />
          ),
        )}
      </div>
    </>
  );
}
