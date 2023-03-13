import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import instance from "../../middleware/axios";

function Home() {
  const [ticket, setTickets] = useState([]);
  const reversedTickets = ticket.slice().reverse();

  const fetchData = () => {
    instance.get(`/tickets`).then((res) => {
      const data = res.data;
      setTickets(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (!ticket) return null;

  return (
    <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6 pt-16">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extralight">My Support Tickets</h1>
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
      {/* grid and <table></table> */}
      <div className=" py-4">
        {/* Data table of tickets */}
        <div className="col-span-2">
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
                      <Link to={`/ticket/${data.ticketID}`}>
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
  );
}

export default Home;
