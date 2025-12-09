// Chatbot response handler
class ChatBot {
    constructor() {
        this.conversationHistory = [];
        this.isTyping = false;
    }

    // Main function to handle user messages and generate responses
    async handleMessage(message) {
        try {
            // Add user message to history
            this.conversationHistory.push({
                role: 'user',
                content: message,
                timestamp: new Date()
            });

            // Simulate typing indicator
            this.isTyping = true;
            this.updateTypingIndicator(true);

            // Generate response based on message content
            const response = await this.generateResponse(message);

            // Add bot response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response,
                timestamp: new Date()
            });

            this.isTyping = false;
            this.updateTypingIndicator(false);

            return response;
        } catch (error) {
            console.error('Error handling message:', error);
            this.isTyping = false;
            this.updateTypingIndicator(false);
            return 'Sorry, I encountered an error. Please try again.';
        }
    }

    // Generate appropriate response based on user input
    async generateResponse(message) {
        const lowerMessage = message.toLowerCase().trim();

        // Handle greetings
        if (this.isGreeting(lowerMessage)) {
            return this.getGreetingResponse();
        }

        // Handle groundwater-related queries
        if (this.isGroundwaterQuery(lowerMessage)) {
            return this.getGroundwaterResponse(message);
        }

        // Handle data query help
        if (this.isQueryHelp(lowerMessage)) {
            return this.getQueryHelpResponse();
        }

        // Handle general assistance
        if (this.isGeneralHelp(lowerMessage)) {
            return this.getGeneralHelpResponse();
        }

        // Default response
        return this.getDefaultResponse(message);
    }

    // Check if message is a greeting
    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
        return greetings.some(greeting => message.includes(greeting));
    }

    // Check if message is groundwater-related
    isGroundwaterQuery(message) {
        const keywords = ['groundwater', 'water', 'level', 'extraction', 'stage', 'ham', 'assessment', 'categorization'];
        return keywords.some(keyword => message.includes(keyword));
    }

    // Check if message is asking for query help
    isQueryHelp(message) {
        const keywords = ['how to', 'query', 'search', 'find', 'filter', 'state', 'district', 'block'];
        return keywords.some(keyword => message.includes(keyword));
    }

    // Check if message is asking for general help
    isGeneralHelp(message) {
        const keywords = ['help', 'assist', 'what can you do', 'features', 'guide'];
        return keywords.some(keyword => message.includes(keyword));
    }

    // Get greeting response
    getGreetingResponse() {
        const responses = [
            "Hello! I'm JalSathi, your groundwater assistant. How can I help you today?",
            "Hi there! I'm here to assist you with groundwater data and information. What would you like to know?",
            "Greetings! I'm JalSathi, ready to help you explore groundwater information. How can I assist you?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Get groundwater-related response
    getGroundwaterResponse(message) {
        if (message.toLowerCase().includes('extraction')) {
            return "Groundwater extraction refers to the amount of water being withdrawn from aquifers. In the context of groundwater assessment, 'Ham' refers to the unit of measurement used in India. Higher extraction rates relative to annual extractable groundwater can indicate stress on the aquifer.";
        }

        if (message.toLowerCase().includes('stage')) {
            return "The groundwater stage percentage indicates the level of groundwater development. It's calculated as (Total Extraction / Annual Extractable) × 100. Values above 100% suggest over-exploitation.";
        }

        if (message.toLowerCase().includes('categorization')) {
            return "Groundwater blocks are categorized as:\n• Safe (<70% stage)\n• Semi-critical (70-90% stage)\n• Critical (90-100% stage)\n• Over-exploited (>100% stage)\n\nThis helps identify areas needing water management attention.";
        }

        return "I can help you understand groundwater data including extraction rates, development stages, and categorization. You can query data by selecting state, district, and block from the main interface. What specific aspect would you like to learn about?";
    }

    // Get query help response
    getQueryHelpResponse() {
        return "Here's how to query groundwater data:\n\n1. **Select Location**: Choose your state, then district, then block/assessment unit\n2. **Choose Years**: Select 2023, 2024, or both\n3. **Get Data**: Click the 'Get Data' button\n\nThe results will show:\n• Annual Extractable groundwater (in Ham)\n• Total Extraction (in Ham)\n• Development Stage (%)\n• Categorization status\n\nTry it now by making selections in the main panel!";
    }

    // Get general help response
    getGeneralHelpResponse() {
        return "I'm JalSathi, your groundwater assistant! I can help you with:\n\n• **Understanding groundwater data** - Explain terms like extraction, stage, categorization\n• **Query guidance** - Help you navigate the data interface\n• **Location information** - Guide you through states, districts, and blocks\n• **Data interpretation** - Explain what the numbers mean\n\nWhat would you like to explore?";
    }

    // Get default response
    getDefaultResponse(message) {
        const responses = [
            "I'm not sure I understand. Could you rephrase your question about groundwater data?",
            "I'd be happy to help with groundwater information. Try asking about extraction rates, development stages, or how to query the data.",
            "I'm here to assist with groundwater data and queries. What specific information are you looking for?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Update typing indicator (to be implemented in UI)
    updateTypingIndicator(isTyping) {
        // This will be handled by the UI component
        if (window.chatbotUI) {
            window.chatbotUI.setTyping(isTyping);
        }
    }

    // Get conversation history
    getHistory() {
        return this.conversationHistory;
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
    }
}

// Initialize chatbot instance
const chatbot = new ChatBot();

// Export for use in other files
window.ChatBot = ChatBot;
window.chatbotInstance = chatbot;
