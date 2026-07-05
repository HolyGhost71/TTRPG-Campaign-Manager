import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlinePeople } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { GiBroadsword } from "react-icons/gi";
import { BsStopwatch } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

export const SidebarData = [
  {
    type: "title",
    title: "Echoes of Obsidian",
    cName: "nav-title",
  },
  {
    type: "link",
    title: "Dashboard",
    path: "",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    type: "heading",
    title: "The Campaign",
    cName: "nav-heading",
  },
  {
    type: "link",
    title: "Sessions",
    path: "sessions",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    type: "link",
    title: "Player Characters",
    path: "pcs",
    icon: <BsPeopleFill />,
    cName: "nav-text",
  },
  {
    type: "link",
    title: "Quests",
    path: "quests",
    icon: <BsStopwatch />,
    cName: "nav-text",
  },
  {
    type: "link",
    title: "History",
    path: "history",
    icon: <CgSandClock />,
    cName: "nav-text",
  },
  {
    type: "heading",
    title: "The World",
    cName: "nav-heading",
  },
  {
    type: "link",
    title: "Locations",
    path: "locations",
    icon: <IoIcons.IoMdHome />,
    cName: "nav-text",
  },
  {
    type: "link",
    title: "NPCs",
    path: "npcs",
    icon: <MdOutlinePeople />,
    cName: "nav-text",
  },
  {
    type: "link",
    title: "Factions",
    path: "factions",
    icon: <FaShieldAlt />,
    cName: "nav-text",
  },
  {
    type: "link",
    title: "Items",
    path: "items",
    icon: <GiBroadsword />,
    cName: "nav-text",
  },
];
