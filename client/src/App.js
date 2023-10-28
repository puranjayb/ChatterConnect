import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes component
import Register from './components/Register';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Chat Application</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/chat" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
