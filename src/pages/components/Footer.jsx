import React from 'react'
import {Link} from "react-router-dom"

function Footer() {
  return (
    <footer class="p-4 bg-white  shadow md:flex md:items-center md:justify-between md:p-6 mt-10">
        <span class="text-sm text-gray-500 sm:text-center">© 2023 Nigcomsat All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
            <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">About</Link>
            </li>
            <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
            </li>
            <li>
                <Link href="#" class="hover:underline">Contact</Link>
            </li>
        </ul>
    </footer>
  )
}

export default Footer