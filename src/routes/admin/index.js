import { lazy } from "react";
const Admin = lazy(() => import("../../pages/Admin/admin.jsx"));
const Ticket = lazy(() => import("../../pages/Admin/ticket.jsx"));
const PendingTicket = lazy(() => import("../../pages/Admin/pendingticket.jsx"));
const ClosedTicket = lazy(() => import("../../pages/Admin/closedticket.jsx"));
const Kbase = lazy(() => import("../../pages/Admin/kbase.jsx"));
const PendingKbase = lazy(() => import("../../pages/Admin/pendingkbase.jsx"));
const Logs = lazy(() => import("../../pages/Admin/logs.jsx"));
const ViewTicket = lazy(() => import("../../pages/Admin/viewticket.jsx"));


const routes = [
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/admin/ticket",
    component: Ticket,
  },
  {
    path: "/admin/ticket/:ticketID", // url
    component: ViewTicket, // Component to render
  },
  {
    path: "/admin/pendingticket",
    component: PendingTicket,
  },
  {
    path: "/admin/closedticket",
    component: ClosedTicket,
  },
  {
    path: "/admin/knowledgebase",
    component: Kbase,
  },
  {
    path: "/admin/pendingknowledgebase",
    component: PendingKbase, 
  },
  {
    path: "/admin/logs",
    component: Logs,
  }
];

export default routes;
