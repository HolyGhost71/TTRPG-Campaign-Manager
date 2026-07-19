import "./SmallEntityCard.css";
import { useNavigate, useParams } from "react-router-dom";

const SmallEntityCard = (props: any) => {
  const entity = props.entity;

  const navigate = useNavigate();
  const campaignID = useParams().campaignId;

  return (
    <div
      className="entity-card"
      onClick={() => navigate(`/campaigns/${campaignID}/entities/${entity.id}`)}
    >
      <div className="entity-header">
        <div className="entity-image">
          {entity.image ? (
            <img
              src={entity.image}
              alt={entity.name}
              className="entity-image"
            />
          ) : (
            <img
              src="https://placehold.co/120x120?text=Placeholder"
              alt="No image"
              className="entity-image"
            />
          )}
        </div>
        <div>
          <div className="entity-title">
            <h2>{entity.name}</h2>
          </div>
          {!entity.playerDetails && (
            <div className="entity-description">
              {entity.description || "No description available."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallEntityCard;
