import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { UIThemeProvider } from "./contexts/themeContext";
import { client } from "./clientConfig";
import { AuthProvider } from "./contexts/auth";

export default function MyApolloProvider() {
  return (
    <ApolloProvider client={client}>
      <UIThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UIThemeProvider>
    </ApolloProvider>
  );
}
