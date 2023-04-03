import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Label } from "@mui/icons-material";
import instance from "../../middleware/axios";


function Kbase() {
  const [kbase, setKbase] = useState([]);
  
  const fetchData = () => {
    instance.get(`/knowledgebase`).then((res) => {
      const data = res.data.filter((item) => item.status !== "pending");
      setKbase(data);
    });
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6 pt-16">
      <div className="sm:flex block justify-between">
        <h1 className="text-4xl font-extralight">Knowledgebase</h1>
        <div className="sm:mt-0 mt-10">
          <a
            href="/knowledgebase/post"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-10 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
          >
            Post
          </a>
        </div>
      </div>
      {/* grid and <table></table> */}
      <div className=" py-4">
        {/* Data table of tickets */}
        <div className="col-span-2">
          <form class="flex items-center mb-5">
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
          <h1 className="text-3xl font-extralight mb-5">Departments</h1>
          {kbase.length > 0 ? (
            kbase.map((data, i) => (
              <Link to={`/knowledgebase/${data.title}`}>
                <div
                  class="flex bg-white p-5 cursor-pointer hover:bg-gray-200"
                  key={i}
                >
                  <div class="list-group-item-body">
                    <div class="text-xl text-blue-500">
                      <div>
                        <Label sx={{ fontsize: 20 }} />
                        {data.title}
                      </div>
                    </div>
                  
                    <span class="text-sm">By: {data.department}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div
              class="flex bg-white p-5 cursor-pointer hover:bg-gray-200"
              href="#"
            >
              <div class="list-group-item-body">
                <div class="text-xl text-blue-500">No Post Available</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Kbase;
