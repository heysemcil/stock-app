import { Route, Routes } from "react-router-dom";
import {
  Brands,
  Categories,
  Dashboard,
  Firms,
  Login,
  Products,
  Profile,
  Purchases,
  Register,
  Sales,
} from "./pages";
import PrivateRouter from "./PrivateRouter";
import Layout from "./components/Layout";

export default function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/stock" element={<PrivateRouter />}>
        <Route path="/stock" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="brands" element={<Brands />} />
          <Route path="firms" element={<Firms />} />
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="categories" element={<Categories />} />
          <Route path="profile" element={<Profile />} />
          <Route path="purchases" element={<Purchases />} />
        </Route>
      </Route>
    </Routes>
  );
}
