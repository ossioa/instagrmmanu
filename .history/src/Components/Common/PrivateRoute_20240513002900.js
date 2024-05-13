const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading state while auth state is unresolved
  }

  return user ? children : <Navigate to="/login" />;
};
