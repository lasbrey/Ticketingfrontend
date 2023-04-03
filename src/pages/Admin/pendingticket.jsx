import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../middleware/axios";

function PendingTicket() {
  const [ticket, setTickets] = useState([]);
  const reversedTickets = ticket.slice().reverse();
  const fetchData = () => {
    instance.get(`/tickets`).then((res) => {
      const data = res.data.filter((item) => item.status === "Pending");
      setTickets(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="m-4 p-4 sm:ml-64 py-3 pt-16">
      <h1 className="text-2xl pb-5 font-medium">Pending Tickets</h1>
      {/* Data table of tickets */}
      <div className="col-span-2">
        <div className="relative overflow-x-auto shadow-sm">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedTickets.length > 0 ? (
                reversedTickets.map((data, i) => (
                  <tr key={i} className="bg-white border-b  ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.department}
                    </th>
                    <td className="px-6 py-4">
                      <Link to={`/admin/ticket/${data.ticketID}`}>
                        <div className="text-blue-700">{data.ticketID}</div>
                        <span>{data.subject}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-200 p-1 rounded">
                        {data.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{data.createdAt}</td>
                  </tr>
                ))
              ) : (
                <div className=" w-full ">
                  <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    No Ticket found
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PendingTicket;
