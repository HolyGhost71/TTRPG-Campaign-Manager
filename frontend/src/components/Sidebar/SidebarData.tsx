import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlinePeople } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { GiBroadsword } from "react-icons/gi";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Sessions",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "PCs",
    path: "/products",
    icon: <BsPeopleFill />,
    cName: "nav-text",
  },
  {
    title: "History",
    path: "/team",
    icon: <CgSandClock />,
    cName: "nav-text",
  },
  {
    title: "Locations",
    path: "/messages",
    icon: <IoIcons.IoMdHome />,
    cName: "nav-text",
  },
  {
    title: "NPCs",
    path: "/support",
    icon: <MdOutlinePeople />,
    cName: "nav-text",
  },
  {
    title: "Items",
    path: "/support",
    icon: <GiBroadsword />,
    cName: "nav-text",
  },
];
