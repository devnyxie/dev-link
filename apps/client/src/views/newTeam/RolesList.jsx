import {
  Avatar,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
} from "@mui/joy";
import React, { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/user.slice";

function RolesList({ roles, setRoles, user }) {
  useEffect(() => {
    setRoles([{ role: "Admin", user_id: user.id }]);
  }, []);

  function deleteRole(index) {
    setRoles(roles.filter((role, i) => i !== index));
  }

  function createRole() {
    setRoles([...roles, { role: "Member" }]);
  }

  function updateRole(index, value) {
    setRoles(
      roles.map((member, i) =>
        i === index ? { ...member, role: value } : member
      )
    );
  }

  console.log(roles);
  return (
    <>
      <FormControl>
        <FormLabel>Roles</FormLabel>
        <List
          variant="outlined"
          sx={{ borderRadius: "sm", overflow: "hidden" }}
        >
          {roles.map((role, index) => {
            if (index === 0)
              return (
                <ListItem
                  key={index}
                  endAction={
                    <IconButton
                      disabled
                      aria-label="Delete"
                      size="sm"
                      color="danger"
                    >
                      <MdDeleteOutline size={20} />
                    </IconButton>
                  }
                >
                  <ListItemButton>
                    <Avatar variant="outlined" src={user.pfp} />
                    <Input
                      placeholder="Type in here…"
                      variant="outlined"
                      value={roles[index].role}
                      onChange={(e) => updateRole(index, e.target.value)}
                    />
                  </ListItemButton>
                </ListItem>
              );
            return (
              <ListItem
                key={index}
                endAction={
                  <IconButton
                    onClick={() => deleteRole(index)}
                    aria-label="Delete"
                    size="sm"
                    color="danger"
                  >
                    <MdDeleteOutline size={20} />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <Avatar variant="outlined">?</Avatar>
                  <Input
                    placeholder="Type in here…"
                    variant="outlined"
                    value={roles[index].role}
                    onChange={(e) => updateRole(index, e.target.value)}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          {/* ADD BTN */}
          <IconButton
            onClick={createRole}
            aria-label="Add"
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ borderRadius: 0 }}
          >
            <IoAdd size={20} />
          </IconButton>
        </List>
      </FormControl>
    </>
  );
}

export default RolesList;
