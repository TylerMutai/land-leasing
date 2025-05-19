import React from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {Send} from '@mui/icons-material';
import {OpenAI} from 'openai';
import customerCareGuide from './customer-care-guide.html';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

class CustomerCareChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          role: "assistant",
          content: "Hi there! I'm here to help you with any questions about the land leasing platform. How can I assist you today?",
        },
      ],
      input: '',
      loading: false,
    };
    this.chatContainerRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    // Scroll to bottom when new messages are added
    if (this.state.messages.length !== prevState.messages.length) {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }

  handleSend = async () => {
    const {input: _input, messages} = this.state;
    if (!input.trim()) {
      return;
    }

    this.setState({loading: true});

    // Add user message
    const input = `${_input}. Refer to this for more context and a more accurate response to the query: \n\`\`\`html\n${customerCareGuide}\n\`\`\``;
    const newMessages = [...messages, {role: "user", content: input}];
    this.setState({messages: newMessages, input: ''});

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages.concat([
          {
            role: "user",
            content:,
          },
        ]),
        temperature: 0.7,
      });

      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          {role: "assistant", content: completion.choices[0].message.content},
        ],
        loading: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          {
            role: "assistant",
            content: "I apologize, but I'm having trouble processing your request. Please try again later.",
          },
        ],
        loading: false,
      }));
    }
  };

  handleInputChange = (e) => {
    this.setState({input: e.target.value});
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSend();
    }
  };

  render() {
    const {messages, input, loading} = this.state;

    return (
      <div style={{display: "flex", flexDirection: "column", position: 'fixed', bottom: "20px", right: "20px"}}>
        <Box sx={{width: '100%', maxWidth: 600, mx: 'auto', p: 2}}>
          <Paper sx={{p: 2, mb: 2}}>
            <Typography variant="h6" gutterBottom>
              Customer Care Chat
            </Typography>
            <Box
              id="chat-container"
              ref={this.chatContainerRef}
              sx={{
                maxHeight: 400,
                overflowY: 'auto',
                p: 2,
                mb: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: message.role === 'user' ? 'primary.light' : 'grey.100',
                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Typography>{message.content}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                disabled={loading}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Send/>}
                onClick={this.handleSend}
                disabled={loading || !input.trim()}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }
}

export default CustomerCareChat;