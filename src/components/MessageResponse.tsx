import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { TreatmentType, IConversation } from 'src/store';
import { Header, Paragraph, Prompt, Messenger } from 'src/components';
import { leftTopBox } from 'src/styles';

export interface IMessageResponseProps {
    onChange: (data: string) => void;
    treatmentType: TreatmentType;
    conversation: IConversation;
    onNext?: () => void;
    title?: string;
}

@observer
export class MessageResponse extends React.Component<IMessageResponseProps, void> {
    @observable private _canGetNext: boolean = false;
    @observable private _text: string = '';

    public render() {
        const { treatmentType, conversation, onNext, title = 'Task' } = this.props;
        const { from, to, id } = conversation;

        return (
            <div>
                <div style={leftTopBox}>
                    <Messenger conversation={conversation} treatmentType={treatmentType} />
                    <div>
                        <Header>{title}</Header>
                        <Paragraph>
                            You are {to}. You are chatting with {from} through text messages.
                        </Paragraph>
                        <div style={{ marginTop: '40px' }}>
                            <Prompt>
                                Please read the conversation to the left. Consider the context of the messages and write
                                a realistic and appropriate response to the latest message from {from}.
                            </Prompt>
                        </div>
                        <textarea
                            name={`response-${id}`}
                            placeholder="Your response goes here..."
                            className="materialize-textarea"
                            onChange={this._onChange.bind(this)}
                            value={this._text}
                        />
                        {onNext ? (
                            <a
                                className="waves-effect waves-light btn"
                                onClick={this._onNext}
                                disabled={!this._canGetNext}>
                                Next
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private _onChange(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const { onChange } = this.props;
        this._text = event.currentTarget.value;
        onChange(this._text);
        this._canGetNext = !!this._text;
    }

    @action.bound
    private _onNext() {
        const { onNext } = this.props;
        if (onNext) {
            this._canGetNext = false;
            onNext();
        }
    }
}
