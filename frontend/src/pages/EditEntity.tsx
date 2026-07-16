import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEntity() {
  const [entity, setEntity] = useState<any>(null);

  useEffect(() => {
    api
      .get("/entities/" + params.entityId)
      .then((response) => {
        setEntity(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // All
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // NPC / PC
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("Alive");
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("");
  const [player, setPlayer] = useState("");

  // Location
  const [population, setPopulation] = useState(0);
  const [ruler, setRuler] = useState("");
  const [region, setRegion] = useState("");

  // Item
  const [owner, setOwner] = useState("");
  const [rarity, setRarity] = useState("");

  // Faction
  const [leader, setLeader] = useState("");

  // Quest
  const [questGiver, setQuestGiver] = useState("");
  const [questStatus, setQuestStatus] = useState("In progress");

  const [type] = useState("NPC");

  const navigator = useNavigate();
  const params = useParams();

  const editEntity = async () => {
    const payload: any = {
      campaignId: params.campaignId,
      type,
      name,
      description,
    };

    if (type === "NPC") {
      payload.npcDetails = {
        species,
        age,
        location,
        status,
      };
    } else if (type === "LOCATION") {
      payload.locationDetails = {
        population,
        ruler,
        region,
      };
    } else if (type === "ITEM") {
      payload.itemDetails = {
        owner,
        rarity,
      };
    } else if (type === "FACTION") {
      payload.factionDetails = {
        leader,
      };
    } else if (type === "PLAYER") {
      payload.playerDetails = {
        species,
        age,
        location,
        status,
        player,
      };
    } else if (type === "QUEST") {
      payload.questDetails = {
        questGiver,
        questStatus,
      };
    }

    await api.put(`/entities/${params.entityId}`, payload);

    navigator(`/campaigns/${params.campaignId}/entities/${params.entityId}`);
  };

  useEffect(() => {
    if (!entity) return;

    setName(entity.name ?? "");
    setDescription(entity.description ?? "");

    switch (entity.type) {
      case "NPC":
        setSpecies(entity.npcDetails?.species ?? "");
        setAge(entity.npcDetails?.age ?? "");
        setLocation(entity.npcDetails?.location ?? "");
        setStatus(entity.npcDetails?.status ?? "");
        break;

      case "PLAYER":
        setSpecies(entity.playerDetails?.species ?? "");
        setAge(entity.playerDetails?.age ?? "");
        setLocation(entity.playerDetails?.location ?? "");
        setStatus(entity.playerDetails?.status ?? "");
        setPlayer(entity.playerDetails?.player ?? "");
        break;

      case "LOCATION":
        setPopulation(entity.locationDetails?.population ?? 0);
        setRuler(entity.locationDetails?.ruler ?? "");
        setRegion(entity.locationDetails?.region ?? "");
        break;

      case "ITEM":
        setOwner(entity.itemDetails?.owner ?? "");
        setRarity(entity.itemDetails?.rarity ?? "");
        break;

      case "FACTION":
        setLeader(entity.factionDetails?.leader ?? "");
        break;

      case "QUEST":
        setQuestGiver(entity.questDetails?.questGiver ?? "");
        setQuestStatus(entity.questDetails?.questStatus ?? "In progress");
        break;
    }
  }, [entity]);

  return (
    <div className="page-heading">
      Edit Entity
      <div />
      <div className="creation-container">
        <div className="creation-subheading">Name</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <div className="creation-subheading">Description</div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
      </div>
      {type === "NPC" && (
        <div className="creation-container">
          <div className="creation-subheading">Species</div>
          <input
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Location</div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Age</div>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Status</div>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      {type === "PLAYER" && (
        <div className="creation-container">
          <div className="creation-subheading">Species</div>
          <input
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Location</div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Age</div>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Status</div>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Player Name</div>
          <input
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      {type === "LOCATION" && (
        <div className="creation-container">
          <div className="creation-subheading">Population</div>
          <input
            value={population}
            type="number"
            onChange={(e) => setPopulation(parseInt(e.target.value))}
            className="input-field"
          />
          <div className="creation-subheading">Ruler</div>
          <input
            value={ruler}
            onChange={(e) => setRuler(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Region</div>
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      {type === "ITEM" && (
        <div className="creation-container">
          <div className="creation-subheading">Owner</div>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Rarity</div>
          <input
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      {type === "FACTION" && (
        <div className="creation-container">
          <div className="creation-subheading">Leader</div>
          <input
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      {type === "QUEST" && (
        <div className="creation-container">
          <div className="creation-subheading">Quest Giver</div>
          <input
            value={questGiver}
            onChange={(e) => setQuestGiver(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Quest Status</div>
          <input
            value={questStatus}
            onChange={(e) => setQuestStatus(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      <button onClick={editEntity} className="button">
        Submit
      </button>
    </div>
  );
}
