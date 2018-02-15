export enum TaskType {
    Response = 0,
    Judge = 1
}

export enum TreatmentType {
    None = 0,
    Default = 1,
    HighConfidence = 2,
    LowConfidence = 3
}

export interface IAssignment {
    assignmentId?: string;
    hitId?: string;
    workerId?: string;
}
