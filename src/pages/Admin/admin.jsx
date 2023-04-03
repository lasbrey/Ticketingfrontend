import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../middleware/axios";

function Admin() {
  const [ticket, setTickets] = useState([]);
  const reversedTickets = ticket.slice().reverse();
  const numOfTicket = ticket.length;
  const numberOfClosedTickets = ticket.filter((ticket) => ticket.status === "Closed").length;
  const numberOfPendingTickets = ticket.filter((ticket) => ticket.status === "inreview").length;

  const fetchData = () => {
    instance.get(`/tickets`).then((res) => {
      const data = res.data;
      setTickets(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div class="m-4 p-4 sm:ml-64">
        <div class="p-4 mt-14">
          <div class="grid xl:grid-cols-4 grid-cols-1 gap-2 mb-4">
            <div class="flex items-center justify-center">
              <a
                href="/admin/ticket"
                class="relative block rounded-sm border-t-4 border-blue-600 p-4 shadow-xl sm:p-6 lg:p-8 w-full"
              >
                <div class="flex items-center gap-4">
                  <h3 class="text-3xl font-bold sm:text-4xl">{numOfTicket}</h3>
                </div>

                <p class="mt-4 font-medium text-gray-500">All Tickets</p>
              </a>
            </div>
            <div class="flex items-center justify-center">
              <a
                href="/admin/pendingticket"
                class="relative block rounded-sm border-t-4 border-blue-600 p-4 shadow-xl sm:p-6 lg:p-8 w-full"
              >
                <div class="flex items-center gap-4">
                  <h3 class="text-3xl font-bold sm:text-4xl">{numberOfPendingTickets}</h3>
                </div>

                <p class="mt-4 font-medium text-gray-500">Pending Tickets</p>
              </a>
            </div>
            <div class="flex items-center justify-center">
              <a
                href="/admin/closedticket"
                class="relative block rounded-sm border-t-4 border-blue-600 p-4 shadow-xl sm:p-6 lg:p-8 w-full"
              >
                <div class="flex items-center gap-4">
                  <h3 class="text-3xl font-bold sm:text-4xl">{numberOfClosedTickets}</h3>
                </div>

                <p class="mt-4 font-medium text-gray-500">Closed Tickets</p>
              </a>
            </div>
            <div class="flex items-center justify-center">
              <a
                href="/admin/knowledgebase"
                class="relative block rounded-sm border-t-4 border-blue-600 p-4 shadow-xl sm:p-6 lg:p-8 w-full"
              >
                <div class="flex items-center gap-4">
                  <h3 class="text-3xl font-bold sm:text-4xl">100+</h3>
                </div>

                <p class="mt-4 font-medium text-gray-500">Knowledgebase</p>
              </a>
            </div>
          </div>
          <div className="col-span-2 pt-10">
        <div class="relative overflow-x-auto shadow-sm">
          <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Department
                </th>
                <th scope="col" class="px-6 py-3">
                  Subject
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedTickets.length > 0 ? (
                reversedTickets.map((data, i) => (
                  <tr key={i} class="bg-white border-b  ">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.department}
                    </th>
                    <td class="px-6 py-4">
                      <Link to={`/admin/ticket/${data.ticketID}`}>
                        <div className="text-blue-700">{data.ticketID}</div>
                        <span>{data.subject}</span>
                      </Link>
                    </td>
                    <td class="px-6 py-4">
                      <span className="bg-gray-200 p-1 rounded">
                        {data.status}
                      </span>
                    </td>
                    <td class="px-6 py-4">{data.createdAt}</td>
                  </tr>
                ))
              ) : (
                <div class=" w-full ">
                  <div class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    No Ticket found
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
