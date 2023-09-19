import React from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

const Header: React.FC = () => {
  const items: MenuItem[] = [
    {
      label: "Options",
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
        },
        {
          label: "Delete",
          icon: "pi pi-times",
        },
      ],
    },
    {
      label: "Links",
      items: [
        {
          label: "React Website",
          icon: "pi pi-external-link",
          url: "https://reactjs.org/",
        },
        {
          label: "Upload",
          icon: "pi pi-upload",
        },
      ],
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Menu model={items} />
    </div>
  );
};

export default Header;
