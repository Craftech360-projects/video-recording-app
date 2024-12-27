// import React from 'react';
// import VideoRecorder from './components/VideoRecorder';

// function App() {
//   return <VideoRecorder />;
// }

// export default App;
// src/App.tsx
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import VideoStatusPage from './components/VideoStatusChecker';
import VideoRecorder from './components/VideoRecorder';

const App = () => {
  return (
    <BrowserRouter>
      {/* <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Video App</Link>
          <div className="space-x-4">
            <Link to="/form" className="hover:text-gray-300">Check Status</Link>
          </div>
        </div>
      </nav> */}

      <Routes>
        <Route path="/" element={<VideoRecorder />} />
        <Route path="/form" element={<VideoStatusPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;