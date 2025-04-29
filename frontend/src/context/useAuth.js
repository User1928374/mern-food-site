// src/context/useAuth.js
import { useContext } from 'react';
// ← default-import, not `{ AuthContext }`
import AuthContext from './AuthContext';

export default function useAuth() {
  return useContext(AuthContext);
}