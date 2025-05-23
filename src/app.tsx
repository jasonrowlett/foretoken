import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-purple-400">Foretoken is live!</h1>
      </main>
      <Footer />
    </div>
  );
};

export default App;
