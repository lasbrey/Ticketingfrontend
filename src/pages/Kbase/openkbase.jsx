import React, { useState, useEffect, useRef } from "react";
import instance from "../../middleware/axios";


const initialKbase = {
  name: "",
  email: "",
  title: "",
  content: "",
  department: "",
  // image: "",
};


function Openkbase() {
  const [kbase, setKbase] = useState(initialKbase);
  const [errMsg, setErrMsg] = useState("");
  const [sccMsg, setSccMsg] = useState("");
  const kbaseRef = useRef();
  const errRef = useRef();


  useEffect(() => {
    kbaseRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setKbase((prevKbase) => ({
      ...prevKbase,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post(
        `/knowledgebase/post`,
        kbase,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      setSccMsg("Post added Successfully");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Incorrect Credentials");
      }
      errRef.current.focus();
    }
  };
  return (
    <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6 pt-16">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extralight">Create Knowledge Post</h1>
      </div>
      {/* grid and <table></table> */}
      <div className=" py-4">
        {/* Data table of tickets */}

        <form className="pt-5"  onSubmit={handleSubmit}>
          <h1 className="text-2xl font-extralight mb-4">Author's Information</h1>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 bg-white p-5 shadow-sm">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="name"
                name="name"
                class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                value={kbase.name}
                onChange={handleChange}
                ref={kbaseRef}
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                value={kbase.email}
                onChange={handleChange}
              />
            </div>
            <div class="mb-4">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-500 "
              >
                Department
              </label>
              <select
                name="department"
                value={kbase.department}
                onChange={handleChange}
                class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option>Customer Support</option>
                <option>Technical Support</option>
              </select>
            </div>
          </div>
          {/* Message section */}
          <h1 className="text-2xl font-extralight mb-4 mt-4">Post</h1>
          <div className=" bg-white p-5 shadow-sm">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-500"
              >
                Title
              </label>
              <input
                type="name"
                name="title"
                value={kbase.title}
                onChange={handleChange}
                class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-500"
              >
                Post
              </label>
              <textarea
                name="content"
                value={kbase.content}
                onChange={handleChange}
                rows="5"
                class="block p-2.5 w-full text-sm text-gray-500 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write post body..."
              ></textarea>
            </div>
          </div>
          {/* Attachment */}
          {/* <h1 className="text-2xl font-extralight mb-4 mt-4">Attachments</h1>
          <div className="bg-white shadow-sm p-5">
            <div class="">
              <div class="mb-3 w-full">
                <input
                  class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none "
                  type="file"
                  id="formFile"
                />
                <p class="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
              </div>
            </div>
          </div> */}
          <div className="flex gap-4 mt-5">
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          <button type="submit" class="text-blue-700 bg-white  font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
          </div>
          {errMsg && <div className="bg-red-500 text-white w-full p-4 mt-4" ref={errRef}>{errMsg}</div>}
          {sccMsg && <div className="bg-green-500 text-white w-full p-4 mt-4">{sccMsg}</div>} 
        </form>
      </div>
    </div>
  );
}

export default Openkbase;