import { useEffect, useState } from "react";
import "./CampaignSelect.css";
import api from "../../api/api";
import CampaignCard from "../../components/CampaignCard";

export default function CampaignSelect() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/campaigns")
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  return (
    <>
      <div className="cs-page-heading">Campaign Select</div>

      {loading ? (
        <div className="popup">
          Fetching campaigns from server<span className="dots"></span>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="popup">No campaigns found.</div>
      ) : (
        campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))
      )}
    </>
  );
}
