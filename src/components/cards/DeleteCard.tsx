import React, { useState } from 'react';
import superagent from 'superagent';
import toast, { Toaster } from 'react-hot-toast';
interface CardProps {
  id: number;
  desc: string;
  date: any;
  getData: Function;
}

const Card: React.FC<CardProps> = ({ id, desc, date, getData }) => {
  async function restore() {
    const payload = {
      id: id,
      status: 1,
    };
    try {
      const res = await superagent
        .post(`http://139.59.47.49:4004/api/task/status`)
        .send(payload);
      console.log(res.body.message);
      getData();
      toast.success('Task Restored');
    } catch (e) {
      toast.error('Could not Restore');
    }
  }
  async function deletePermanently() {
    try {
      const res = await superagent.delete(
        `http://139.59.47.49:4004/api/task/delete/${id}`,
      );
      getData();
      console.log(res.body.message);
      toast.success('Permanently Deleted');
    } catch (e) {
      toast.error('Could not Delete');
    }
  }

  return (
    <>
      <div className=" w-48 h-32 text-center shadow-best rounded-2xl m-2">
        <div className="p-3 h-20">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">
            {desc}
          </p>
          <div className="flex justify-around m-2">
            <button onClick={() => restore()}>📥</button>
            <button onClick={() => deletePermanently()}>❌</button>
          </div>
        </div>
        <div className=" bg-yellow-600 w-48 h-12 rounded-b-2xl">
          <p className="text-white pt-2">{date}</p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Card;
