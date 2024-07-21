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
  async function pushToDelete() {
    const payload = {
      id: id,
      status: 0,
    };
    try {
      const res = await superagent
        .post(`http://139.59.47.49:4004/api/task/status`)
        .send(payload);
      console.log(res.body.message);
      getData();
      toast.success("Moved to Recycle Bin")
      console.log(res.body.message);
    } catch (e) {
      toast.error('Can not reach Recycle Bin');
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
          <button onClick={() => pushToDelete()}>❌</button>
        </div>
      </div>
      <div className=" bg-yellow-600 w-48 h-12 rounded-b-2xl">
        <p className="text-white pt-2">{date}</p>
      </div>
    </div>
    <Toaster/>
    </>
  );
};

export default Card;
