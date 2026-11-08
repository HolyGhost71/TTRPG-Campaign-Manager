import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./Lore.css";

export interface LorePage {
  id: number;
  campaignId: number;
  title: string;
  content: string;
  image: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function Lore() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [lorePages, setLorePages] = useState<LorePage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!campaignId) return;

    setLoading(true);

    api
      .get(`/campaigns/${campaignId}/lore`)
      .then((response) => {
        setLorePages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch lore pages:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [campaignId]);

  return (
    <div className="layout-content lore-container">
      <h1>History & Lore</h1>

      <div className="lore-grid">
        {loading ? (
          <p>Loading lore pages...</p>
        ) : lorePages.length === 0 ? (
          <p>No lore pages have been created yet.</p>
        ) : (
          lorePages.map((page) => (
            <div
              key={page.id}
              className="lore-card"
              onClick={() =>
                navigate(`/campaigns/${campaignId}/lore/${page.id}`)
              }
            >
              <h2>{page.title}</h2>
              <p>
                {page.content
                  ? page.content.replace(/[#*`]/g, "").slice(0, 120) + "..."
                  : "No information added yet."}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
