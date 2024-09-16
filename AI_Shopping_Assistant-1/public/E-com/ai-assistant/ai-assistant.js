// ai-assistant/ai-assistant.js

// Create the assistant UI dynamically
function createAssistantUI() {
    const assistantContainer = document.createElement('div');
    assistantContainer.id = 'ai-assistant-container';
    assistantContainer.style.position = 'fixed';
    assistantContainer.style.bottom = '20px';
    assistantContainer.style.right = '20px';
    assistantContainer.style.width = '300px';
    assistantContainer.style.height = '400px';
    assistantContainer.style.border = '1px solid #ccc';
    assistantContainer.style.background = '#fff';
    assistantContainer.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.1)';
    assistantContainer.style.borderRadius = '10px';
    assistantContainer.style.display = 'none'; // Initially hidden
  
    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Need Help? Chat with us!';
    toggleButton.className = 'toggle-button';
    
    // Function to toggle the chat visibility
    toggleButton.onclick = () => {
      assistantContainer.style.display =
        assistantContainer.style.display === 'none' ? 'block' : 'none';
    };
  
    // Chat Window Structure
    assistantContainer.innerHTML = `
      <div class="chat-header">
        <h3>AI Assistant</h3>
        <button class="close-btn">X</button>
      </div>
      <div class="chat-body">
        <p>How can I assist you today?</p>
      </div>
      <div class="chat-input-container">
        <input type="text" class="chat-input" placeholder="Type your message..." />
        <button class="send-btn">Send</button>
      </div>
    `;
  
    // Add the assistant container and toggle button to the page
    document.body.appendChild(assistantContainer);
    document.body.appendChild(toggleButton);
  
    // Close button functionality
    assistantContainer.querySelector('.close-btn').onclick = () => {
      assistantContainer.style.display = 'none';
    };
  }
  
  // Initialize the Assistant when the DOM is loaded
  document.addEventListener('DOMContentLoaded', createAssistantUI);
  