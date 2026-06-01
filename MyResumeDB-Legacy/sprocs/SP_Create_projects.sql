USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetProject;
DROP PROCEDURE IF EXISTS dbo.GetImages;
GO

CREATE PROCEDURE dbo.GetProject
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        p.project_id AS projectId,
        p.project_name AS name,
        p.github_url AS githubUrl,
        p.project_date AS projectDate,

        (
            SELECT d.description AS [description],
                   d.type AS [type]
            FROM dbo.project_descriptions d
            WHERE d.project_id = p.project_id
            FOR JSON PATH
        ) AS rawDescriptions,
        
        (
            SELECT v.video_link AS [video_link]
            FROM dbo.project_videos v
            WHERE v.project_id = p.project_id
            FOR JSON PATH
        ) AS rawVideoLinks,

        (
            SELECT img.file_id AS [file_id]
            FROM dbo.project_images img
            WHERE img.project_id = p.project_id
            FOR JSON PATH
        ) AS rawImageBlobIDs,

        (
            SELECT pf.file_id AS [file_id]
            FROM dbo.project_files pf
            WHERE pf.project_id = p.project_id
            FOR JSON PATH
        ) AS rawProjectFileIDs,

        (
            SELECT pt.technology_name AS [technology_name]
            FROM dbo.project_technologies pt
            WHERE pt.project_id = p.project_id
            FOR JSON PATH
        ) AS rawTechnologies

    FROM dbo.projects p;
END;
GO

CREATE PROCEDURE dbo.GetImages
AS
BEGIN
    SELECT file_id AS imageID,
           project_id AS projectID,
           image_set AS imageSet
    FROM project_images;
END;
GO