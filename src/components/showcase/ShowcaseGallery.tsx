import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useSound } from '../../hooks/useSound';
import { AnimatedSection } from '../common/AnimatedSection';
import { SPACING } from '../../constants/spacing';

// Showcase Item Component
function ShowcaseItem({ title, category, backgroundColor, delay, children, isInteractive = false, interactiveComponent }: {
  title: string;
  category: string;
  backgroundColor: string;
  delay: number;
  children: React.ReactNode;
  isInteractive?: boolean;
  interactiveComponent?: React.ReactNode;
}) {
  const { playHoverSound } = useSound();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClick = () => {
    if (isInteractive) {
      setIsModalOpen(true);
      playHoverSound(900, 200, 0.2);
    }
  };

  return (
    <>
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        onMouseEnter={() => playHoverSound(600 + delay * 100, 120, 0.1)}
        onClick={handleClick}
      >
        <motion.div
          className="relative h-[240px] md:h-[320px] overflow-hidden rounded-[12px] md:rounded-[16px] shadow-lg"
          style={{ backgroundColor }}
          whileHover={{ 
            scale: window.innerWidth < 768 ? 1.02 : 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {children}
          
          {/* Overlay with title and category */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="font-['Lora:Medium',_sans-serif] text-lg md:text-xl tracking-[-0.02em]">
                {title}
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] text-sm md:text-base tracking-[-0.01em] opacity-80">
                {category}
              </div>
              {isInteractive && (
                <div className="flex items-center gap-2 mt-2 text-xs opacity-90">
                  <span>🚀</span>
                  <span>Click to interact</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Interactive Modal */}
      {isInteractive && isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="relative bg-gray-900 shadow-2xl overflow-hidden w-full h-full md:w-[375px] md:h-[667px] md:rounded-[24px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white w-8 h-8 rounded-full items-center justify-center hidden md:flex"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </motion.button>
            
            {interactiveComponent ? (
              React.cloneElement(interactiveComponent as React.ReactElement, { onClose: () => setIsModalOpen(false) })
            ) : (
              <InteractiveShoppingApp onClose={() => setIsModalOpen(false)} />
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// UI Showcase Components
function UIShowcase1() {
  return (
    <div className="absolute inset-2 bg-gray-900 rounded-[12px] overflow-hidden">
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-40"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
        </div>
      </div>
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🛍️</span>
          </div>
          <span className="text-gray-800 text-sm font-medium">Shop</span>
        </div>
        <div className="relative p-2">
          <span className="text-lg">🛒</span>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-3">
        <div className="text-center mb-3">
          <h3 className="text-gray-800 text-sm font-medium mb-1">Featured Products</h3>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-1 rounded-full bg-green-500"></div>
            <div className="w-2 h-1 rounded-full bg-gray-300"></div>
            <div className="w-2 h-1 rounded-full bg-gray-300"></div>
            <div className="w-2 h-1 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <div className="w-full h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-2xl">🎧</span>
          </div>
          <h4 className="text-gray-800 text-sm font-medium mb-1">Wireless Earbuds</h4>
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-lg font-bold">$89</span>
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Add to Cart
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="bg-gray-200 p-2 rounded-full opacity-50">←</div>
          <div className="bg-gray-200 p-2 rounded-full">→</div>
        </div>
      </div>
    </div>
  );
}

function InteractiveShoppingApp({ onClose }: { onClose?: () => void }) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { playHoverSound } = useSound();

  const products = [
    { id: 1, name: "Wireless Earbuds", price: 89, emoji: "🎧", description: "Premium sound quality" },
    { id: 2, name: "Smart Watch", price: 249, emoji: "⌚", description: "Track your fitness" },
    { id: 3, name: "Phone Case", price: 29, emoji: "📱", description: "Protect your device" },
    { id: 4, name: "Charging Cable", price: 19, emoji: "🔌", description: "Fast charging" }
  ];

  const addToCart = (product: typeof products[0]) => {
    playHoverSound(800, 100, 0.15);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1
      }];
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      <div className="bg-black text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>9:41</span>
        {onClose && (
          <button className="md:hidden text-lg" onClick={onClose}>←</button>
        )}
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-40"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
        </div>
      </div>
      <div className="bg-white px-4 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            🛍️
          </div>
          <span className="text-gray-800 font-semibold">TechShop</span>
        </div>
        <button
          className="relative p-2"
          onClick={() => setShowCart(!showCart)}
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {!showCart ? (
        <div className="flex-1 bg-gray-50 p-4 flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-gray-800 text-lg font-semibold mb-3">Featured Products</h3>
            <div className="flex justify-center gap-2">
              {products.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentProduct ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex-1">
            <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center shadow-md">
              <span className="text-4xl">{products[currentProduct].emoji}</span>
            </div>
            <h4 className="text-gray-800 text-lg font-semibold mb-2">{products[currentProduct].name}</h4>
            <p className="text-gray-600 text-sm mb-4">{products[currentProduct].description}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 text-2xl font-bold">${products[currentProduct].price}</span>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-green-600 transition-colors"
                onClick={() => addToCart(products[currentProduct])}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-200 p-4 rounded-full disabled:opacity-50"
              disabled={currentProduct === 0}
              onClick={() => setCurrentProduct(prev => Math.max(0, prev - 1))}
            >
              ←
            </button>
            <button
              className="bg-gray-200 p-4 rounded-full disabled:opacity-50"
              disabled={currentProduct === products.length - 1}
              onClick={() => setCurrentProduct(prev => Math.min(products.length - 1, prev + 1))}
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-gray-50 flex flex-col">
          <div className="bg-white px-4 py-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 text-lg font-semibold">Cart ({totalItems})</h3>
              <button
                className="text-gray-500 flex items-center gap-2"
                onClick={() => setShowCart(false)}
              >
                ← Back
              </button>
            </div>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center py-20 flex-1 flex flex-col justify-center">
              <span className="text-6xl mb-4">🛒</span>
              <span className="text-gray-400 text-lg">Your cart is empty</span>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl mb-3 p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🎧</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-gray-800 font-semibold">{item.name}</h5>
                      <p className="text-green-600 font-bold">${item.price}</p>
                    </div>
                    <span className="text-lg font-medium px-3 py-1 bg-gray-100 rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-800 text-xl font-semibold">Total:</span>
                  <span className="text-green-600 text-3xl font-bold">${totalPrice}</span>
                </div>
                <button className="w-full bg-green-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-600 transition-colors">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function UIShowcase2() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl w-full h-full shadow-xl p-4 space-y-3 text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">🤖</div>
          <div>
            <div className="text-sm font-semibold">AI Assistant</div>
            <div className="text-[10px] text-gray-400">Online</div>
          </div>
          <div className="ml-auto flex items-center gap-1 text-[10px] text-gray-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Live
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl px-3 py-2 text-xs max-w-[80%]">
              Hi Petkov! Need help summarizing your case study?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-purple-600 rounded-2xl px-3 py-2 text-xs max-w-[80%]">
              Yes, highlight the conversion improvements please.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl px-3 py-2 text-xs max-w-[80%]">
              Got it! Crafting a concise summary with metrics…
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 text-xs text-gray-400">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          AI is typing…
        </div>
      </div>
    </div>
  );
}

function InteractiveAIChat({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai', text: string }>>([
    { role: 'ai', text: "Hello! I'm an AI assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { playHoverSound, playSuccessSound } = useSound();
  
  const aiResponses = [
    "That's an interesting question! Let me think about that...",
    "Great point! Here's what I think:",
    "I understand what you're asking. Here's my take:",
    "That's a fascinating topic! Based on my knowledge:",
    "Thanks for asking! Here's what I can tell you:",
  ];
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);
    playSuccessSound();
    
    // Simulate AI typing
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="w-full h-full bg-gray-900 flex flex-col text-white">
      {onClose && (
        <button className="md:hidden absolute top-4 left-4 z-10 text-lg" onClick={onClose}>←</button>
      )}
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-lg">🤖</span>
        </div>
        <div>
          <div className="font-semibold">AI Assistant</div>
          <div className="text-xs text-gray-400">Online</div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-100'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onMouseEnter={() => playHoverSound(600, 50, 0.05)}
          />
          <motion.button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => playHoverSound(700, 100, 0.1)}
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
}

function UIShowcase3() {
  const tasks = [
    { text: 'Design onboarding flow', tag: 'Design', done: false },
    { text: 'Update case study copy', tag: 'Content', done: true },
    { text: 'Share prototype link', tag: 'Review', done: false },
  ];
  return (
    <div className="absolute inset-4 flex flex-col gap-2">
      <div className="bg-white rounded-2xl p-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] w-full h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-700">Today</div>
          <div className="text-xs text-gray-400">3 tasks</div>
        </div>
        <div className="space-y-2 flex-1">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl border ${
                task.done ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.done ? 'border-green-500 bg-green-500 text-white text-[10px]' : 'border-gray-300'
              }`}>
                {task.done ? '✓' : ''}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.text}
                </div>
                <div className="text-[10px] text-gray-400">{task.tag}</div>
              </div>
              <div className="text-[10px] text-gray-300">···</div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xs text-gray-500 bg-gray-100 rounded-xl px-3 py-2 text-center">+ Add new task</div>
        </div>
      </div>
    </div>
  );
}

function InteractiveTaskManager({ onClose }: { onClose?: () => void }) {
  const [tasks, setTasks] = useState<Array<{ id: number, text: string, completed: boolean }>>([
    { id: 1, text: "Design new landing page", completed: false },
    { id: 2, text: "Review user feedback", completed: true },
    { id: 3, text: "Update portfolio", completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const { playHoverSound, playSuccessSound } = useSound();
  
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
    playSuccessSound();
  };
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    playHoverSound(600, 100, 0.1);
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    playHoverSound(400, 100, 0.1);
  };
  
  return (
    <div className="w-full h-full bg-gray-900 flex flex-col text-white">
      {onClose && (
        <button className="md:hidden absolute top-4 left-4 z-10 text-lg" onClick={onClose}>←</button>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold mb-6">Task Manager</h3>
        
        {/* Add Task */}
        <form onSubmit={addTask} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <motion.button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHoverSound(700, 100, 0.1)}
            >
              Add
            </motion.button>
          </div>
        </form>
        
        {/* Tasks List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-lg p-4 flex items-center gap-3"
            >
              <motion.button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {task.completed && <span className="text-white text-xs">✓</span>}
              </motion.button>
              <span className={`flex-1 ${task.completed ? 'line-through opacity-50' : ''}`}>
                {task.text}
              </span>
              <motion.button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-500 px-2"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-400 text-center">
          {tasks.filter(t => !t.completed).length} tasks remaining
        </div>
      </div>
    </div>
  );
}

function UIShowcase4() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-gradient-to-b from-[#4facfe] to-[#00f2fe] rounded-2xl p-4 w-full h-full shadow-2xl text-white flex flex-col justify-between">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em]">Now Playing</div>
          <div className="text-lg font-semibold">Midnight Dreams</div>
          <div className="text-xs text-white/70">Synthwave • 3:24</div>
        </div>
        <div className="w-24 h-24 mx-auto rounded-full border-4 border-white/60 flex items-center justify-center text-3xl">
          🎧
        </div>
        <div>
          <div className="h-1 bg-white/40 rounded-full mb-2">
            <div className="h-full w-2/3 bg-white rounded-full"></div>
          </div>
          <div className="flex justify-between text-[10px] text-white/80 mb-3">
            <span>1:23</span>
            <span>3:24</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-lg">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">⏮</div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">▶</div>
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">⏭</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractiveMusicPlayer({ onClose }: { onClose?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const { playHoverSound, playSuccessSound } = useSound();
  
  const tracks = [
    { title: "Midnight Dreams", artist: "Synthwave", duration: "3:24" },
    { title: "Electric Pulse", artist: "Electronic", duration: "4:12" },
    { title: "Neon Nights", artist: "Retro Wave", duration: "2:58" }
  ];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playSuccessSound();
  };
  
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    playHoverSound(700, 100, 0.1);
  };
  
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    playHoverSound(700, 100, 0.1);
  };
  
  return (
    <div className="w-full h-full bg-gray-900 flex flex-col text-white">
      {onClose && (
        <button className="md:hidden absolute top-4 left-4 z-10 text-lg" onClick={onClose}>←</button>
      )}
      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* Album Art */}
        <motion.div
          className="w-full max-w-xs mx-auto mb-8 aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          <span className="text-6xl">🎵</span>
        </motion.div>
        
        {/* Track Info */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-1">{tracks[currentTrack].title}</h3>
          <p className="text-gray-400">{tracks[currentTrack].artist}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1 bg-gray-700 rounded-full mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isPlaying ? '45%' : '45%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>1:23</span>
            <span>{tracks[currentTrack].duration}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.button
            onClick={prevTrack}
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => playHoverSound(600, 50, 0.05)}
          >
            ⏮
          </motion.button>
          <motion.button
            onClick={togglePlay}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => playHoverSound(700, 100, 0.1)}
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>
          <motion.button
            onClick={nextTrack}
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => playHoverSound(600, 50, 0.05)}
          >
            ⏭
          </motion.button>
        </div>
        
        {/* Volume */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-400 w-10">{volume}%</span>
        </div>
      </div>
    </div>
  );
}

function UIShowcase5() {
  const keypad = [
    'C', '÷', '×', '⌫',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.', '', '',
  ];
  return (
    <div className="absolute inset-4 flex flex-col justify-center">
      <div className="bg-gray-900 rounded-2xl p-4 shadow-xl w-full h-full flex flex-col text-white">
        <div className="bg-gray-800 rounded-xl p-3 mb-3 text-right">
          <div className="text-lg font-mono">12,348.56</div>
          <div className="text-xs text-gray-500">+ 452 × 18</div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
          {keypad.map((key, idx) => (
            key ? (
              <div
                key={idx}
                className={`h-10 rounded-xl flex items-center justify-center ${
                  key === '=' ? 'bg-green-500 text-white' :
                  key === 'C' ? 'bg-red-500/30 text-red-300' :
                  '÷×-+'.includes(key) ? 'bg-gray-800 text-pink-300' :
                  key === '⌫' ? 'bg-gray-800 text-gray-300' :
                  'bg-gray-800/80 text-white'
                }`}
              >
                {key}
              </div>
            ) : <div key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveCalculator({ onClose }: { onClose?: () => void }) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const { playHoverSound } = useSound();
  
  const handleNumber = (num: string) => {
    playHoverSound(600, 50, 0.05);
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };
  
  const handleOperation = (op: string) => {
    playHoverSound(700, 100, 0.1);
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setDisplay('0');
      setOperation(op);
    } else {
      calculate();
      setOperation(op);
    }
  };
  
  const calculate = () => {
    if (previousValue === null || operation === null) return;
    
    const current = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '×':
        result = previousValue * current;
        break;
      case '÷':
        result = previousValue / current;
        break;
    }
    
    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    playHoverSound(800, 150, 0.15);
  };
  
  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    playHoverSound(400, 100, 0.1);
  };
  
  // Button definitions with proper grid positioning
  const buttonConfigs = [
    // Row 1: C, ÷, ×, ⌫
    { label: 'C', action: clear, className: 'bg-red-100 hover:bg-red-200 text-red-600 border border-red-200' },
    { label: '÷', action: () => handleOperation('÷'), className: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100' },
    { label: '×', action: () => handleOperation('×'), className: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100' },
    { label: '⌫', action: () => setDisplay(display.slice(0, -1) || '0'), className: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100' },
    // Row 2: 7, 8, 9, -
    { label: '7', action: () => handleNumber('7'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '8', action: () => handleNumber('8'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '9', action: () => handleNumber('9'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '-', action: () => handleOperation('-'), className: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100' },
    // Row 3: 4, 5, 6, +
    { label: '4', action: () => handleNumber('4'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '5', action: () => handleNumber('5'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '6', action: () => handleNumber('6'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '+', action: () => handleOperation('+'), className: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100' },
    // Row 4: 1, 2, 3, = (equals spans 2 rows)
    { label: '1', action: () => handleNumber('1'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '2', action: () => handleNumber('2'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '3', action: () => handleNumber('3'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
    { label: '=', action: calculate, className: 'bg-green-500 hover:bg-green-600 text-white border border-green-600', span: 'row-span-2' },
    // Row 5: 0 (spans 2 cols), .
    { label: '0', action: () => handleNumber('0'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200', span: 'col-span-2' },
    { label: '.', action: () => setDisplay(display.includes('.') ? display : display + '.'), className: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200' },
  ];
  
  return (
    <div className="w-full h-full bg-white flex flex-col text-gray-900">
      {onClose && (
        <button className="md:hidden absolute top-4 left-4 z-10 text-lg text-gray-600" onClick={onClose}>←</button>
      )}
      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* Display */}
        <div className="bg-gray-100 rounded-xl p-6 mb-6 text-right shadow-inner border border-gray-200">
          <div className="text-3xl font-mono font-semibold text-gray-900 overflow-x-auto">
            {display}
          </div>
          {operation && previousValue !== null && (
            <div className="text-sm text-gray-500 mt-1">
              {previousValue} {operation}
            </div>
          )}
        </div>
        
        {/* Keypad Container */}
        <div className="w-full grid grid-cols-4 gap-2">
          {buttonConfigs.map((btn, i) => (
            <motion.button
              key={i}
              onClick={btn.action}
              className={`${btn.className} ${btn.span || ''} w-full flex items-center justify-center h-12 rounded-xl font-semibold text-lg transition-colors shadow-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UIShowcase6() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-4 w-full shadow-lg space-y-3">
        <div className="relative">
          <input
            className="w-full bg-gray-100 rounded-xl py-2 pl-8 pr-3 text-sm text-gray-600"
            value="Search prototype inspiration"
            readOnly
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>
        <div className="space-y-2">
          {[
            { title: 'AI Product Strategy', badge: 'Case Study' },
            { title: 'Motion System Library', badge: 'Component' },
            { title: 'Design Ops Workflow', badge: 'Guide' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                <div className="text-[11px] text-gray-400">Updated 2 days ago</div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-lg bg-pink-100 text-pink-600">{item.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveSearch({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ title: string, description: string, category: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { playHoverSound, playSuccessSound } = useSound();
  
  const mockResults = [
    { title: "React Design Patterns", description: "Best practices for building scalable React applications", category: "Development" },
    { title: "UI/UX Design Principles", description: "Essential design guidelines for modern interfaces", category: "Design" },
    { title: "Motion Design Guide", description: "Creating smooth animations and transitions", category: "Design" },
    { title: "TypeScript Advanced", description: "Deep dive into TypeScript features and patterns", category: "Development" }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    playSuccessSound();
    
    // Simulate search delay
    setTimeout(() => {
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : mockResults);
      setIsSearching(false);
    }, 800);
  };
  
  return (
    <div className="w-full h-full bg-gray-900 flex flex-col text-white">
      {onClose && (
        <button className="md:hidden absolute top-4 left-4 z-10 text-lg" onClick={onClose}>←</button>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold mb-6">Search Interface</h3>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              onMouseEnter={() => playHoverSound(600, 50, 0.05)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}
          </div>
        </form>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 cursor-pointer transition-colors"
              onClick={() => playHoverSound(600, 100, 0.1)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-lg">{result.title}</h4>
                <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded">{result.category}</span>
              </div>
              <p className="text-sm text-gray-400">{result.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Showcase Gallery Component
export function ShowcaseGallery() {
  return (
    <AnimatedSection 
      className="relative w-full bg-gradient-to-b from-[#f7f6f3] to-[#f0f0ed]" 
      data-section="showcase"
    >
      <div className={`mx-auto ${SPACING.maxWidth.content} ${SPACING.container.combined}`}>
        <div className={`flex flex-col ${SPACING.gap.large} py-12 md:py-16`}>
          
          {/* Section Header */}
          <div className="w-full text-center space-y-4">
            <motion.h2
              className="font-['Lora:Medium',_sans-serif] text-3xl md:text-5xl text-[#150c0c] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Interactive Showcase
            </motion.h2>
            <motion.p
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-lg md:text-xl text-[#7c736a] tracking-[-0.01em] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A collection of UI components, interactions, and design explorations crafted with attention to detail and user experience.
            </motion.p>
          </div>

          {/* Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            <ShowcaseItem
              title="Shopping App Interface"
              category="Mobile E-commerce"
              backgroundColor="#667eea"
              delay={0}
              isInteractive={true}
            >
              <UIShowcase1 />
            </ShowcaseItem>

            <ShowcaseItem
              title="AI Chat Interface"
              category="Conversational UI"
              backgroundColor="#764ba2"
              delay={0.1}
              isInteractive={true}
              interactiveComponent={<InteractiveAIChat />}
            >
              <UIShowcase2 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Task Manager"
              category="Productivity App"
              backgroundColor="#f093fb"
              delay={0.2}
              isInteractive={true}
              interactiveComponent={<InteractiveTaskManager />}
            >
              <UIShowcase3 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Music Player"
              category="Media Controls"
              backgroundColor="#4facfe"
              delay={0.3}
              isInteractive={true}
              interactiveComponent={<InteractiveMusicPlayer />}
            >
              <UIShowcase4 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Calculator"
              category="Utility App"
              backgroundColor="#43e97b"
              delay={0.4}
              isInteractive={true}
              interactiveComponent={<InteractiveCalculator />}
            >
              <UIShowcase5 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Search Interface"
              category="Search & Discovery"
              backgroundColor="#fa709a"
              delay={0.5}
              isInteractive={true}
              interactiveComponent={<InteractiveSearch />}
            >
              <UIShowcase6 />
            </ShowcaseItem>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


