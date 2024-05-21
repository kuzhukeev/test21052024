WITH SubdivisionHierarchy AS (
    SELECT 
        id, 
        name, 
        parent_id, 
        0 AS level
    FROM 
        subdivisions
    WHERE 
        id = (SELECT subdivision_id FROM collaborators WHERE id = 710253)
    
    UNION ALL
    
    SELECT 
        s.id, 
        s.name, 
        s.parent_id, 
        sh.level + 1 AS level
    FROM 
        subdivisions s
    INNER JOIN 
        SubdivisionHierarchy sh ON s.parent_id = sh.id
),

FilteredCollaborators AS (
    SELECT 
        c.id AS id, 
        c.name AS name, 
        s.name AS sub_name, 
        c.subdivision_id AS sub_id, 
        sh.level AS sub_level
    FROM 
        collaborators c
    INNER JOIN 
        SubdivisionHierarchy sh ON c.subdivision_id = sh.id
    INNER JOIN 
        subdivisions s ON c.subdivision_id = s.id
    WHERE 
        c.age < 40 
        AND c.subdivision_id NOT IN (100055, 100059)
),

SubdivisionCounts AS (
    SELECT 
        c.subdivision_id, 
        COUNT(*) AS colls_count
    FROM 
        collaborators c
    GROUP BY 
        c.subdivision_id
)

SELECT 
    fc.id, 
    fc.name, 
    fc.sub_name, 
    fc.sub_id, 
    fc.sub_level, 
    sc.colls_count
FROM 
    FilteredCollaborators fc
INNER JOIN 
    SubdivisionCounts sc ON fc.sub_id = sc.subdivision_id
ORDER BY 
    fc.sub_level;
