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

SELECT_TEAMS_v3 = <<SQL
    WITH paginated_teams AS (
        SELECT
            t.id AS team_id,
            t.name AS team_name,
            t.creator_id,
            t.description_short,
            t.description_md,
            t.open,
            t.created_at AS team_created_at,
            ROW_NUMBER() OVER (ORDER BY created_at DESC) AS row_num
        FROM teams t
    )
    SELECT
        pt.team_id,
        pt.team_name,
        pt.creator_id,
        pt.description_short,
        pt.description_md,
        pt.open,
        pt.team_created_at,
        u.id AS user_id,
        u.name,
        u.surname,
        u.username,
        u.pfp,
        m.role,
        m.id AS member_id
    FROM paginated_teams pt
    INNER JOIN members m ON pt.team_id = m.team_id
    LEFT OUTER JOIN users u ON u.id = m.user_id
    WHERE pt.row_num BETWEEN :offset + 1 AND :offset + :limit
    ORDER BY pt.team_created_at DESC;
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