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

export type DataId = 'response' | 'empathy' | 'gender' | 'age' | 'literacy' | 'comment';

export interface IStudyInput {
    assignmentId?: string;
    hitId?: string;
    workerId?: string;
    taskType?: TaskType;
    data?: StudyInputData;
}

export type StudyInputData = {
    senderName?: string;
    responderName?: string;
    conversationId?: string;
    treatmentType?: string;
    response?: string;
};

export type StudyInputId = keyof StudyInputData;

export const studySetting = {
    compensation: '$0.05',
    duration: 'about 1 minute'
};

export const getDefaultStudyInputData = (taskType: TaskType) => {
    switch (taskType) {
        case TaskType.Response:
            return <StudyInputData>{
                senderName: 'Unknown Sender',
                treatmentType: '1',
                conversationId: 'default'
            };
        case TaskType.Judge:
            return <StudyInputData>{
                senderName: 'Unknown Sender',
                responderName: 'Unknown Responder',
                conversationId: 'default',
                response:
                    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
            };
    }
};
