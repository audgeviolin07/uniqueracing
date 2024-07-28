import React, { useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (collectionId: string, tokenId: string) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [collectionId, setCollectionId] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(collectionId, tokenId);
    setCollectionId('');
    setTokenId('');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>Enter Collection ID and Token ID</h3>
        <input
          type="text"
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          placeholder="Collection ID"
        />
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Token ID"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Popup;
