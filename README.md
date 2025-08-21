# FullStack Video Conferencing Application using(NestJs + WebRTC + Socket.io)

This project is a real-time video conferencing application built using **WebRTC** for peer-to-peer communication and **WebSockets** for signaling. It allows users to join meetings, share audio and video, send chat messages, share files, and raise hands to indicate they want to speak. The application also supports screen sharing and meeting recording.

---

## Features

- **Real-Time Video and Audio Communication**:
  - Join meetings with audio and video.
  - Mute/unmute audio and turn video on/off.
  - Share your screen with other participants.

- **Chat**:
  - Send text messages to other participants in real-time.

- **File Sharing**:
  - Upload and share files with other participants.

- **Hand Raise**:
  - Raise your hand to indicate you want to speak.

- **Recording**:
  - Record the meeting (screen and audio) and save it as a `.webm` file.

- **User Management**:
  - See a list of participants in the meeting.
  - Notifications when users join or leave the meeting.

---

## Technologies Used

- **WebRTC**: For peer-to-peer audio and video communication.
- **WebSockets**: For real-time signaling between clients and the server.
- **Express.js**: For the backend server.
- **Socket.IO**: For WebSocket communication.
- **MediaStream API**: For capturing audio, video, and screen sharing.
- **MediaRecorder API**: For recording meetings.
- **HTML/CSS/JavaScript**: For the frontend UI.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/video-conferencing-app.git
   cd video-conferencing-app
   npm install
   npm run start:dev
