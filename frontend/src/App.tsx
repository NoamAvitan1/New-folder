import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { PersonData } from "./PersonData";
import { Countries } from "./Countries";
import { TodoList } from "./TodoList";
import { Pixelx } from "./Pixelx";
// import { fetchPerson } from "./api";



function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PersonData/> */}
      <TodoList/>
    </QueryClientProvider>
  );
}

export default App;
