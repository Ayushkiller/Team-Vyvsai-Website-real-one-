import React from 'react';

const ProtectedComponent = () => {
  return (
    <div>
      <h2>Protected Content</h2>
      <p>This content is only accessible to authenticated users.</p>
    </div>
  );
};

export default ProtectedComponent;