import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const animals = ['🐇', '🐿️', '🦊', '🦋', '🐦', '🐱'];

const Animal = ({ emoji }) => {
    const [position, setPosition] = useState({
        x: Math.random() * 85,
        y: Math.random() * 85,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => {
                let newX = prev.x + prev.vx;
                let newY = prev.y + prev.vy;
                let newVx = prev.vx;
                let newVy = prev.vy;

                if (newX <= 0 || newX >= 95) newVx = -prev.vx;
                if (newY <= 0 || newY >= 90) newVy = -prev.vy;

                return {
                    x: Math.max(0, Math.min(95, newX)),
                    y: Math.max(0, Math.min(90, newY)),
                    vx: newVx,
                    vy: newVy
                };
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute text-3xl transition-all duration-300 ease-linear opacity-90 pointer-events-none select-none"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `scaleX(${position.vx > 0 ? 1 : -1})`
            }}
        >
            {emoji}
        </div>
    );
};

export default function ChatWithGod() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-[#FFF3D6] via-[#FFEEC5] to-[#FFF8D7] relative overflow-hidden">

            {/* Floating animals */}
            {animals.map((animal, i) => (
                <Animal key={i} emoji={animal} />
            ))}

            {/* Main layout */}
            <div className="relative z-10 h-full flex flex-col items-center px-6">

                {/* Header */}
                <div className="text-center mt-10 mb-6">
                    <div className="text-6xl opacity-80 mb-3">☁️</div>
                    <h1 className="text-5xl font-serif text-amber-900 mb-1">A Quiet Place</h1>
                    <p className="text-amber-700 text-sm italic">Speak what's in your heart</p>
                </div>

                {/* Messages */}
                <div className="flex-1 w-full max-w-3xl mb-6 space-y-4 overflow-y-auto mt-4">

                    {messages.length === 0 && (
                        <div className="text-center text-amber-600 italic mt-20">
                            God is listening...
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className="flex justify-end">
                            <div className="max-w-md px-6 py-4 rounded-3xl shadow-lg bg-amber-200 text-amber-900">
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input centered */}
                <div className="w-full flex justify-center mb-10">
                    <div className="bg-white rounded-full shadow-2xl border-2 border-amber-300 p-2 flex items-center gap-2 w-full max-w-3xl">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Share what's on your mind..."
                            className="flex-1 px-6 py-3 bg-transparent outline-none text-amber-900 placeholder-amber-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-full p-3 transition"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="fixed top-10 left-10 text-4xl opacity-30 pointer-events-none">🌿</div>
            <div className="fixed top-20 right-20 text-3xl opacity-30 pointer-events-none">🌸</div>
            <div className="fixed bottom-20 left-20 text-3xl opacity-30 pointer-events-none">🍃</div>
            <div className="fixed bottom-10 right-10 text-4xl opacity-30 pointer-events-none">🌻</div>
        </div>
    );
}
