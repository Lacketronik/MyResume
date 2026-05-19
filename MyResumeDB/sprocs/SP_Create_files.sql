USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetFile;
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