import React, { useEffect, useState } from "react";
import CustomerNav from "../navbar/CustomerNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AllMechanics = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const [data, setData] = useState([]);
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`http://54.163.203.92:5000/mechanic`);
      setData(res.data);
      console.log(res.data, "DATA");
    } catch {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getData();
    // getrequest();
  }, []);

  const handleChange = async (e) => {
    try {
      const searchItem = e.target.value?.toLowerCase();
      if (searchItem) {
        setData(
          data.filter(place => {
            return place?.location?.toLowerCase().includes(searchItem);
          })
        )
      } else {
        const res = await axios.get(`http://54.163.203.92:5000/mechanic`);
        setData(res.data);
      }
    } catch (error) {

    }
  }
  const handleSubmit = async (item) => {
    try {
      console.log(item, "item");
      const dataToSend = {
        customerEmail: customer.email,
        mechanicName: item.name,
        mechanicExperience: item.experience,
        mechanicLocation: item.location,
        mechanicNumber: item.phoneNumber,
        mechanicSkill: item.skill,
        mechanicEmail: item.email,
        status: "Requested"
      };
      const res = await axios.post(`http://54.163.203.92:5000/request`, dataToSend);
      console.log(res.dataToSend, "DATAAAA");
      toast.success("Request sent successfully");
    } catch (error) {
      toast.error("Request failed");
    }
  };
  return (
    <div>
      <CustomerNav />
      <div className="justify-center flex">
        <button
          class=" w-64 mt-3  none center rounded-lg bg-neutral-200 py-2 px-6 font-sans text-md font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          All Mechanics
        </button>
      </div>
      <div class="mb-3 flex justify-end w-96">
        <div class="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search" onChange={handleChange}
            class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
          />

          <button
            class="relative z-[2] flex items-center rounded-r bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="button"
            id="button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500 mt-5">
        <thead class="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" class="border-r px-6 py-4 dark:border-neutral-500">
              S.No
            </th>
            <th scope="col" class="border-r px-6 py-4 dark:border-neutral-500">
              Name
            </th>
            <th scope="col" class="border-r px-6 py-4 dark:border-neutral-500">
              Email
            </th>
            <th scope="col" class="px-6 py-4">
              Phone Number
            </th>
            <th scope="col" class="px-6 py-4">
              Address
            </th>
            <th scope="col" class="px-6 py-4">
              Location
            </th>
            <th scope="col" class="px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, Index) => {
            return (
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                  {item._id}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {item.name}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {item.email}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {item.phoneNumber}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {item.address}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {item.location}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 gap-2">
                  <button
                    onClick={() => handleSubmit(item)}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    SendRequest
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllMechanics;
