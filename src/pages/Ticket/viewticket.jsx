import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import instance from "../../middleware/axios";
import ThemedSuspense from "../../pages/components/ThemedSuspense";
import Page404 from "../page404";
import {
  Edit,
  Person,
  Download,
  SupervisorAccount,
  HighlightOff,
  NotificationImportant,
  Done,
} from "@mui/icons-material";

const initialReply = {
  sender: "",
  message: "",
  // image: "",
};
function ViewTicket() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const { ticketID } = useParams();
  const [ticket, setTicket] = useState([]);
  const [solvedTicket, setSolvedTicket] = useState(false);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState([initialReply]);
  const [errMsg, setErrMsg] = useState("");
  const [sccMsg, setSccMsg] = useState("");
  const replyRef = useRef();
  const errRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReply((prevReply) => ({ ...prevReply, [name]: value }));
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      await instance.post(`/ticket/${ticket.ticketID}`, reply, {
        withCredentials: true,
      });
      setReply("");
      setSccMsg("Reply added successfully");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg("Incorrect credentials");
      }
      errRef.current.focus();
    }
  };
  // const imageLen = ticket.image.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/ticket/${ticketID}`);
        setTicket(response.data.ticket);
        setReplies(response.data.replies);
        setLoading(false);
        if (response.data.ticket.status === "Closed") {
          setSolvedTicket(true);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketID]);

  // Define the closeTicket function
  const closeTicket = async (id) => {
    try {
      await instance.post(`/ticket/close/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  // Define the deleteTicket function
  const deleteData = async (id) => {
    try {
      await instance.delete(`/ticket/${id}`);
      setIsDeleteSuccess(true);
      setIsDelete(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle the close button click
  const handleCloseClick = () => closeTicket(ticketID);
  // Handle the delete button click
  const handleDeleteClick = () => deleteData(ticketID);
  if (loading) {
    return <ThemedSuspense />;
  }
  if (!ticket.subject) {
    return <Page404 />;
  }
  return (
    <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6 pt-16">
      <Dialog
        open={isDeleteSuccess}
        onClose={() => setIsDeleteSuccess(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="bg-white p-10 shadow-sm">
              <div className="flex items-center justify-center text-green-600">
                <Done sx={{ fontSize: 70 }} />
              </div>
              <p className="text-2xl font-bold">Ticket deleted successfully</p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={isDelete}
        onClose={() => setIsDelete(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="bg-white p-10 shadow-sm">
              <div className="flex items-center justify-center text-red-600">
                <HighlightOff sx={{ fontSize: 70 }} />
              </div>
              <p className="text-2xl font-bold text-center">Confirm Delete?</p>
              <p>This action cannot be undone.</p>
              <div className="w-full grid grid-cols-2 gap-4 mt-4">
                <button
                  class="text-white bg-red-700 hover:bg-red-800 font-medium  text-sm px-5 py-2.5 text-center"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
                <button
                  class="text-white bg-blue-700 hover:bg-blue-800  font-medium  text-sm px-5 py-2.5 text-center"
                  onClick={() => setIsDelete(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded bg-white">
            <Dialog.Title>
              <div class="text-md text-white bg-blue-500 p-5">
                <Edit sx={{ fontsize: 5 }} />
                <span className="ml-2"> Reply</span>
              </div>
            </Dialog.Title>

            <form onSubmit={handleSubmit} className=" bg-white p-5 shadow-sm">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-500"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="sender"
                  class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  value={reply.sender}
                  onChange={handleChange}
                  ref={replyRef}
                />
              </div>

              <div className="mb-4">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-500"
                >
                  Your message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  class="block p-2.5 w-full text-sm text-gray-500 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave a comment..."
                  value={reply.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div class="mb-3 w-full">
                <input
                  class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none "
                  type="file"
                  id="formFile"
                />
                <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
              <div className="flex gap-4 mt-5">
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  class="text-blue-700 bg-white border border-blue-700 hover:bg-blue-700 hover:text-white font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div>
        <div className="flex">
          <h1 className="text-4xl font-extralight">{ticket.subject}</h1>
        </div>
        {/* grid and <table></table> */}
        <div className="mt-3">
          <h1 className="text-xl">Ticket Information</h1>
        </div>
        <div className="grid sm:grid-cols-4 grid-cols-1 sm:gap-6 gap-1 py-2]">
          {/* Data table of tickets */}
          <div className="col-span-1">
            <div className="">
              <div class="px-5  bg-white p-2">
                {/* Requestor */}
                <div className="py-3">
                  <div class="text-sm text-gray-500">Owner</div>
                  <p class="text-sm mt-1">{ticket.name}</p>{" "}
                </div>
                {/* Department */}
                <div className="py-3">
                  <div class="text-sm text-gray-500">Department</div>
                  <p class="text-sm mt-1">{ticket.department}</p>{" "}
                </div>
                {/* Ticket ID */}
                <div className="py-3">
                  <div class="text-sm text-gray-500">Ticket ID</div>
                  <p class="text-sm mt-1">{ticket.ticketID}</p>{" "}
                </div>
                {/* Status */}
                <div className="py-3">
                  <div class="text-sm text-gray-500">Status/Priority</div>
                  <p class="text-sm mt-1">
                    <span className="bg-gray-400 text-white p-1">
                      {ticket.status}
                    </span>{" "}
                    {ticket.priority}
                  </p>{" "}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium text-md px-10 py-2.5 my-2"
                  onClick={
                    ticket.status === "Closed"
                      ? () => setIsOpen(true)
                      : handleCloseClick
                  }
                >
                  {ticket.status === "Closed" ? "Reply" : "Close"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDelete(true)}
                  class="text-red-800 border-red-700 border  hover:bg-red-800 hover:text-white font-medium text-md px-10 py-2.5 my-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            {/* Ticket message */}

            <Dialog
              open={solvedTicket}
              onClose={() => setSolvedTicket(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel>
                  <div className="bg-white p-10 shadow-sm">
                    <div className="flex items-center justify-center text-red-600">
                      <NotificationImportant sx={{ fontSize: 70 }} />
                    </div>
                    <p className="text-2xl font-bold text-center">
                      Note: This ticket has been closed <br></br>Reply the
                      ticket to reopen it
                    </p>
                    <div className="w-full flex justify-center items-center mt-4">
                      <button
                        class="text-white bg-blue-700 hover:bg-blue-800  font-medium  text-sm px-5 py-2.5 text-center"
                        onClick={() => setSolvedTicket(false)}
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
            <div className="mb-2 bg-white rounded-sm">
              {errMsg && (
                <div className="bg-red-500 text-white w-full p-4" ref={errRef}>
                  {errMsg}
                </div>
              )}
              {sccMsg && (
                <div className="bg-green-500 text-white w-full p-4">
                  {sccMsg}
                </div>
              )}
              <div className="">
                <div className="py-3 px-5 border-b border-gray-300">
                  <div class="text-sm text-gray-500">
                    <Person />
                    <span className="ml-1 text-md"> {ticket.name}</span>
                  </div>
                  <p class="text-sm mt-1">
                    <span className="bg-blue-400 text-white p-1">Author</span>
                  </p>
                </div>
                <div className="py-3 border-b border-gray-300 px-5">
                  <div class="text-sm text-gray-500">{ticket.message}</div>
                </div>
                <div className="py-3 px-5">
                  <div class="text-sm text-black">
                    <span className="ml-1 text-md font-semibold">
                      {" "}
                      Attachment
                    </span>
                  </div>
                  <p class="text-sm mt-1 cursor-pointer">
                    {ticket.image ? (
                      <span className="text-blue-700">
                        <Download />
                        <span className="ml-1 text-md">{ticket.image}</span>
                      </span>
                    ) : (
                      <span className="text-blue-700">
                        <span className="ml-1 text-md">No Attachment</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* reply message */}
            {replies.length > 0
              ? replies.map((data, i) => (
                  <div
                    className="mb-2 bg-white rounded-sm border-l-2 border-blue-500"
                    key={i}
                  >
                    <div className="">
                      <div className="py-3 px-5 border-b border-gray-300">
                        <div class="text-sm text-gray-500">
                          <SupervisorAccount />
                          <span className="ml-1 text-md"> {data.sender}</span>
                        </div>
                        <p class="text-sm mt-1">
                          <span className="bg-blue-400 text-white p-1">
                            Response
                          </span>
                        </p>
                      </div>
                      <div className="py-3 px-5">
                        <div class="text-sm text-gray-500">{data.message}</div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}

            {/* reply button */}
            <div
              class="flex bg-white p-3 cursor-pointer hover:bg-gray-200"
              href="#"
              onClick={() => setIsOpen(true)}
            >
              <div class="list-group-item-body">
                <div class="text-md text-blue-500 cursor-pointer">
                  <Edit sx={{ fontsize: 5 }} />
                  <span className="ml-2"> Reply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTicket;
