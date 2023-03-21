import { createContext, useContext } from 'react';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const SocketContext = createContext(null);
export const useSocketContext = () => useContext(SocketContext);
export const TokenContext = createContext({});
export const useTokenContext = () => useContext(TokenContext);
export default AuthContext;
