import "../components/EntityCard/EntityCard.css";
import { useNavigate } from "react-router-dom";

const CampaignCard = (props: any) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const campaign = props.campaign;
  const campaignID = props.campaignID;
  const navigate = useNavigate();

  return (
    <div
      className="campaign-card"
      onClick={() => navigate(`/campaigns/${campaignID}/dashboard`)}
    >
      <div className="entity-header">
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
