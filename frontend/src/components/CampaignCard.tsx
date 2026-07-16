import "../components/EntityCard/EntityCard.css";
import { useNavigate, useParams } from "react-router-dom";

const CampaignCard = (props: any) => {
  const API_URL = "http://localhost:3000";

  const campaign = props.campaign;
  const campaignID = props.campaignID;
  const navigate = useNavigate();

  return (
    <div
      className="entity-card"
      onClick={() => navigate(`/campaigns/${campaignID}/dashboard`)}
    >
      <div className="entity-header">
        <div className="entity-image">
          <img
            src={
              campaign.image
                ? `${API_URL}/${campaign.image}`
                : "https://placehold.co/120x120?text=Placeholder"
            }
            alt={campaign.name}
          />
        </div>

        <div className="entity-title">
          <h2>{campaign.name}</h2>
        </div>
      </div>

      <div className="entity-description">
        {campaign.description || "No description available."}
      </div>
    </div>
  );
};

export default CampaignCard;
