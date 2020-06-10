import React from 'react';
import { Library } from '../presentation';

const App = () => {
  return (
    <div className="library">
      <header className="library-header">
        E-library for fantasy novels
      </header>
      <Library />
    </div>
  )
};

export default App;
