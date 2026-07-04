import { useEffect, useState } from "react";
import api from "../api/api";
import { BiFontSize } from "react-icons/bi";

type NPC = {
  id: number;
  name: string;
  location: string;
};

export default function NPCs() {
  const [npcArray, setNpcArray] = useState<NPC[]>([]);

  useEffect(() => {
    api
      .get("/campaigns/1/entities?type=NPC")
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
      {npcArray.map((npc) => (
        <h1 key={npc.id}>{npc.name}</h1>
      ))}
    </>
  );
}
