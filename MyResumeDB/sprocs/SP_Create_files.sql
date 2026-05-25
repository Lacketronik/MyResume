USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetFiles;
GO

CREATE PROCEDURE GetFiles
AS
BEGIN
    SELECT file_id  AS id,
           file_name AS name,
           file_path AS path,
           file_extension AS extension,
           file_type AS type
    FROM files;
END;
GO