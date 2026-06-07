import type { ProjectDescriptionProps } from "./ProjectDescriptionProps"

export type ProjectProps = {
    name: string
    descriptions: ProjectDescriptionProps[]
    videoLinks?: string[]
    imageBlobIDs?: string[]
    githubUrl?: string
    projectFileIDs?: string[]
    projectDate?: Date
    technologies?: string[]
    demos?: string[]
}