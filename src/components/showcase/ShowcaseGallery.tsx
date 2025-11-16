import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useSound } from '../../hooks/useSound';
import { AnimatedSection } from '../common/AnimatedSection';
import { SPACING } from '../../constants/spacing';

// Showcase Item Component
function ShowcaseItem({ title, category, backgroundColor, delay, children, isInteractive = false }: {
  title: string;
  category: string;
  backgroundColor: string;
  delay: number;
  children: React.ReactNode;
  isInteractive?: boolean;
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
            
            <InteractiveShoppingApp onClose={() => setIsModalOpen(false)} />
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
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-full h-full shadow-md">
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 bg-gray-300 rounded w-20"></div>
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
        </div>
        <div className="relative h-32 bg-gradient-to-t from-blue-100 to-transparent rounded-lg overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points="0,80 40,60 80,40 120,50 160,20 200,30"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function UIShowcase3() {
  return (
    <div className="absolute inset-4 flex flex-col gap-2">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md flex-1 flex flex-col justify-center gap-2">
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-2 rounded-lg text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Primary Button
        </motion.div>
        <motion.div 
          className="border-2 border-gray-300 text-gray-700 text-center py-2 rounded-lg text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Secondary Button
        </motion.div>
        <div className="flex gap-2">
          <motion.div 
            className="flex-1 bg-green-500 text-white text-center py-1 rounded text-xs"
            whileHover={{ scale: 1.05 }}
          >
            Success
          </motion.div>
          <motion.div 
            className="flex-1 bg-red-500 text-white text-center py-1 rounded text-xs"
            whileHover={{ scale: 1.05 }}
          >
            Error
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function UIShowcase4() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-full shadow-md">
        <div className="w-full h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg mb-3"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-2 bg-gray-200 rounded w-16"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UIShowcase5() {
  return (
    <div className="absolute inset-4 flex flex-col justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md space-y-3">
        <div className="space-y-1">
          <div className="h-2 bg-gray-300 rounded w-12"></div>
          <div className="h-8 bg-gray-100 border border-gray-300 rounded"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-100 border border-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <div className="h-2 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

function UIShowcase6() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 w-full shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"></div>
          <div className="flex gap-3">
            <div className="w-6 h-2 bg-gray-300 rounded"></div>
            <div className="w-6 h-2 bg-gray-300 rounded"></div>
            <div className="w-6 h-2 bg-gray-300 rounded"></div>
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded"></div>
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
              title="Dashboard Analytics"
              category="Data Visualization"
              backgroundColor="#764ba2"
              delay={0.1}
            >
              <UIShowcase2 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Button Components"
              category="UI Elements"
              backgroundColor="#f093fb"
              delay={0.2}
            >
              <UIShowcase3 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Card Design"
              category="Layout Components"
              backgroundColor="#4facfe"
              delay={0.3}
            >
              <UIShowcase4 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Form Elements"
              category="Input Design"
              backgroundColor="#43e97b"
              delay={0.4}
            >
              <UIShowcase5 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Navigation System"
              category="User Experience"
              backgroundColor="#fa709a"
              delay={0.5}
            >
              <UIShowcase6 />
            </ShowcaseItem>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


