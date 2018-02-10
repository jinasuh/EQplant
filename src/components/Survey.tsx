import * as React from 'react';
import { observer } from 'mobx-react';
import { StepStoreBase, demographicQuestions } from 'src/store';
import { IStepProps, MultipleChoiceQuestion } from 'src/components/common';

export class SurveyStore extends StepStoreBase {
    constructor() {
        super('Survey', Survey, 'Complete task');
    }
}

@observer
export class Survey extends React.Component<IStepProps, void> {
    public render() {
        const { stepStore, addData } = this.props;
        const completeStore = stepStore as SurveyStore;
        const questions = demographicQuestions;

        const questionViews = questions.map(question => {
            return (
                <li key={question.name}>
                    <MultipleChoiceQuestion {...question} onSelect={addData.bind(completeStore)} />
                </li>
            );
        });
        return (
            <div>
                <h5>Thank you!</h5>
                <p>Please answer a few more questions, and you are all set!</p>
                <ol className="browser-default">
                    {questionViews}
                    <li>
                        <p>Do you have any general comment you would like to provide? (optional)</p>
                        <textarea
                            type="text"
                            name="comment"
                            className="materialize-textarea"
                            onChange={this._onChange.bind(this)}
                        />
                    </li>
                </ol>
            </div>
        );
    }

    private _onChange(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const { addData, stepStore } = this.props;
        addData.bind(stepStore)('comment', event.currentTarget.value);
    }
}
