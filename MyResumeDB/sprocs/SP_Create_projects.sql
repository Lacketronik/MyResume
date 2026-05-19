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
        p.project_description AS [description],
        p.github_url AS githubUrl,
        
        (
            SELECT v.file_id AS [file_id]
            FROM dbo.project_videos v
            WHERE v.project_id = p.project_id
            FOR JSON PATH
        ) AS videoBlobIDs,

        (
            SELECT img.file_id AS [file_id]
            FROM dbo.project_images img
            WHERE img.project_id = p.project_id
            FOR JSON PATH
        ) AS imageBlobIDs,

        (
            SELECT pf.file_id AS [file_id]
            FROM dbo.project_files pf
            WHERE pf.project_id = p.project_id
            FOR JSON PATH
        ) AS projectFileIDs

    FROM dbo.projects p;
END;
GO