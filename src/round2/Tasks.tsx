import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreProps } from 'src/round2/store';
import { Header, Paragraph } from 'src/components';
import { MessageResponse } from 'src/components/MessageResponse';
import { Progress } from 'src/components/Progress';
import { getConversation } from 'src/store';

@observer
export class Tasks extends React.Component<IStoreProps, void> {
    public render() {
        const { store: { currentTaskIndex, tasks, addResponse, getNextTask } } = this.props;

        const percentage = (currentTaskIndex / tasks.length * 100).toFixed(1);
        return (
            <div>
                <Header>Emotion Assistance</Header>
                <Paragraph>
                    You are using a new chat app to communicate with someone. As you use the app, the chat assistant
                    will help you understand more about your contacts as you chat with them.
                </Paragraph>
                <Progress percentage={percentage} />
                {tasks.map((task, idx) => {
                    const { conversationId, treatmentType } = task;
                    const conversation = getConversation(conversationId);
                    const style =
                        currentTaskIndex === idx
                            ? {}
                            : {
                                  display: 'none'
                              };
                    return (
                        <div style={style}>
                            <MessageResponse
                                conversation={conversation}
                                treatmentType={treatmentType}
                                onChange={response => addResponse(conversationId, response)}
                                onNext={getNextTask}
                                title={`Task ${currentTaskIndex + 1} of ${tasks.length}`}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
