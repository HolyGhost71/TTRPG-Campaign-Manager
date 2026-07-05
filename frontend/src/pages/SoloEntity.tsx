import { useParams } from "react-router-dom";
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

  const saveNotes = async (newNotes: any, noteType: string) => {
    let updatedEntity;

    if (noteType == "DM") {
      updatedEntity = {
        ...entity,
        dmNotes: newNotes,
      };
    } else if (noteType == "PLAYER") {
      updatedEntity = {
        ...entity,
        playerNotes: newNotes,
      };
    }

    console.log("Updating entity. New entity: ");
    console.log(updatedEntity);

    await api.put(`/entities/${entity.id}`, updatedEntity);
  };

  return (
    <div className="solo-entity-page">
      <div className="page-content">
        <div className="page-heading">{entity?.name}</div>
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

      <div className="entity-card-wrapper">
        <EntityCard entity={entity ?? {}} />
      </div>
    </div>
  );
}
