import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout";
import GuestLayout from "../Layout/GuestLayout";
import HomePage from "../Pages/HomePage";
import ArtistPage from "../Pages/ArtistPage";
import ArtistProfilePage from "../Pages/ArtistProfilePage";
import ShopPage from "../Pages/ShopPage";
import ProductDetailPage from "../Pages/ProductDetailPage";
import ForumPage from "../Pages/ForumPage";
import PaymentPage from "../Pages/PaymentPage";
import ShoppingCartPage from "../Pages/ShoppingCartPage";
import BookingPage from "../Pages/BookingPage";
import BookingDetail from "../Pages/BookingDetail";
import PendingRequestPage from "../Pages/PendingRequestPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import EventPage from "../Pages/EventPage";
import PurchaseHistoryPage from "../Pages/PurchaseHistoryPage";
import AdminAddProducts from "../Pages/AdminAddProducts";
import ArtistManagement from "../Pages/ArtistManagement";
import ForumDiscussionPage from "../Pages/ForumDiscussionPage";
import CreateEventPage from "../Pages/CreateEventPage";
import EventManagementPage from "../Pages/EventManagementPage";
import UserProfilePage from "../Pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/artist",
        element: <ArtistPage />,
      },
      {
        path: "/artistprofile/:id",
        element: <ArtistProfilePage />,
      },
      {
        path: "/book",
        element: <BookingPage />,
      },
      {
        path: "/book/:id",
        element: <BookingDetail />,
      },
      {
        path: "/manage",
        element: <ArtistManagement />,
      },
      {
        path: "/request",
        element: <PendingRequestPage />,
      },
      {
        path: "/event",
        element: <EventPage />,
      },
      {
        path: "/event/create",
        element: <CreateEventPage />,
      },
      {
        path: "/event/manage/:id",
        element: <EventManagementPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/purchasehistory",
        element: <PurchaseHistoryPage />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/shopadmin",
        element: <AdminAddProducts />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/cart",
        element: <ShoppingCartPage />,
      },
      {
        path: "/forum",
        element: <ForumPage />,
      },
      {
        path: "/forum/:id",
        element: <ForumDiscussionPage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/guest",
        element: <HomePage />,
      },
      {
        path: "/guest/artist",
        element: <ArtistPage />,
      },
      {
        path: "/guest/artistprofile/:id",
        element: <ArtistProfilePage />,
      },
      {
        path: "/guest/event",
        element: <EventPage />,
      },
      {
        path: "/guest/shop",
        element: <ShopPage />,
      },
      {
        path: "/guest/shop/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/guest/shop/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/guest/forum",
        element: <ForumPage />,
      },
      {
        path: "/guest/forum/:id",
        element: <ForumDiscussionPage />,
      },
      {
        path: "/guest/login",
        element: <LoginPage />,
      },
      {
        path: "/guest/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
