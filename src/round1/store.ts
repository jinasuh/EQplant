import { action, computed, observable, reaction } from 'mobx';
import { TaskType } from 'src/store';
import { IAssignment } from 'src/store/config';

export type DataId = 'response' | 'empathy' | 'gender' | 'age' | 'literacy' | 'comment';

export interface IStudyInput extends IAssignment {
    taskType?: TaskType;
    data?: StudyInputData;
}

export type StudyInputData = {
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
                treatmentType: '1',
                conversationId: '1'
            };
        case TaskType.Judge:
            return <StudyInputData>{
                conversationId: '2',
                response:
                    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
            };
    }
};

export interface IStoreProps {
    store: Store;
}

export class Store {
    public readonly accepted: boolean = false;

    public readonly studyInput: IStudyInput;

    @observable public response: string;
    @observable public empathy: string;
    @observable public gender: string;
    @observable public age: string;
    @observable public literacy: string;
    @observable public comment: string;

    constructor() {
        // Parse query strings
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        var queryParams: any = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            queryParams[pair[0]] = pair[1];
        }

        var assignmentId = queryParams['assignmentId'];
        this.accepted = assignmentId && assignmentId != 'ASSIGNMENT_ID_NOT_AVAILABLE';

        const taskType = window.taskType || TaskType.Response;

        this.studyInput = {
            assignmentId,
            hitId: queryParams['hitId'],
            workerId: queryParams['workerId'],
            taskType: taskType,
            data: window.data || getDefaultStudyInputData(taskType)
        };

        switch (this.studyInput.taskType) {
            case TaskType.Response:
                reaction(
                    () => this.canSubmitResponseTask,
                    canSubmit => {
                        $('#submitButton')
                            .prop('disabled', !canSubmit)
                            .attr('value', 'Submit Task');
                    }
                );
                break;
            case TaskType.Judge:
                reaction(
                    () => this.canSubmitJudgeTask,
                    canSubmit => {
                        $('#submitButton')
                            .prop('disabled', !canSubmit)
                            .attr('value', 'Submit Task');
                    }
                );
                break;
        }
    }

    @computed
    public get canSubmitResponseTask() {
        return (
            this._isValid(this.response) &&
            this._isValid(this.gender) &&
            this._isValid(this.age) &&
            this._isValid(this.literacy)
        );
    }

    @computed
    public get canSubmitJudgeTask() {
        return (
            this._isValid(this.empathy) &&
            this._isValid(this.gender) &&
            this._isValid(this.age) &&
            this._isValid(this.literacy)
        );
    }

    @action.bound
    public addData(key: DataId, data: string) {
        this[key] = data;
    }

    @action.bound
    public getStudyInput(key: string) {
        const input = (<any>this.studyInput.data)[key];

        if (!input || input.length == 0) {
            return 'TODOSTRING';
        }

        return input;
    }

    private _isValid(value: string) {
        return value && value.length > 0;
    }
}
