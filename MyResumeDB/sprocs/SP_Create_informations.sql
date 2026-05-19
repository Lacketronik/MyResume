USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetInformation;
GO

CREATE PROCEDURE dbo.GetInformation    
AS
BEGIN
    SELECT TOP 1
        i.information_name,
        i.linkedin,
        (SELECT description FROM introductions WHERE information_id = i.information_id) AS introduction,
        (SELECT role_name FROM roles WHERE information_id = i.information_id) AS role,
        i.resume_file_id AS resumeFileID
    FROM informations i
END;
GO