import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";

const Sidebar = () => {
  const navigator = useNavigate();
  const { campaignId } = useParams();

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars"></Link>
      </div>
      <nav className={"nav-menu active"}>
        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => {
            if (item.type === "link") {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={
                      item.path === ""
                        ? `/campaigns/${campaignId}`
                        : `/campaigns/${campaignId}/${item.path}`
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            } else if (item.type === "heading") {
              return (
                <li key={index} className={item.cName}>
                  {item.title}
                </li>
              );
            } else if (item.type === "title") {
              return <div className={item.cName}>Echoes of Obsidian</div>;
            }
          })}
          <button
            className="creation-button"
            onClick={() => {
              navigator(`/campaigns/${campaignId}/create-entity`);
            }}
          >
            Create new Entity
          </button>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
