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

export interface IMessage {
    from: string;
    content: string;
}

export interface IConversation {
    id: string;
    messages: IMessage[];
}

export interface IStudyInput {
    assignmentId?: string;
    hitId?: string;
    workerId?: string;
    taskType?: TaskType;
    data?: StudyInputData;
}

export interface ResponseInputData {
    senderName?: string;
    conversation?: IConversation;
    treatmentType?: string;
}

export interface JudgeInputData {
    senderName?: string;
    responderName?: string;
    conversation?: IConversation;
    response?: string;
}

export type StudyInputData = ResponseInputData | JudgeInputData;

export type StudyInputId = keyof ResponseInputData | keyof JudgeInputData;

export const studySetting = {
    compensation: '$0.05',
    duration: 'about 1 minute'
};

export const getDefaultStudyInputData = (taskType: TaskType) => {
    switch (taskType) {
        case TaskType.Response:
            return <ResponseInputData>{
                senderName: 'Unknown Sender',
                treatmentType: '1'
            };
        case TaskType.Judge:
            return <JudgeInputData>{
                senderName: 'Unknown Sender',
                responderName: 'Unknown Responder',
                response:
                    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
            };
    }
};
