'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Profile = () => {
  const router = useRouter();
  return (
    <section className="side-section flex mt-2 w-56">
      <div className=" mb-auto ml-10 shadow-best rounded-3xl p-10 bg-orange-100">
        <div className=" flex justify-center m-2 ">
          <div className="">
            <Image
              className="rounded-full w-auto h-auto mx-auto"
              src={'/images/profile.jpg'}
              width={170}
              height={180}
              alt="My Photo"
              priority
            />
            <h2 className="text-2xl font-bold text-center mt-3">Rohit Kumar</h2>
            <p className="text-gray-600">rohitnarnolia88@gmail.com</p>
          </div>
        </div>
        <hr className="mt-4"></hr>
        <div className="flex justify-center mt-3">
          <div className="flex flex-col mt-5 ">
            <button
              onClick={() => router.push('/in-progress')}
              className=" bg-blue-500 text-white rounded-lg px-4 py-2 mb-3"
            >
              Current Tasks
            </button>
            <button  onClick={() => router.push('/completed')} className=" bg-green-500 text-white rounded-lg px-4 py-2 mb-3">
              Completed
            </button>
            <button
              onClick={() => router.push('/deleted')}
              className=" bg-red-500 text-white rounded-lg px-4 py-2 mb-2"
            >
              Recycle Bin
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
