export interface IMessage {
    from: string;
    content: string;
}

export interface IConversation {
    id: string;
    messages: IMessage[];
}

export const getConversation = (conversationId: string) => {
    return conversations.filter(conv => conv.id === conversationId)[0];
};

const conversations: IConversation[] = [
    {
        id: 'default',
        messages: [
            {
                from: 'Unknown',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                from: 'me',
                content: 'Lorem ipsum.'
            },
            {
                from: 'Unknown',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut porta tellus. Etiam vel ipsum sodales, suscipit turpis consectetur, fermentum odio. Aenean sit amet eleifend nunc. '
            },
            {
                from: 'me',
                content: 'Ipsum dolor sit amet.'
            },
            {
                from: 'Unknown',
                content: 'Lorem??'
            },
            {
                from: 'Unknown',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                from: 'me',
                content: 'Lorem ipsum.'
            },
            {
                from: 'Unknown',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut porta tellus. Etiam vel ipsum sodales, suscipit turpis consectetur, fermentum odio. Aenean sit amet eleifend nunc. '
            },
            {
                from: 'me',
                content: 'Ipsum dolor sit amet.'
            },
            {
                from: 'Unknown',
                content: 'Lorem??'
            },
            {
                from: 'Unknown',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                from: 'me',
                content: 'Lorem ipsum.'
            },
            {
                from: 'Unknown',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut porta tellus. Etiam vel ipsum sodales, suscipit turpis consectetur, fermentum odio. Aenean sit amet eleifend nunc. '
            },
            {
                from: 'me',
                content: 'Ipsum dolor sit amet.'
            },
            {
                from: 'Unknown',
                content: 'Lorem??'
            }
        ]
    }
];
