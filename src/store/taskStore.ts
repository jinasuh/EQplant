import { action, computed, observable } from 'mobx';
import { IStepStore } from 'src/store';
import { WelcomeStore, SurveyStore } from 'src/components/componentStores';
import { DataId } from 'src/store/config';

export interface IStoreProps {
    store: TaskStore;
}

export class TaskStore {
    public readonly conversationId: string;
    public readonly steps: IStepStore[] = [];
    public readonly accepted: boolean = false;

    @observable public response: string;
    @observable public rating: string;
    @observable public gender: string;
    @observable public age: string;
    @observable public literacy: string;
    @observable public comment: string;

    @observable public currentStepId: number = 0;

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

        // TODO (remove before deploying)
        this.accepted = true;

        this.steps.push(new WelcomeStore());
        this.steps.push(new SurveyStore());
    }

    @computed
    public get allAnswered() {
        return true;
    }

    @computed
    public get currentStep() {
        return this.steps[this.currentStepId];
    }

    @action.bound
    public setStep(index: number) {
        if (this.currentStepId != index) {
            this.currentStepId = index;
            window.scrollTo(0, 0);
        }
    }

    @action.bound
    public completeStep(index: number) {
        this.steps[index].isComplete = true;
        this.steps[index].isVisible = false;
        this.steps[index].end();

        const next = this.steps[index + 1];
        if (next) {
            if (index + 1 == this.steps.length - 1) {
                $('#submitButton')
                    .prop('disabled', false)
                    .attr('value', 'Submit Task');

                // console.log(this.taskData);
                next.isComplete = true;
            }

            next.isVisible = true;
            this.setStep(index + 1);
            setTimeout(() => {
                $('ul.tabs').tabs('select_tab', `step${index + 1}`);
                if (next) {
                    next.start();
                }
            }, 200);
        }
    }

    @action.bound
    public addData(key: DataId, data: string) {
        this[key] = data;
    }
}
