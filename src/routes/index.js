import { lazy } from "react";
const Home = lazy(() => import("../pages/Home/home.jsx"));
const OpenTicket = lazy(() => import("../pages/Ticket/openticket.jsx"));
const OpenKbase = lazy(() => import("../pages/Kbase/openkbase.jsx"));
const AllTicket = lazy(() => import("../pages/Ticket/alltickets.jsx"));
const ViewTicket = lazy(() => import("../pages/Ticket/viewticket.jsx"));
const Kbase = lazy(() => import("../pages/Kbase/Kbase.jsx"));
const PendingKbase = lazy(() => import("../pages/Kbase/pendingkbase.jsx"));
const ViewKbase = lazy(() => import("../pages/Kbase/viewkbase.jsx"));

const routes = [
  {
    path: "/", // url
    component: Home, // Component to render
  },
  {
    path: "/openticket", // url
    component: OpenTicket, // Component to render
  },
  {
    path: "/tickets", // url
    component: AllTicket, // Component to render
  },
  {
    path: "/ticket/:ticketID", // url
    component: ViewTicket, // Component to render
  },
  {
    path: "/knowledgebase/post", // url
    component: OpenKbase, // Component to render
  },
  {
    path: "/knowledgebase/:title", // url
    component: ViewKbase, // Component to render
  },
  {
    path: "/knowledgebase", // url
    component: Kbase, // Component to render
  },
  {
    path: "/knowledgebase/pending", // url
    component: PendingKbase, // Component to render
  },
];

export default routes;
