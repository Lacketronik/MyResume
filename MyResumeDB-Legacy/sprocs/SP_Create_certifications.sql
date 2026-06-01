USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetCertification;
GO

CREATE PROCEDURE dbo.GetCertification
AS
BEGIN
	SELECT certification_id AS id,
			title,
			provider,
			exam_code AS examCode,
			issue_date AS issueDate,
			expiration_date AS expirationDate,
			verification_link AS verificationLink,
			status
	FROM certifications
END;
GO