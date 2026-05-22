USE my_resume_db;

CREATE TABLE files (
	file_id UNIQUEIDENTIFIER NOT NULL,
	file_name VARCHAR(255) NOT NULL,
	file_path VARCHAR(255) NOT NULL,
	file_extension VARCHAR(10) NOT NULL,
	file_type VARCHAR(20) NOT NULL,
	uploaded_at DATETIME NOT NULL,
	PRIMARY KEY (file_id)
)

CREATE TABLE informations (
	information_id INT IDENTITY(1,1) NOT NULL,
	information_name VARCHAR(255) NOT NULL,
	linkedin VARCHAR(255) NULL,
	resume_file_id UNIQUEIDENTIFIER NULL,
	profile_image_id UNIQUEIDENTIFIER NULL,
	PRIMARY KEY (information_id),
	FOREIGN KEY (resume_file_id) REFERENCES files (file_id),
	FOREIGN KEY (profile_image_id) REFERENCES files (file_id)
)

CREATE TABLE introductions (
	introduction_id INT IDENTITY(1,1) NOT NULL,
	information_id INT NOT NULL,
	description VARCHAR(4000) NOT NULL,
	PRIMARY KEY (introduction_id),
	FOREIGN KEY (information_id) REFERENCES informations (information_id)
)

CREATE TABLE roles (
	role_id INT IDENTITY(1,1) NOT NULL,
	information_id INT NOT NULL,
	role_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (role_id),
	FOREIGN KEY (information_id) REFERENCES informations (information_id)
)

CREATE TABLE experiences (
	experience_id INT IDENTITY(1,1) NOT NULL,
	company VARCHAR(255) NOT NULL,
	position VARCHAR(255) NOT NULL,
	start_date DATETIME NOT NULL,
	end_date DATETIME NULL,
	PRIMARY KEY (experience_id)
)

CREATE TABLE responsibilities (
	responsibility_id INT IDENTITY(1,1) NOT NULL,
	experience_id INT NOT NULL,
	description VARCHAR(4000) NOT NULL,
	PRIMARY KEY (responsibility_id),
	FOREIGN KEY (experience_id) REFERENCES experiences (experience_id)
)

CREATE TABLE educations (
	education_id INT IDENTITY(1,1) NOT NULL,
	institution VARCHAR(255) NOT NULL,
	degree VARCHAR(255) NOT NULL,
	graduation_date DATETIME NULL,
	PRIMARY KEY (education_id)
)

CREATE TABLE certifications (
	certificate_id INT IDENTITY(1,1) NOT NULL,
	certification_id VARCHAR(255) NOT NULL UNIQUE,
	title VARCHAR(255) NOT NULL,
	provider VARCHAR(255) NOT NULL,
	exam_code VARCHAR(255) NOT NULL,
	issue_date DATETIME NOT NULL,
	expiration_date DATETIME NULL,
	verification_link VARCHAR(255) NOT NULL,
	status VARCHAR(10) NOT NULL,
	PRIMARY KEY (certificate_id)
)

CREATE TABLE projects (
	project_id INT IDENTITY(1,1) NOT NULL,
	project_name VARCHAR(255) NOT NULL UNIQUE,
	project_description VARCHAR(4000) NOT NULL,
	project_date DATETIME NULL,
	github_url VARCHAR(255) NULL,
	PRIMARY KEY (project_id)
)

CREATE TABLE project_videos (
	video_id INT IDENTITY(1,1) NOT NULL,
	project_id INT NOT NULL,
	video_link VARCHAR(255) NOT NULL,
	PRIMARY KEY (video_id),
	FOREIGN KEY (project_id) REFERENCES projects (project_id)
)

CREATE TABLE project_images (
	image_id INT IDENTITY(1,1) NOT NULL,
	project_id INT NOT NULL,
	file_id UNIQUEIDENTIFIER NOT NULL,
	image_set VARCHAR(255) NOT NULL DEFAULT 'NONE',
	PRIMARY KEY (image_id),
	FOREIGN KEY (project_id) REFERENCES projects (project_id),
	FOREIGN KEY (file_id) REFERENCES files (file_id)
)

CREATE TABLE project_files (
	project_file_id INT IDENTITY(1,1) NOT NULL,
	project_id INT NOT NULL,
	file_id UNIQUEIDENTIFIER NOT NULL,
	PRIMARY KEY (file_id),
	FOREIGN KEY (project_id) REFERENCES projects (project_id),
	FOREIGN KEY (file_id) REFERENCES files (file_id)
)