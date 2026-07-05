import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";

const Sidebar = () => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
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
                          ? `/campaigns/1`
                          : `/campaigns/1/${item.path}`
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
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
