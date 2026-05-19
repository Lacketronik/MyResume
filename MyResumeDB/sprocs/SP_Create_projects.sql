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
            SELECT v.video_id AS [video_id]
            FROM dbo.project_videos v
            WHERE v.project_id = p.project_id
            FOR JSON PATH
        ) AS videoBlobIDs,

        (
            SELECT img.image_id AS [blob_id]
            FROM dbo.project_images img
            WHERE img.project_id = p.project_id
            FOR JSON PATH
        ) AS imageBlobIDs

    FROM dbo.projects p;
END;
GO