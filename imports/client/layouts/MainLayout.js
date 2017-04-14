import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        This is the header
      </header>
      {children}
    </div>
  )
}

export default MainLayout;
