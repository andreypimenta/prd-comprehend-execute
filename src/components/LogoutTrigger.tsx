import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const LogoutTrigger = () => {
  const { signOut } = useAuth();
  
  useEffect(() => {
    signOut();
  }, [signOut]);
  
  return null;
};

export default LogoutTrigger;