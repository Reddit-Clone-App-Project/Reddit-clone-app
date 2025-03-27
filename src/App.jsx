import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import './App.css'
import Root from './components/Root/Root';
import PostList from './components/PostList/PostList';
import SubredditsPage from './components/SubredditsPage/SubredditsPage';

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={<PostList />} />
    <Route path="r/:subredditName" element={<SubredditsPage />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
