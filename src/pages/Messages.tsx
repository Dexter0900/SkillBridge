import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { conversations, messages as allMessages, users } from '../data/dummyData';
import { FiSearch, FiSend, FiMoreVertical, FiUser, FiChevronLeft } from 'react-icons/fi';
import Button from '../components/ui/Button';
import { format } from 'date-fns';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter conversations for the current user
  const userConversations = conversations.filter(
    conversation => conversation.participants.some(p => p.id === user?.id)
  );
  
  // Filter conversations based on search term
  const filteredConversations = userConversations.filter(conversation => {
    const otherParticipant = conversation.participants.find(p => p.id !== user?.id);
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Get messages for the active conversation
  const conversationMessages = activeConversation
    ? allMessages.filter(
        message => 
          (message.sender.id === user?.id && message.recipient.id === getOtherParticipant(activeConversation)?.id) ||
          (message.recipient.id === user?.id && message.sender.id === getOtherParticipant(activeConversation)?.id)
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];
  
  // Get the other participant in a conversation
  function getOtherParticipant(conversationId: string) {
    const conversation = userConversations.find(c => c.id === conversationId);
    return conversation?.participants.find(p => p.id !== user?.id);
  }
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !activeConversation) return;
    
    // In a real app, this would send the message to the API
    console.log(`Sending message to ${getOtherParticipant(activeConversation)?.name}: ${newMessage}`);
    
    // Clear the input
    setNewMessage('');
  };
  
  // Scroll to bottom of messages when conversation changes or new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);
  
  // Handle opening a conversation on mobile
  const handleOpenConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setShowMobileConversation(true);
  };
  
  // Handle going back to conversation list on mobile
  const handleBackToList = () => {
    setShowMobileConversation(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow flex overflow-hidden">
        {/* Conversation List */}
        <div 
          className={`w-full md:w-1/3 bg-white border-r ${
            showMobileConversation ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="form-input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation.id);
                const isActive = activeConversation === conversation.id;
                
                return (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      isActive ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => handleOpenConversation(conversation.id)}
                  >
                    <div className="flex items-start">
                      <img
                        src={otherParticipant?.avatar || 'https://via.placeholder.com/40'}
                        alt={otherParticipant?.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 truncate">{otherParticipant?.name}</h3>
                          <span className="text-xs text-gray-500">
                            {format(conversation.lastMessage.timestamp, 'MMM d')}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm truncate mt-1">
                          {conversation.lastMessage.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary-500 rounded-full mt-1">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500">
                {searchTerm ? 'No conversations match your search.' : 'No conversations yet.'}
              </div>
            )}
          </div>
        </div>
        
        {/* Conversation */}
        <div 
          className={`w-full md:w-2/3 flex flex-col bg-gray-50 ${
            !showMobileConversation && !activeConversation ? 'hidden md:flex' : 
            !showMobileConversation ? 'hidden' : 'flex'
          }`}
        >
          {activeConversation ? (
            <>
              {/* Conversation Header */}
              <div className="bg-white p-4 border-b flex items-center">
                <button 
                  className="md:hidden mr-2 text-gray-600"
                  onClick={handleBackToList}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <img
                  src={getOtherParticipant(activeConversation)?.avatar || 'https://via.placeholder.com/40'}
                  alt={getOtherParticipant(activeConversation)?.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">
                    {getOtherParticipant(activeConversation)?.name}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {getOtherParticipant(activeConversation)?.role}
                  </p>
                </div>
                <button className="text-gray-600 p-1 rounded-full hover:bg-gray-100">
                  <FiMoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                  {conversationMessages.map((message) => {
                    const isCurrentUser = message.sender.id === user?.id;
                    
                    return (
                      <div 
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isCurrentUser && (
                          <img
                            src={message.sender.avatar || 'https://via.placeholder.com/40'}
                            alt={message.sender.name}
                            className="w-8 h-8 rounded-full mr-2 self-end"
                          />
                        )}
                        <div 
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            isCurrentUser 
                              ? 'bg-primary-500 text-white rounded-br-none' 
                              : 'bg-white text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p 
                            className={`text-xs mt-1 text-right ${
                              isCurrentUser ? 'text-primary-100' : 'text-gray-500'
                            }`}
                          >
                            {format(message.timestamp, 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Message Input */}
              <div className="bg-white p-4 border-t">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="form-input flex-grow mr-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ''}
                    leftIcon={<FiSend />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <FiUser className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
              <p className="text-gray-600 max-w-md">
                Select a conversation from the list to view messages or start a new conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;