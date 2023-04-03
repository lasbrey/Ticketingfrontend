import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu } from "@headlessui/react";

const links = [
  { href: "/knowledgebase", label: "All Posts" },
  { href: "/knowledgebase/post", label: "Create Post" },
];
function Header() {

  return (
    <div>
      <nav className="bg-white border-b border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-4">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-8 mr-3 sm:h-10" alt="Flowbite Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap ">
              Nigcomsat
            </span>
          </Link>
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
              <li>
                <Menu>
                  <Menu.Button className="hover:underline">
                    Knowledgebase
                  </Menu.Button>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
