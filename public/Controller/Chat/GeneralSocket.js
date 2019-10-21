const LIST_CHAT_GENERAL = "lcg";

let listChat;

/**
 * @bardiademon
 */
const connectGeneral = () =>
{
    checkIsLogin ((login) =>
    {
        if (login)
        {
            Connect (() =>
            {
                getListChat (LIST_CHAT_GENERAL)
            });
        }
    });

};

/**
 * @bardiademon
 * @param chat
 */
const getListChat = (chat) =>
{
    listChat = chat;
    if (SocketIO.connected)
    {
        SocketIO.emit ("get_list_chat" , {'code_login': $.cookie ('code') , 'what': chat});
        SocketIO.once ('list_chat' , (data) =>
        {

        });
    }
    else
    {
        Connect (() =>
        {
            getListChat (listChat);
        });
    }
};