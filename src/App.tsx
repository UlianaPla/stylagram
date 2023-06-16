import "./App.css";
import { Provider } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyle from "./theme/globalStyle";
import Profile from "./components/profileFeed/Profile";
import { store } from "./store";

const AppWrapper = styled.div`
  background-color: #fafafa;
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Profile />
      </AppWrapper>
    </Provider>
  );
}

export default App;
