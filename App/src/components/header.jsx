import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useHistory } from "react-router-dom";
import logo from '../assets/logo.jpg'
export default function NavBar({login=true}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let history = useHistory();
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <button onClick={() => history.push("/")} className="-m-1.5 p-1.5">
            <span className="sr-only">Icarus AI</span>
            <img className="h-10 w-auto" src={logo} alt="" />
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
          
        {login ? (
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <button onClick={() => history.push("/tracking")} className="text-sm font-semibold leading-6 text-gray-900">
           Job Tracking
          </button>
          <button onClick={() => history.push("/")} className="text-sm font-semibold leading-6 text-gray-900">
            Icarus Coach
          </button>
          <button onClick={() => history.push("/recommendation")} className="text-sm font-semibold leading-6 text-gray-900">
          Icarus Recommendation
          </button>
        </Popover.Group>) : null}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={() => history.push("/setup")} className="text-sm font-semibold leading-6 text-gray-900">
            Setup Profile <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button onClick={() => history.push("/")} className="-m-1.5 p-1.5">
              <span className="sr-only">Icarus AI</span>
              <img
                className="h-8 w-auto"
                src={logo}
                alt=""
              />
            </button>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {login ? (
              <div className="space-y-2 py-6">
                
                <button
                  onClick={() => history.push("/tracking")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Job Tracking
                </button>
                <button
                  onClick={() => history.push("/recommendation")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Icarus Recommendations
                </button>
                <button
                  onClick={() => history.push("/")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Icarus Coach
                </button>
              </div>) : null}
              <div className="py-6">
                <button
                  onClick={() => history.push("/setup")}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Setup Profile
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
