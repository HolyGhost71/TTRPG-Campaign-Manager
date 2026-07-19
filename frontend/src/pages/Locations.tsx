import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import { useParams } from "react-router-dom";
import SmallEntityCard from "../components/EntityCard/SmallEntityCard";

export default function Locations() {
  const [locationArray, setLocationArray] = useState<any[]>([]);
  const [sortType, setSortType] = useState("alphabetical");
  const [isBigCard, setIsBigCard] = useState(false);

  const campaignId = useParams().campaignId;

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/entities?type=LOCATION`)
      .then((response) => {
        const sortedLocations = [...response.data].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setLocationArray(sortedLocations);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [campaignId]);

  const changeSort = (type: string) => {
    setSortType(type);

    if (type === "alphabetical") {
      setLocationArray(
        [...locationArray].sort((a, b) => a.name.localeCompare(b.name)),
      );
    }
    if (type === "region") {
      setLocationArray(
        [...locationArray].sort((a, b) =>
          a.locationDetails.region.localeCompare(b.locationDetails.region),
        ),
      );
    }
    if (type === "population") {
      setLocationArray(
        [...locationArray].sort((a, b) =>
          a.locationDetails.population.localeCompare(
            b.locationDetails.population,
          ),
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
          <option value="location">Region</option>
          <option value="status">Population</option>
        </select>
        <div className="page-body">Toggle card info</div>
        <label style={{ marginLeft: 20, marginTop: 5, marginBottom: 0 }}>
          <input
            type="checkbox"
            checked={isBigCard}
            onChange={(e) => setIsBigCard(e.target.checked)}
          />
          Large Cards
        </label>
      </div>

      <div className="entity-grid">
        {locationArray.map((entity) =>
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
