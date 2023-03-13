import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu, Dialog } from "@headlessui/react";

const links = [
  { href: "/knowledgebase/pending", label: "Pending Posts" },
  { href: "/knowledgebase", label: "All Posts" },
  { href: "/knowledgebase/post", label: "Create Post" },
];
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <div>
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
                <span className="ml-2"> Add Admin</span>
              </div>
            </Dialog.Title>

            <div className=" bg-white p-5 shadow-sm">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-500"
                >
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full .5 "
                  required
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
                  id="email"
                  class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="Password"
                  class="block mb-2 text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  class=" border border-gray-300 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex gap-4 mt-5">
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Add
                </button>
                <button
                  type="submit"
                  onClick={() => setIsOpen(false)}
                  class="text-blue-700 bg-white border border-blue-700 hover:bg-blue-700 hover:text-white font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <nav className="bg-white border-b border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-4">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-8 mr-3 sm:h-10" alt="Flowbite Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap ">
              Nigcomsat
            </span>
          </Link>
          <div className="flex items-center">
            <Link
              to="#"
              onClick={() => setIsOpen(true)}
              className="text-md font-medium text-blue-600 hover:underline p-2"
            >
              Add Admin
            </Link>
          </div>
        </div>
      </nav>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl px-4 py-4 mx-auto md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-md font-medium">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 hover:underline "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Menu>
                  <Menu.Button className="hover:underline">Knowledgebase</Menu.Button>
                  <Menu.Items className="grid absolute mt-2 shadow-md max-w-[200px] w-full ">
                    {links.map((link) => (
                      /* Use the `active` state to conditionally style the active item. */
                      <Menu.Item key={link.href} as={Fragment} className="">
                        {({ active }) => (
                          <Link
                            to={link.href}
                            className={`${
                              active
                                ? "bg-blue-500 text-white p-2"
                                : "bg-white text-black p-2"
                            }`}
                          >
                            {link.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </li>
              <li>
                <Link to="/tickets" className="text-gray-900 hover:underline ">
                  Tickets
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/openticket"
                  className="text-gray-900 hover:underline "
                >
                   Pending
                </Link>
              </li> */}
              <li>
                <Link
                  to="/openticket"
                  className="text-gray-900 hover:underline "
                >
                  Open Ticket
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
