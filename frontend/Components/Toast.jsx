import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  const showToastMessage = (messageText) => {
    setMessage(messageText);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000); // 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast, showToastMessage, message }}>
      {children}
      {showToast && (
        <div className="toast">
          <p>{message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};
