USE [my_resume_db];
GO

IF TYPE_ID(N'dbo.GuidList') IS NULL
    CREATE TYPE dbo.GuidList AS TABLE (Id UNIQUEIDENTIFIER NOT NULL);
GO

DROP PROCEDURE IF EXISTS dbo.GetProject;
DROP PROCEDURE IF EXISTS dbo.GetImageDetails;
DROP PROCEDURE IF EXISTS dbo.GetImageDetailsByIDs;
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

CREATE PROCEDURE dbo.GetImageDetails
    @ImageID UNIQUEIDENTIFIER
AS
BEGIN
    SELECT  project_id as projectID,
            image_set as imageSet
    FROM project_images
    WHERE file_id = @ImageID
END;
GO

CREATE PROCEDURE dbo.GetImageDetailsByIDs
    @IDs dbo.GuidList READONLY
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        pi.file_id  AS imageID,
        pi.project_id AS projectID,
        pi.image_set  AS imageSet
    FROM dbo.project_images pi
    INNER JOIN @IDs i ON pi.file_id = i.Id;
END;
GO