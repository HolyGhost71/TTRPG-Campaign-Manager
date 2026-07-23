import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import api from "../../api/api";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const navigator = useNavigate();
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState<any>();

  useEffect(() => {
    if (!campaignId) return;

    api
      .get(`/campaigns/${campaignId}`)
      .then((response) => {
        setCampaign(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [campaignId]);

  return (
    <>
      <button
        className={`sidebar-toggle ${collapsed ? "collapsed" : ""}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        ☰
      </button>
      {!collapsed && (
        <nav className={`nav-menu ${collapsed ? "collapsed" : "active"}`}>
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
                return (
                  <div className={item.cName}>
                    {campaign?.name || "My Campaign"}
                  </div>
                );
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
            <button
              className="creation-button"
              onClick={() => {
                navigator(`/campaigns/`);
              }}
            >
              Select Campaign
            </button>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
