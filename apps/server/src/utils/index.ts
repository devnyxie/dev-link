//function in order to setup Teams with roles
export function setupRoles(teams: any) {
  const teamsWithRoles = teams.map((team: any, index: number) => {
    console.log(index);
    const { members, ...teamWithoutMembers } = team.toJSON();
    const openRoles = members.filter((member: any) => !member.user);
    const takenRoles = members.filter((member: any) => member.user);
    return {
      ...teamWithoutMembers,
      openRoles: openRoles,
      takenRoles: takenRoles,
    };
  });
  return teamsWithRoles;
}
