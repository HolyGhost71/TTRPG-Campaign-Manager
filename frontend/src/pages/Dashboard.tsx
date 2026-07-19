import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    api
      .get(`/campaigns/${campaignId}/dashboard`)
      .then((response) => {
        setCampaign(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [campaignId]);

  return (
    <>
      <div className="page-heading">
        {campaign?.campaign.name || "My Campaign"}
      </div>
      <div className="page-subheading">{campaign?.campaign.description}</div>
      <div className="page-subheading">Stats</div>
      <div className="page-body">{`Number of Player Characters: ${campaign?.stats.pcs}`}</div>
      <div className="page-body">{`Number of NPCS: ${campaign?.stats.npcs}`}</div>
      <div className="page-body">{`Number of Locations: ${campaign?.stats.locations}`}</div>
      <div className="page-body">{`Number of Items: ${campaign?.stats.items}`}</div>
      <div className="page-body">{`Number of Quests: ${campaign?.stats.quests}`}</div>
      <div className="page-body">{`Number of Factions: ${campaign?.stats.factions}`}</div>
      <div className="page-body">Number of Sessions: 0</div>
    </>
  );
}
