
# ---
# SELECT_TEAMS = <<SQL
#     SELECT
#     team_id,
#     team_name,
#     creator_id,
#     description_short,
#     description_md,
#     open,
#     team_created_at,
#     user_id,
#     name,
#     surname,
#     username,
#     pfp,
#     role
#     FROM (
#     SELECT
#     teams_with_members.id AS team_id,
#     teams_with_members.name AS team_name,
#     teams_with_members.creator_id,
#     teams_with_members.description_short,
#     description_md,
#     teams_with_members.open,
#     teams_with_members.team_created_at,
#     u.id AS user_id,
#     u.name,
#     u.surname,
#     u.username,
#     u.pfp,
#     m.role
#     FROM (
#     SELECT t.id, t.name, t.creator_id, t.description_short, t.description_md, t.open, t.created_at AS team_created_at
#     FROM teams t
#     INNER JOIN members m ON t.id = m.team_id
#     LEFT OUTER JOIN users u ON u.id = m.user_id
#     GROUP BY t.id
#     ) AS teams_with_members
#     LEFT OUTER JOIN members m ON teams_with_members.id = m.team_id
#     LEFT OUTER JOIN users u ON u.id = m.user_id
#     ) AS team_details
#     ORDER BY team_created_at DESC
# SQL


# SELECT_TEAM_BY_ID = <<SQL
#   SELECT
#     team_id,
#     team_name,
#     creator_id,
#     description_short,
#     description_md,
#     open,
#     team_created_at,
#     user_id,
#     name,
#     surname,
#     username,
#     pfp,
#     role
#   FROM (
#     SELECT
#       teams_with_members.id AS team_id,
#       teams_with_members.name AS team_name,
#       teams_with_members.creator_id,
#       teams_with_members.description_short,
#       teams_with_members.description_md,
#       teams_with_members.open,
#       teams_with_members.team_created_at,
#       u.id AS user_id,
#       u.name,
#       u.surname,
#       u.username,
#       u.pfp,
#       m.role
#     FROM (
#       SELECT t.id, t.name, t.creator_id, t.description_short, t.description_md, t.open, t.created_at AS team_created_at
#       FROM teams t
#       INNER JOIN members m ON t.id = m.team_id
#       LEFT OUTER JOIN users u ON u.id = m.user_id
#       GROUP BY t.id
#     ) AS teams_with_members
#     LEFT OUTER JOIN members m ON teams_with_members.id = m.team_id
#     LEFT OUTER JOIN users u ON u.id = m.user_id
#     WHERE team_id = ?
#   ) AS team_details
#   ORDER BY team_created_at DESC
# SQL

SELECT_TEAM_BY_ID_v2 = <<SQL
    SELECT
    t.id AS team_id,
    t.name AS team_name,
    t.creator_id,
    t.description_short,
    t.description_md,
    t.open,
    t.created_at AS team_created_at,
    u.id AS user_id,
    u.name,
    u.surname,
    u.username,
    u.pfp,
    m.role,
    m.id AS member_id
    FROM teams t
    INNER JOIN members m ON t.id = m.team_id
    LEFT OUTER JOIN users u ON u.id = m.user_id
    WHERE t.id = ?
    ORDER BY team_created_at DESC
SQL

SELECT_TEAMS_v2 = <<SQL
    SELECT
    t.id AS team_id,
    t.name AS team_name,
    t.creator_id,
    t.description_short,
    t.description_md,
    t.open,
    t.created_at AS team_created_at,
    u.id AS user_id,
    u.name,
    u.surname,
    u.username,
    u.pfp,
    m.role,
    m.id AS member_id
    FROM teams t
    INNER JOIN members m ON t.id = m.team_id
    LEFT OUTER JOIN users u ON u.id = m.user_id
    ORDER BY team_created_at DESC
    LIMIT ? OFFSET ?;
SQL

test = <<SQL
    SELECT
    t.id AS team_id,
    t.name AS team_name,
    t.creator_id,
    t.description_short,
    t.description_md,
    t.open,
    t.created_at AS team_created_at,
    u.id AS user_id,
    u.name,
    u.surname,
    u.username,
    u.pfp,
    m.role
    FROM teams t
    INNER JOIN members m ON t.id = m.team_id
    LEFT OUTER JOIN users u ON u.id = m.user_id
    ORDER BY team_created_at DESC
SQL