import { useState } from 'react';

export default function useToogle() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };
  return { open, handleToggle, setOpen };
}
