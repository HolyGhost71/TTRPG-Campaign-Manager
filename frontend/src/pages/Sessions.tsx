import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import SessionCard from "../components/SessionCard";

export default function Sessions() {
  const [sessionsArray, setSessionsArray] = useState<any[]>([]);

  const [showCreate, setShowCreate] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);

  const { campaignId } = useParams();

  console.log(campaignId);

  // Scroll to create form when opened
  useEffect(() => {
    if (showCreate && dropdownRef.current) {
      requestAnimationFrame(() => {
        dropdownRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [showCreate]);

  // Fetch sessions
  useEffect(() => {
    if (!campaignId) return;

    api
      .get(`/campaigns/${campaignId}/sessions`)
      .then((response) => {
        setSessionsArray(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [campaignId]);

  // Create new session
  const createSession = async () => {
    try {
      const response = await api.post("/sessions", {
        campaignId,
        title,
        description,
        date,
        sessionNumber: sessionsArray.length + 1,
      });

      setSessionsArray((previous) => [...previous, response.data]);

      // Reset form
      setTitle("");
      setDescription("");
      setDate(today);

      setShowCreate(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="page-heading">Sessions</div>

      {loading ? (
        <div className="popup">
          Fetching Items from server<span className="dots"></span>
        </div>
      ) : sessionsArray.length === 0 ? (
        <div className="popup">No Items found!.</div>
      ) : (
        <>
          {sessionsArray.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </>
      )}

      <button
        className="add-session-button"
        onClick={() => setShowCreate((previous) => !previous)}
      >
        +
      </button>

      {showCreate && (
        <div ref={dropdownRef} className="create-session-dropdown">
          <div className="page-body" style={{ fontWeight: "bold" }}>
            Create Session
          </div>
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Title</label>

          <input
            style={{
              padding: 5,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Session title"
          />

          <label>Description</label>

          <textarea
            style={{
              width: 300,
              padding: 5,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quick summary..."
          />

          <button className="button" onClick={createSession}>
            Create Session
          </button>
        </div>
      )}
    </>
  );
}
