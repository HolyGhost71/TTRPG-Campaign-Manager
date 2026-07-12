import { useEffect, useState } from "react";

import api from "../api/api";
import EntityCard from "../components/EntityCard/EntityCard";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useParams } from "react-router-dom";

export default function NPCs() {
  const [npcArray, setNpcArray] = useState<any[]>([]);
  const [sortType, setSortType] = useState("alphabetical");

  useEffect(() => {
    api
      .get(`/campaigns/${useParams().campaignId}/entities?type=NPC`)
      .then((response) => {
        setNpcArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">NPCs</div>

      <div className="entity-grid">
        {npcArray.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </>
  );
}
