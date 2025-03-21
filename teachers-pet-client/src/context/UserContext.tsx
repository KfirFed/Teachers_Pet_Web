import React, { createContext, useState, useCallback } from "react";
import { ConnectedUser } from './../types/User'

interface UserContextType {
    connectedUser: ConnectedUser | null;
    updateConnectedUser: (user: ConnectedUser) => void;
    resetConnectedUser: () => void;
    isAuthenticated: boolean;
}

const userContextValue: UserContextType = {
    connectedUser: null,
    updateConnectedUser: () => { },
    resetConnectedUser: () => { },
    isAuthenticated: false,
};
export const UserContext = createContext<UserContextType>(userContextValue);

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [connectedUser, setConnectedUser] = useState<ConnectedUser | null>(
        () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                localStorage.setItem("accessToken", JSON.parse(storedUser).accessToken);
                localStorage.setItem("refreshToken", JSON.parse(storedUser).refreshToken);
                return JSON.parse(storedUser);
            }
            return null;
        }
    );

    const updateConnectedUser = useCallback((user: ConnectedUser) => {
        setConnectedUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("refreshToken", user.refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
    }, []);

    const resetConnectedUser = useCallback(() => {
        setConnectedUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }, []);

    const userProviderValue = {
        connectedUser,
        updateConnectedUser,
        resetConnectedUser,
        isAuthenticated: !!connectedUser,
    };

    return <UserContext.Provider value={userProviderValue}>{children}</UserContext.Provider>;
};