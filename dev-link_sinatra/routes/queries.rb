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

SELECT_TEAMS_BY_MEMBER_USER_ID = <<SQL
    WITH user_teams AS (
        SELECT DISTINCT t.id AS team_id
        FROM teams t
        INNER JOIN members m ON t.id = m.team_id
        WHERE m.user_id = ?
    )
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
    WHERE t.id IN (SELECT team_id FROM user_teams)
    ORDER BY t.created_at DESC;
SQL