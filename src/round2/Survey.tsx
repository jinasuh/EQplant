import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreProps } from 'src/round2/store';
import { Header, Paragraph, MultipleChoiceQuestion, Prompt } from 'src/components';
import { demographicQuestions } from 'src/store';

@observer
export class Survey extends React.Component<IStoreProps, void> {
    public render() {
        const { store } = this.props;
        const { addData } = store;
        const questions = demographicQuestions;

        const questionViews = questions.map(question => {
            return (
                <li key={question.name}>
                    <MultipleChoiceQuestion {...question} onSelect={addData} />
                </li>
            );
        });
        return (
            <div>
                <Header>Survey</Header>
                <Paragraph>Please answer a few more questions, and you are all set!</Paragraph>
                <ol className="browser-default">
                    {questionViews}
                    <li>
                        <Prompt required={false}>
                            Do you have any general comment you would like to provide? (optional)
                        </Prompt>
                        <textarea
                            type="text"
                            name="comment"
                            className="materialize-textarea"
                            placeholder="Your comments go here..."
                            onChange={this._onChange.bind(this)}
                        />
                    </li>
                </ol>
            </div>
        );
    }

    private _onChange(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const { addData } = this.props.store;
        addData('comment', event.currentTarget.value);
    }
}
