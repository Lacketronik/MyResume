import type { CertificationProps } from "./CertificationProps";
import type { EducationProps } from "./EducationProps";
import type { ExperienceProps } from "./ExperienceProps";
import type { FileProps } from "./FileProps";
import type { ImageProps } from "./ImageProps";
import type { InformationProps } from "./InformationProps";
import type { ProjectProps } from "./ProjectProps";

export interface PortfolioProps {
    information: InformationProps
    experiences: ExperienceProps[]
    educations: EducationProps[]
    certifications: CertificationProps[]
    projects: ProjectProps[]
    files: FileProps[]
    imageDetails: ImageProps[]
}