import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSession() {
  const [session, setSession] = useState<any>(null);
  const params = useParams();

  useEffect(() => {
    api
      .get("/sessions/" + params.sessionId)
      .then((response) => {
        setSession(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // All
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const navigator = useNavigate();

  const editSession = async () => {
    if (isCreating) return;

    setIsCreating(true);

    try {
      const response = await api.put(`/sessions/${params.sessionId}`, {
        title,
        description: description ?? "",
        date: date ?? "",
        playerNotes: session?.playerNotes ?? "",
        recap: session?.recap ?? "",
      });

      console.log("Updated session:", response.data);

      navigator(`/campaigns/${params.campaignId}/sessions/${params.sessionId}`);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Failed to update session");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (!session) return;

    setTitle(session.title ?? "");
    setDescription(session.description ?? "");
    setDate(
      session.date ? new Date(session.date).toISOString().split("T")[0] : "",
    );
  }, [session]);

  return (
    <div className="page-heading">
      Edit Session
      <div />
      <div className="creation-container">
        <div className="creation-subheading">Title</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />

        <div className="creation-subheading">Description</div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <div className="creation-subheading">Date</div>
        <input
          type="date"
          className="input-field"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </div>
      <button onClick={editSession} className="button">
        Submit
      </button>
    </div>
  );
}
