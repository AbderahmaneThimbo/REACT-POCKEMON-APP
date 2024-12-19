import React from "react";
import { Navigate } from "react-router-dom";
import AuthenticationService from "./services/authentication-service";

// Utilisation du type `React.ComponentType` pour le composant "element"
const PrivateRoute = ({ element: Component, ...rest }: any) => {
  const isAuthenticated = AuthenticationService.isAuthenticated;

  // Si non authentifié, redirige vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Sinon, on rend le composant spécifié
  return <Component {...rest} />;
};

export default PrivateRoute;
