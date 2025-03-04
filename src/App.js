import { useState, useEffect } from "react";
import "./App.css"
import dummyContacts from './data/dummyContacts.json';
import dummyConversations from './data/dummyConversations.json';

import Conversations from "./components/Conversations";

import MessageContainer from "./components/MessageContainer";
import NewConversation from "./components/NewConversation";

function App() {
  // Dummy Logged in User
  const loggedInUser = "myUser";

  // State Hooks for Contacts, Existing Conversations etc.
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState("");
  const [addingConversation, setAddingConversation] = useState(false);

  // Set the states with Dummy Data from JSON for Contacts and Conversations
  useEffect(() => {
    setContacts(dummyContacts);
    setConversations(dummyConversations);
  }, []);

  // Returns User Data for given id from Contacts
  function getUserData(userId) {
    const userIndex = contacts.map((user) => user.id).indexOf(userId);

    return contacts[userIndex];
  }

  // Returns Conversation Data for the current selected Conversation by its ID
  function getConversationData() {
    const convIndex = conversations
      .map((conv) => conv.conversationId)
      .indexOf(currentConversationId);

    return conversations[convIndex];
  }

  // Set Current Conversation Id
  function updateCurrentConversationId(id) {
    setCurrentConversationId(id);
  }

  // Handle Update/Add new messages in the given conversation
  function updateConversationMessages(conversationId, message) {
    const conversationIndex = conversations
      .map((conv) => conv.conversationId)
      .indexOf(conversationId);

    let updatedConversation = [...conversations];
    updatedConversation[conversationIndex].messages.push(message);

    console.log(updatedConversation);

    setConversations(updatedConversation);
  }

  // Handle Show/Add New Conversation of a contact
  function handleUpdateConversation(newConversation) {
    let updatedConversation = [...conversations];
    const conversationIndex = updatedConversation
      .map((conv) => conv.contactId)
      .indexOf(newConversation.contactId);

    if (conversationIndex === -1) {
      updatedConversation.push(newConversation);
      setConversations(updatedConversation);
    } else {
      setCurrentConversationId(
        updatedConversation[conversationIndex].conversationId
      );
    }

    setAddingConversation(false);
  }

  return (
    <div className="main-container">
      {addingConversation && (
        <NewConversation
          contacts={contacts}
          currentUser={loggedInUser}
          showNewConvDialog={setAddingConversation}
          updateConversation={handleUpdateConversation}
        />
      )}

      <Conversations
        conversationData={conversations}
        currentUser={loggedInUser}
        getUserData={getUserData}
        updateConversationId={updateCurrentConversationId}
        showNewConvDialog={setAddingConversation}
      />

      <MessageContainer
        getConversationData={getConversationData}
        currentUser={loggedInUser}
        getUserData={getUserData}
        onSend={updateConversationMessages}
      />
    </div>
  );
}

export default App;