import * as React from "react";
import { observer } from "mobx-react";
import { IStoreProps } from "src/store";

@observer
export class Done extends React.Component<IStoreProps, void> {
    public render() {
        return (
            <div>
                <h3>All done!</h3>
                <p>
                    Please click on the submit button below to submit your task
                    for payment. Thank you!
                </p>
            </div>
        );
    }
}
