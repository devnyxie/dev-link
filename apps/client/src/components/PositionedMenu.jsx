import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import { GoPencil } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import { MdOutlineMoreHoriz } from "react-icons/md";

export default function PositionedMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: { variant: "outlined", color: "neutral", overflow: "hidden" },
        }}
      >
        <MdOutlineMoreHoriz size={20} />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem>
          <ListItemDecorator>
            <GoPencil />
          </ListItemDecorator>{" "}
          Edit post
        </MenuItem>
        <MenuItem disabled>
          <ListItemDecorator />
          Draft post
        </MenuItem>
        <ListDivider />
        <MenuItem variant="soft" color="danger">
          <ListItemDecorator sx={{ color: "inherit" }}>
            <GoTrash />
          </ListItemDecorator>{" "}
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
