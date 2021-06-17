import { ParseServer } from "../../lib/parse";
import { profileApi } from "../../services";
import Parse from "parse";
import { useEffect } from "react";
import { ProfilePhoto } from "./ProfilePhoto";

export const Profile = () => {
  function getProfile() {
    const currentUser = ParseServer.User.current();
    //const find = { user: "TUOevvNbQe" }; //currentUser.id };
    const find = { user: currentUser.id };
    // return profileApi
    //   .findBy(find, 10, 0)
    //   .then(
    //     ({ count, results }: { count: number; results: Parse.Object[] }) => {
    //       console.log({ count, results });
    //     }
    //   );
    return profileApi.getMyAccount().then(
      ({
        results,
      }: {
        results: "km13MMz7Qh"; //Parse.Object
      }) => {
        console.log({ results });
      }
    );
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="md:flex no-wrap md:-mx-2  mt-4">
      <div className="w-full md:w-3/12 md:mx-2">
        <ProfilePhoto />
      </div>

      <div className="w-full md:w-9/12 mx-2 h-64">
        <div className="bg-white p-3 shadow rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 py-3">
            <span className="text-colmena">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">Perfil</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2">Jane</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last Name</div>
                <div className="px-4 py-2">Doe</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender</div>
                <div className="px-4 py-2">Female</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.</div>
                <div className="px-4 py-2">+11 998001001</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Current Address</div>
                <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email.</div>
                <div className="px-4 py-2">
                  <a className="text-blue-800" href="mailto:jane@example.com">
                    jane@example.com
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Birthday</div>
                <div className="px-4 py-2">Feb 06, 1998</div>
              </div>
            </div>
          </div>
          <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};
