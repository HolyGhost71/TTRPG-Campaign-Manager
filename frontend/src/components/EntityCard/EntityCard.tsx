import api from "../../api/api";
import "./EntityCard.css";
import { useNavigate, useParams } from "react-router-dom";

const EntityCard = (props: any) => {
  const entity = props.entity;

  const navigate = useNavigate();

  const campaignID = useParams().campaignId;

  const renderTypeSpecificInfo = () => {
    switch (entity.type) {
      case "NPC":
        return (
          <>
            <div className="info-row">
              <span className="label">Species</span>
              <span>{entity.npcDetails?.species ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Location</span>
              <span>{entity.npcDetails?.location ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Age</span>
              <span>{entity.npcDetails?.age ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Status</span>
              <span>{entity.npcDetails?.status ?? "Unknown"}</span>
            </div>
          </>
        );

      case "LOCATION":
        return (
          <>
            <div className="info-row">
              <span className="label">Region</span>
              <span>{entity.locationDetails?.region ?? "Unknown"}</span>
            </div>
            <div className="info-row">
              <span className="label">Ruler</span>
              <span>{entity.locationDetails?.ruler ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Population</span>
              <span>{entity.locationDetails?.population ?? "Unknown"}</span>
            </div>
          </>
        );

      case "ITEM":
        return (
          <>
            <div className="info-row">
              <span className="label">Owner</span>
              <span>{entity.itemDetails?.owner ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Rarity</span>
              <span>{entity.itemDetails?.rarity ?? "Unknown"}</span>
            </div>
          </>
        );

      case "FACTION":
        return (
          <>
            <div className="info-row">
              <span className="label">Leader</span>
              <span>{entity.factionDetails?.leader ?? "Unknown"}</span>
            </div>
          </>
        );

      case "PLAYER":
        return (
          <>
            <div className="info-row">
              <span className="label">Player</span>
              <span>{entity.playerDetails?.player ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Species</span>
              <span>{entity.playerDetails?.species ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Age</span>
              <span>{entity.playerDetails?.age ?? "Unknown"}</span>
            </div>

            <div className="info-row">
              <span className="label">Status</span>
              <span>{entity.playerDetails?.status ?? "Unknown"}</span>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="entity-card"
      onClick={() => navigate(`/campaigns/${campaignID}/entities/${entity.id}`)}
    >
      <div className="entity-header">
        <div className="entity-image">
          <img
            src={
              entity.image
                ? `${api}/${entity.image}`
                : "https://placehold.co/120x120?text=Placeholder"
            }
            alt={entity.name}
          />
        </div>

        <div className="entity-title">
          <h2>{entity.name}</h2>
        </div>
      </div>

      {!entity.playerDetails && (
        <div className="entity-description">
          {entity.description || "No description available."}
        </div>
      )}

      <div className="entity-info">{renderTypeSpecificInfo()}</div>
    </div>
  );
};

export default EntityCard;
