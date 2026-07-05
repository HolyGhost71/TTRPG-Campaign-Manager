import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function CreateEntity() {
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

  const [type, setType] = useState("NPC");

  const navigator = useNavigate();

  const createEntity = async () => {
    const payload: any = {
      campaignId: 1,
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
      };
    }

    const res = await api.post("/entities", payload);
    const newEntity = res.data;

    navigator(`/campaigns/1/entities/${newEntity.id}`);
  };

  return (
    <div className="page-heading">
      Create New Entry
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
        <div className="creation-subheading">Entity Type</div>
        <select
          className="input-field"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="NPC">NPC</option>
          <option value="LOCATION">Location</option>
          <option value="ITEM">Item</option>
          <option value="FACTION">Faction</option>
          <option value="QUEST">Quest</option>
          <option value="PLAYER">Player Character</option>
        </select>
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
        </div>
      )}
      <button onClick={createEntity}>Create</button>
    </div>
  );
}
