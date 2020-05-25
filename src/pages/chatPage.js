import React, { Component } from "react";
import Navbar from "../components/Navbar";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

function ChatPage(props) {
  const config = {
    width: "990px",
    height: "600px",
    //floating: true,
  };

  const Container = styled.div`
    margin-bottom: 15px;
    margin-left:60px;
    border-radius: 3px;
    width: 220px;

    display: flex;
    flex-direction: column;
  `;

  const theme = {
    background: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#00B2B2",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#00B2B2",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c",
    marginTop: "25px",
    marginBottom: "25px",
  };

  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to BeGreen Nutritionist chat service!",
      trigger: "Help",
    },
    {
      id: "Help",
      message: "I'm Ariadna, how can help you?",
      trigger: "Waiting user input for help",
    },
    {
      id: "Waiting user input for help",
      user: true,
      trigger: "Asking options to eat",
    },
    {
      id: "Asking options to eat",
      message: "{previousValue}?, why don't we set a videocall",
      trigger: "Done",
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true,
    },
  ];
  return (
    <div>
      <Navbar />
      <Container>
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} {...config} />
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default ChatPage;
