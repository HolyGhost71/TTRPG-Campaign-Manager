import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import EntityCard from "../components/EntityCard/EntityCard";
import "../App.css";
import EditableNotes from "../components/EditableNotes";

export default function SoloEntity() {
  const { entityId } = useParams();
  const [entity, setEntity] = useState<any>();
  console.log("Opened entity page for entity" + entityId);
  console.log(entity);

  let navigate = useNavigate();

  const params = useParams();

  const goToEditPage = () => {
    let path = `/campaigns/${params.campaignId}/edit-entity/${params.entityId}`;
    navigate(path);
  };

  useEffect(() => {
    api
      .get("/entities/" + entityId)
      .then((response) => {
        setEntity(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveNotes = async (newNotes: string, noteType: "DM" | "PLAYER") => {
    const updatedEntity = {
      ...entity,
      dmNotes: noteType === "DM" ? newNotes : entity.dmNotes,
      playerNotes: noteType === "PLAYER" ? newNotes : entity.playerNotes,
    };

    const formData = new FormData();

    Object.entries(updatedEntity).forEach(([key, value]) => {
      if (value == null) return;

      if (typeof value === "object" && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    await api.put(`/entities/${entity.id}`, formData);
  };

  return (
    <div className="solo-entity-page">
      <div className="page-heading">{entity?.name}</div>

      <div className="entity-card-wrapper">
        <EntityCard entity={entity ?? {}} />
        <button onClick={goToEditPage} className="button">
          Edit
        </button>
      </div>

      <div className="page-subheading">DM Notes</div>
      <EditableNotes
        initialValue={entity?.dmNotes}
        onSave={(value) => saveNotes(value, "DM")}
      />

      <div className="page-subheading">Player Notes</div>
      <EditableNotes
        initialValue={entity?.playerNotes}
        onSave={(value) => saveNotes(value, "PLAYER")}
      />
    </div>
  );
}
