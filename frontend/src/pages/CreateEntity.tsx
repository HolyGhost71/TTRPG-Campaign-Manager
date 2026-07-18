import { useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

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
  const [questStatus, setQuestStatus] = useState("In progress");

  const [type, setType] = useState("NPC");

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0]);
    }
  };

  const navigator = useNavigate();
  const campaignId = useParams().campaignId;

  const createEntity = async () => {
    try {
      const formData = new FormData();

      // Common fields
      formData.append("campaignId", String(campaignId) ?? "");
      formData.append("type", type);
      formData.append("name", name);
      formData.append("description", description ?? "");

      // Image
      if (image) {
        formData.append("image", image);
      }

      // Type-specific details
      if (type === "NPC") {
        formData.append(
          "npcDetails",
          JSON.stringify({
            species,
            age,
            location,
            status,
          }),
        );
      } else if (type === "LOCATION") {
        formData.append(
          "locationDetails",
          JSON.stringify({
            population,
            ruler,
            region,
          }),
        );
      } else if (type === "ITEM") {
        formData.append(
          "itemDetails",
          JSON.stringify({
            owner,
            rarity,
          }),
        );
      } else if (type === "FACTION") {
        formData.append(
          "factionDetails",
          JSON.stringify({
            leader,
          }),
        );
      } else if (type === "PLAYER") {
        formData.append(
          "playerDetails",
          JSON.stringify({
            species,
            age,
            location,
            status,
            player,
          }),
        );
      } else if (type === "QUEST") {
        formData.append(
          "questDetails",
          JSON.stringify({
            questGiver,
            questStatus,
          }),
        );
      }

      // Send request
      const res = await api.post("/entities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newEntity = res.data;
      console.log(newEntity);

      // Redirect to the new entity page
      navigator(`/campaigns/${campaignId}/entities/${newEntity.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create entity");
    }
  };

  return (
    <div className="page-heading">
      Create New Entity
      <div />
      <div className="creation-container">
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
        <div className="creation-subheading">Name</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <div className="creation-subheading">Description</div>
        {type != "PLAYER" && (
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {image && <img src={URL.createObjectURL(image)} width={150} />}
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
      <button onClick={createEntity} className="button">
        Create
      </button>
    </div>
  );
}
