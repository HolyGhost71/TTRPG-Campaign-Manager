import { useEffect, useState } from "react";
import EditableNotes from "../components/EditableNotes";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function SessionPage() {
  const [session, setSession] = useState<any>();
  const { sessionId } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (!sessionId) return;
    api
      .get("/sessions/" + sessionId)
      .then((response) => {
        setSession(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveNotes = async (newNotes: string, noteType: "RECAP" | "NOTES") => {
    if (!session) return;

    try {
      const updatedSession = {
        ...session,
        ...(noteType === "RECAP"
          ? { recap: newNotes }
          : { playerNotes: newNotes }),
      };

      await api.put(`/sessions/${session.id}`, {
        recap: updatedSession.recap,
        playerNotes: updatedSession.playerNotes,
      });

      setSession(updatedSession);
    } catch (err) {
      console.error(err);
    }
  };

  const params = useParams();

  return (
    <>
      <div className="session-title">
        <div className="page-heading">
          {`Session ${session?.sessionNumber} - ${session?.title}`}
        </div>

        <button
          className="edit-session-button"
          onClick={() =>
            navigator(
              `/campaigns/${params.campaignId}/sessions/${params.sessionId}/edit`,
            )
          }
          aria-label="Edit session"
        >
          <span className="edit-icon">✎</span>
        </button>
      </div>
      <div className="page-body">
        {session?.description ||
          "No session description created. Don't worry! You can fill this in once the session ends."}
      </div>

      {session?.previousSession && (
        <>
          <div className="page-subheading">Previous Session Recap</div>
          <div className="page-body">
            {session.previousSession.description || "No recap available."}
          </div>
        </>
      )}
      <div className="page-subheading">Player Notes</div>
      <EditableNotes
        initialValue={session?.playerNotes}
        onSave={(value) => saveNotes(value, "NOTES")}
      />
      <div className="page-subheading">Post-Session Recap</div>
      <EditableNotes
        initialValue={session?.recap}
        onSave={(value) => saveNotes(value, "RECAP")}
      />
    </>
  );
}
