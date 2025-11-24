import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const ROLES = {
    RESEARCHER: "researcher",
    MANAGER: "manager",
};

export const RoleProvider = ({ children }) => {
    const [currentRole, setCurrentRole] = useState(ROLES.RESEARCHER);

    const switchRole = (role) => {
        setCurrentRole(role);
    };

    return (
        <RoleContext.Provider value={{ currentRole, switchRole, ROLES }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within RoleProvider");
    }
    return context;
};
