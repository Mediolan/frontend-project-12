import { createContext, useContext } from 'react';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const SocketContext = createContext(null);
export const useChatApi = () => useContext(SocketContext);
export default AuthContext;
