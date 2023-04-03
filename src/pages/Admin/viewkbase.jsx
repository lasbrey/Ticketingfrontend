import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../middleware/axios";

function ViewKbase() {
  const { title } = useParams();
  const [kbase, setKbase] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/knowledgebase/${title}`);
        setKbase(response.data.kbase);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [title]);
  return (
    <div className="m-4 p-4 sm:ml-64 mt-14">
      <div className="flex">
        <h1 className="text-4xl font-extralight">{kbase.title}</h1>
      </div>
      {/* grid and <table></table> */}
      <div className="mt-3">
        <h1 className="text-xl">Department: {kbase.department}</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 py-2 ">
        {/* Data table of Kbase */}
        <div className="col-span-1">
          <div className="">
            <div class="px-5  bg-white p-2">
              {/* kBase by departments */}
              <div className="py-3">
                <p class="text-sm mt-1">Human Resources</p>{" "}
              </div>
              <div className="py-3">
                <p class="text-sm mt-1">Internal Relations</p>{" "}
              </div>
              <div className="py-3">
                <p class="text-sm mt-1">Information Communication</p>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          {/* Ticket message */}
          <div className="mb-2 bg-white rounded-sm">
            <div className="">
              <div className="py-3  px-5">
                <div class="text-sm text-gray-500">
                  <h1 className="text-md font-semibold text-black  mb-3">
                    By:
                    {kbase.name}
                  </h1>
                  {kbase.content}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-md px-10 py-2.5 my-2"
          >
            {kbase.status === "pending" ? "Approve" : "Edit"}
          </button>
          <button
            type="button"
            class="text-red-800 border-red-700 border  hover:bg-red-800 hover:text-white font-medium text-md px-10 py-2.5 my-2"
          >
            Delete
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ViewKbase;
