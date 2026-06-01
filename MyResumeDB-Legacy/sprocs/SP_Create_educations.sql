USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetEducation;
GO

CREATE PROCEDURE dbo.GetEducation
AS
BEGIN
	SELECT	institution,
			degree,
			graduation_date AS graduationDate
	FROM educations
END;
GO