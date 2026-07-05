import { useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";

export default function SoloEntity() {
  const { entityId } = useParams();
  const [entity, setEntity] = useState<any>();
  console.log("Opened entity page for entity" + entityId);

  useEffect(() => {
    api
      .get("/entities/" + entityId)
      .then((response) => {
        setEntity(response.data);
        console.log(entity);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="page-heading">{entity?.name}</div>
      <div className="page-subheading">DM Notes</div>;
    </>
  );
}
