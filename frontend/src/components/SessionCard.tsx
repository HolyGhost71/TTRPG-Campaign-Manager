import "../components/EntityCard/EntityCard.css";
import { useNavigate, useParams } from "react-router-dom";

const SessionCard = (props: any) => {
  const session = props.session;
  const campaignId = useParams().campaignId;
  const navigate = useNavigate();

  return (
    <div
      className="entity-card"
      style={{ marginTop: 15, paddingTop: 15, paddingBottom: 15 }}
      onClick={() =>
        navigate(`/campaigns/${campaignId}/sessions/${session.id}`)
      }
    >
      <div className="entity-header-small">
        <div>
          <div className="entity-title-small">
            <h2>{`${session.sessionNumber} - ${session.title} - ${new Date(session.date).toLocaleDateString("en-GB")}`}</h2>
          </div>
          <div className="entity-description-small">
            {session.description || "No description available."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
