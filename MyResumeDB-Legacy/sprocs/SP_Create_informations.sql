USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetInformation;
GO

CREATE PROCEDURE dbo.GetInformation    
AS
BEGIN
    SELECT TOP 1
        i.information_name AS name,
        i.linkedin,
        i.github,
        (SELECT email_address FROM emails WHERE information_id = i.information_id FOR JSON PATH) as rawEmail,
        (SELECT description FROM introductions WHERE information_id = i.information_id FOR JSON PATH) AS rawIntroduction,
        (SELECT role_name FROM roles WHERE information_id = i.information_id FOR JSON PATH) AS rawRole,
        i.resume_file_id AS resumeFileID,
        i.profile_image_id AS profileImageID
    FROM informations i
END;
GO