import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Sheet,
  Typography,
  Avatar,
  ListItemDecorator,
  Link as JoyUILink,
  Chip,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormHelperText,
} from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import JoyTooltip from "./JoyTooltip";
import { FaCrown } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { GoLock } from "react-icons/go";
import { useDispatch } from "react-redux";
import { createRequest } from "../redux/slices/teams.slice";
import { GoSignOut } from "react-icons/go";
import { GoPlus } from "react-icons/go";

function groupByRole(data) {
  return data.reduce((acc, member) => {
    const { role } = member;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {});
}

function MemberListItem({ team, member, isAdmin }) {
  console.log("member", member);
  const [newRole, setNewRole] = useState(member.role);

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ListItemDecorator>
            <Avatar size="sm" src={member.user.pfp} />
          </ListItemDecorator>
          <Box>
            <Link to={`/${member.user.username}`}>
              <Typography level="title-xs">
                <JoyUILink>{member.user.username}</JoyUILink>
              </Typography>
            </Link>

            <Typography level="body-sm"> as {member.role}</Typography>
          </Box>
          {isAdmin && (
            <IconButton className="crown-icon">
              <FaCrown size={20} />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          {isAdmin ? (
            <>
              <JoyTooltip title={"Edit role"} direction="top">
                <Link
                  to={`/team/${team.id}/settings/general/editRole/${member.id}`}
                >
                  <IconButton aria-label="Edit" size="sm">
                    <MdOutlineEdit size={20} />
                  </IconButton>
                </Link>
              </JoyTooltip>
              <JoyTooltip
                direction="top"
                title={
                  isAdmin ? (
                    "Leave"
                  ) : (
                    <>{member.user ? "Kick Member" : "Delete role"}</>
                  )
                }
              >
                <IconButton aria-label="Delete" size="sm" color="danger">
                  {isAdmin ? <GoSignOut size={20} /> : <MdDelete size={20} />}
                </IconButton>
              </JoyTooltip>
            </>
          ) : (
            <></>
          )}
        </Box>
      </ListItem>
    </>
  );
}

function Members({ team, isAdmin }) {
  const [membersAccordion, setMembersAccordion] = useState(true);
  const groupedMembers = groupByRole(team.takenRoles);

  return (
    <Accordion
      expanded={membersAccordion}
      onChange={(event, expanded) => {
        setMembersAccordion(expanded ? expanded : false);
      }}
    >
      <AccordionSummary>Members</AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {Object.entries(groupedMembers).map(([role, members], index) => (
            <ListItem
              key={role}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                px: 0,
              }}
            >
              <List
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {members.map((member, index) => (
                  <MemberListItem
                    isAdmin={isAdmin}
                    key={member.id}
                    member={member}
                    team={team}
                  />
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function OpenRoleListItem({
  team,
  openRole,
  isAdmin,
  eligibleToJoin,
  applyForRole,
}) {
  const [newRole, setNewRole] = useState(openRole.role);

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: 0,
        }}
      >
        <Box>
          <Typography level="title-xs">{openRole.role}</Typography>
          <Chip color="primary" size="sm">
            {openRole.requests.length} Request
            {openRole.requests.length > 1 || openRole.requests.length === 0
              ? "s"
              : ""}
          </Chip>
        </Box>

        <Box sx={{ display: "flex" }}>
          {isAdmin ? (
            <>
              <JoyTooltip direction="top" title={"Edit role"}>
                <Link
                  to={`/team/${team.id}/settings/general/editRole/${openRole.id}`}
                >
                  <IconButton aria-label="Edit" size="sm">
                    <MdOutlineEdit size={20} />
                  </IconButton>
                </Link>
              </JoyTooltip>
              <JoyTooltip direction="top" title={"Delete role"}>
                <IconButton aria-label="Delete" size="sm" color="danger">
                  <MdDelete size={20} />
                </IconButton>
              </JoyTooltip>
            </>
          ) : (
            <>
              {eligibleToJoin ? (
                <Button
                  // disabled={!eligibleToJoin}
                  size="sm"
                  color="primary"
                  variant="plain"
                  onClick={() => applyForRole(openRole.id)}
                  endDecorator={<TbSend />}
                >
                  Apply
                </Button>
              ) : (
                <IconButton disabled>
                  <GoLock size={20} />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </ListItem>
    </>
  );
}

function OpenRoles({ team, setTeam, isAdmin, eligibleToJoin, user }) {
  const dispatch = useDispatch();
  const [openRolesAccordion, setOpenRolesAccordion] = useState(true);
  const groupedOpenRoles = groupByRole(team.openRoles);

  function applyForRole(roleId) {
    dispatch(
      createRequest({ member_id: roleId, team_id: team.id, user_id: user.id })
    ).then((res) => {
      if (res.payload.data) {
        console.log(res.payload.data);
        setTeam({
          ...team,
          openRoles: team.openRoles.map((role) =>
            role.id === roleId
              ? {
                  ...role,
                  requests: [...role.requests, res.payload.data],
                }
              : role
          ),
        });
      }
    });
  }

  return (
    <Accordion
      expanded={openRolesAccordion}
      onChange={(event, expanded) => {
        setOpenRolesAccordion(expanded ? expanded : false);
      }}
      sx={{ borderBottom: "none" }}
    >
      <AccordionSummary>Open Roles</AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {Object.entries(groupedOpenRoles).map(([role, openRoles], index) => (
            <ListItem
              key={role}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                px: 0,
              }}
            >
              <List
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {openRoles.map((openRole, index) => (
                  <OpenRoleListItem
                    isAdmin={isAdmin}
                    key={openRole.id}
                    openRole={openRole}
                    eligibleToJoin={eligibleToJoin}
                    applyForRole={applyForRole}
                    team={team}
                  />
                ))}
              </List>
            </ListItem>
          ))}
          {isAdmin ? (
            <ListItem endAction={<GoPlus size={20} />}>
              <ListItemButton variant="plain">Add role</ListItemButton>
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function MembersManagement({ team, user, wrap = true }) {
  const [localTeam, setLocalTeam] = useState(team);
  const [eligibleToJoin, setEligibleToJoin] = useState(false);

  if (localTeam === undefined) {
    return;
  } else if (user === undefined && user?.id === localTeam.creator_id) {
    return;
  }

  const isAdmin = user?.id === localTeam.creator_id;
  console.log(isAdmin);

  useEffect(() => {
    if (localTeam && user) {
      const isMember = localTeam.takenRoles.some(
        (role) => role.user.id === user.id
      );
      console.log("isMember", isMember);
      const isAlreadyRequested = localTeam.openRoles.some((role) =>
        role.requests.some((request) => request.user.id === user.id)
      );
      console.log("isAlreadyRequested", isAlreadyRequested);
      if (isAlreadyRequested || isMember) {
        setEligibleToJoin(false);
      } else {
        setEligibleToJoin(true);
      }
    } else {
      setEligibleToJoin(false);
    }
  }, [localTeam, team, user]);

  const Wrap = ({ children }) => {
    if (wrap) {
      return (
        <FormControl>
          <FormLabel>Team Management</FormLabel>
          <Sheet variant="outlined" sx={{ borderRadius: "sm" }}>
            {children}
          </Sheet>
          <FormHelperText>
            Manage your team members and open roles.
          </FormHelperText>
        </FormControl>
      );
    } else {
      return <>{children}</>;
    }
  };
  return (
    <>
      <Wrap>
        <AccordionGroup>
          <Members team={localTeam} isAdmin={isAdmin} />
          <OpenRoles
            team={localTeam}
            isAdmin={isAdmin}
            eligibleToJoin={eligibleToJoin}
            setTeam={setLocalTeam}
            user={user}
          />
        </AccordionGroup>
      </Wrap>
    </>
  );
}

export default MembersManagement;
