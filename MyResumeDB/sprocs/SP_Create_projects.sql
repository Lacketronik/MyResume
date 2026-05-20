USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetProject;
GO

CREATE PROCEDURE dbo.GetProject
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        p.project_id AS projectId,
        p.project_name AS name,
        p.project_description AS [description],
        p.github_url AS githubUrl,
        p.project_date AS projectDate,
        
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
        ) AS rawProjectFileIDs

    FROM dbo.projects p;
END;
GO