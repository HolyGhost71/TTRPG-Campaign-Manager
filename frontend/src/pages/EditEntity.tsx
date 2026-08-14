import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

interface EntityReference {
  id: number;
  name: string;
}

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

  const [locations, setLocations] = useState<EntityReference[]>([]);
  const [factions, setFactions] = useState<EntityReference[]>([]);

  const [locationId, setLocationId] = useState<number | "">("");
  const [factionId, setFactionId] = useState<number | "">("");

  const [species, setSpecies] = useState("");
  const [player, setPlayer] = useState("");

  // Location
  const [population, setPopulation] = useState("");
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

  const [image, setImage] = useState<File | null>(null); // New uploaded file
  const [imagePreview, setImagePreview] = useState(""); // Existing/new image URL

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const [type, setType] = useState("");

  const navigator = useNavigate();
  const params = useParams();

  const editEntity = async () => {
    try {
      const formData = new FormData();

      // Common fields
      formData.append("name", name);
      formData.append("description", description ?? "");

      // Image (only if a new one was selected)
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
            status,
            locationId: locationId === "" ? null : locationId,
            factionId: factionId === "" ? null : factionId,
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
            locationId: locationId === "" ? null : locationId,
            status,
            player,
          }),
        );
      } else if (type === "QUEST") {
        formData.append(
          "questDetails",
          JSON.stringify({
            questGiver,
            status: questStatus,
          }),
        );
      }

      const response = await api.put(`/entities/${params.entityId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Updated entity:", response.data);

      navigator(`/campaigns/${params.campaignId}/entities/${params.entityId}`);
    } catch (err: any) {
      console.error(err.response?.data || err.message);

      alert("Failed to update entity");
    }
  };

  useEffect(() => {
    if (!params.campaignId) return;

    api
      .get(`/campaigns/${params.campaignId}/entities?type=LOCATION`)
      .then((res) => setLocations(res.data));

    api
      .get(`/campaigns/${params.campaignId}/entities?type=FACTION`)
      .then((res) => setFactions(res.data));
  }, [params.campaignId]);

  useEffect(() => {
    if (!entity) return;

    setName(entity.name ?? "");
    setDescription(entity.description ?? "");
    setImagePreview(
      entity.image ?? "https://placehold.co/120x120?text=Placeholder",
    );
    setType(entity.type);

    switch (entity.type) {
      case "NPC":
        setSpecies(entity.npcDetails?.species ?? "");
        setAge(entity.npcDetails?.age ?? "");
        setStatus(entity.npcDetails?.status ?? "");

        setLocationId(entity.npcDetails?.locationId ?? "");
        setFactionId(entity.npcDetails?.factionId ?? "");

        break;

      case "PLAYER":
        setSpecies(entity.playerDetails?.species ?? "");
        setAge(entity.playerDetails?.age ?? "");
        setStatus(entity.playerDetails?.status ?? "");
        setPlayer(entity.playerDetails?.player ?? "");

        setLocationId(entity.playerDetails?.locationId ?? "");

        break;

      case "LOCATION":
        setPopulation(entity.locationDetails?.population ?? "");
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
        setQuestStatus(entity.questDetails?.status ?? "");
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
        {entity?.type != "PLAYER" && (
          <>
            <div className="creation-subheading">Description</div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
          </>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imagePreview && <img src={imagePreview} width={150} alt="Preview" />}
      </div>
      {entity?.type === "NPC" && (
        <div className="creation-container">
          <div className="creation-subheading">Species</div>
          <input
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Location</div>
          <select
            value={locationId}
            onChange={(e) =>
              setLocationId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input-field"
          >
            <option value="">Unknown</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <div className="creation-subheading">Faction</div>

          <select
            value={factionId}
            onChange={(e) =>
              setFactionId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input-field"
          >
            <option value="">None</option>

            {factions.map((faction) => (
              <option key={faction.id} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
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
          <select
            value={locationId}
            onChange={(e) =>
              setLocationId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input-field"
          >
            <option value="">Unknown</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
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
      {entity?.type === "LOCATION" && (
        <div className="creation-container">
          <div className="creation-subheading">Population</div>
          <input
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
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
      {entity?.type === "ITEM" && (
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
      {entity?.type === "FACTION" && (
        <div className="creation-container">
          <div className="creation-subheading">Leader</div>
          <input
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
            className="input-field"
          />
        </div>
      )}
      {entity?.type === "QUEST" && (
        <div className="creation-container">
          <div className="creation-subheading">Quest Giver</div>
          <input
            value={questGiver}
            onChange={(e) => setQuestGiver(e.target.value)}
            className="input-field"
          />
          <div className="creation-subheading">Quest Status</div>
          <select
            className="input-field"
            value={questStatus}
            onChange={(e) => setQuestStatus(e.target.value)}
          >
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      )}
      <button onClick={editEntity} className="button">
        Submit
      </button>
    </div>
  );
}
