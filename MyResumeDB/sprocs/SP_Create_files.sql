USE [my_resume_db];
GO

IF TYPE_ID(N'dbo.GuidList') IS NULL
    CREATE TYPE dbo.GuidList AS TABLE (Id UNIQUEIDENTIFIER NOT NULL);
GO

DROP PROCEDURE IF EXISTS dbo.GetFile;
DROP PROCEDURE IF EXISTS dbo.GetFilesByIDs;
GO

CREATE PROCEDURE dbo.GetFile
	@FileID UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		file_id AS id,
		file_name AS name,
		file_path AS path,
		file_extension AS extension,
		file_type AS type
	FROM dbo.files
	WHERE file_id = @FileID;
END;
GO

CREATE PROCEDURE dbo.GetFilesByIDs
    @IDs dbo.GuidList READONLY
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        f.file_id   AS id,
        f.file_name AS name,
        f.file_path AS path,
        f.file_extension AS extension,
        f.file_type AS type
    FROM dbo.files f
    INNER JOIN @IDs i ON f.file_id = i.Id;
END;
GO