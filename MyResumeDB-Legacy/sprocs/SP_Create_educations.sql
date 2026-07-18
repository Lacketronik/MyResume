USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetEducation;
GO

CREATE PROCEDURE dbo.GetEducation
AS
BEGIN
	SELECT	institution,
			degree,
			graduation_date AS graduationDate,
			(
				SELECT CONCAT(f.file_path, '/', f.file_id, '_', f.file_name, '.', f.file_extension)
				FROM dbo.files f
				WHERE f.file_id = icon_file_id
			) AS iconFilePath
	FROM educations
END;
GO