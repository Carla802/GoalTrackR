import { Link } from "react-router-dom";
import React from 'react';

function ConfirmationModal(props) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl px-3">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">{props.title}</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-center">
                {props.description}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-black background-transparent font-[600] uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={props.close}
              >
                Cancel
              </button>
              <Link
                to={props.to ? props.to : "#"}
                onClick={() => {
                  props.action();
                  props.close();
                }}
                className="bg-[var(--primary-color)] text-white active:bg-[var(--primary-color)] font-[600] uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ConfirmationModal;