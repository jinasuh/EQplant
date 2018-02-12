export interface IMessage {
    received: boolean;
    content: string;
}

export interface IConversation {
    id: string;
    messages: IMessage[];
    from: string;
}

export const getConversation = (conversationId: string) => {
    return conversations.filter(conv => conv.id === conversationId)[0];
};

const conversations: IConversation[] = [
    {
        id: 'anger1',
        from: 'David',
        messages: [
            {
                received: false,
                content: 'Sorry man, this is taking super long. You can start without me if you want'
            },
            {
                received: true,
                content: 'What the fuck dude'
            },
            {
                received: false,
                content: 'I said I’m sorry lol you can chill for liek 5 minutes i’ll be there with the chicken nuggets'
            },
            {
                received: true,
                content: 'They’d better not get cold 😄'
            }
        ]
    }
];
