import { useEffect, useState } from "react";
import "./CampaignSelect.css";
import api from "../../api/api";
import CampaignCard from "../../components/CampaignCard";

export default function CampaignSelect() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    api
      .get(`/campaigns/`)
      .then((response: { data: any }) => {
        setCampaigns(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  return (
    <>
      <div className="cs-page-heading">Campaign Select</div>
      <div className="entity-list">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            campaignID={campaign.id}
          />
        ))}
      </div>
    </>
  );
}
