export interface CertificationProps {
    id: number
    title: string
    provider: string
    examCode: string
    issueDate: Date
    expirationDate?: Date
    verificationLink: string
    status: 'Active' | 'Expired'
}