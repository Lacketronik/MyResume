USE [my_resume_db];
GO

DROP PROCEDURE IF EXISTS dbo.GetExperience;
GO

CREATE PROCEDURE dbo.GetExperience
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        e.experience_id AS experienceId,
        e.company AS company, 
        e.position AS position, 
        e.start_date AS startDate, 
        e.end_date AS endDate,
        (
            SELECT r.description 
            FROM dbo.responsibilities r 
            WHERE r.experience_id = e.experience_id
            FOR JSON PATH
        ) AS rawResponsibilities
    FROM dbo.experiences e;
END;
GO