import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Label } from "@mui/icons-material";
import instance from "../../middleware/axios";


function PendingKbase() {
  const [kbase, setKbase] = useState([]);
  const fetchData = () => {
    instance.get(`/knowledgebase/post/pending`).then((res) => {
      const data = res.data;
      setKbase(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="m-4 p-4 sm:ml-64 py-3 pt-16">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extralight">Pending Knowledgebase Post</h1>
      </div>
      {/* grid and <table></table> */}
      <div className=" py-4">
        {/* Data table of tickets */}
        <div className="col-span-2">
          {kbase.length > 0 ? (
            kbase.map((data, i) => (
              <Link to={`/knowledgebase/${data.title}`}>
              <div
                class="flex bg-white p-5 cursor-pointer hover:bg-gray-200"
                key={i}
              >
                <div class="list-group-item-body">
                  <div class="text-xl text-blue-500">
                    <Label sx={{ fontsize: 20 }} />
                    {data.title}
                  </div>
                  <p class="text-sm">By: {data.department}</p>{" "}
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
                <div class="text-xl text-blue-500">
                  No Pending Post
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingKbase;
