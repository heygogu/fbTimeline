'use client';
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
  const [text, setText] = useState<string>(desc);
  const [dates, setDates] = useState<string>(date);

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
      toast.success('Moved to Recycle Bin');
    } catch (e) {
      toast.error('Recycle Bin : Unreachable');
    }
  }

  function convertDateFormat(dateStr:string) {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  async function markComplete() {
    const payload = {
      id: id,
      status: 2,
    };
    try {
      const res = await superagent
        .post(`http://139.59.47.49:4004/api/task/status`)
        .send(payload);
      console.log(res.body.message);
      getData();
      toast.success('Task Completed');
    } catch (e) {
      toast.error('Could not mark complete');
    }
  }

  async function updateTask() {
    const payload = {
      id: id,
      task_name: text,
      date: new Date(dates).toISOString().split('T')[0],
    };
    console.log(new Date(dates).toISOString().split('T')[0]);
    try {
      const apiRes = await superagent
        .put('http://139.59.47.49:4004/api/task')
        .send(payload);
      console.log(apiRes.body.message);
      getData();
      toast.success('Task Updated Successfully');
    } catch (e) {
      toast.error('Could not update Task');
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
            <button onClick={() => markComplete()}>✅</button>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${id}`}
            >
              ✍
            </button>
            <button onClick={() => pushToDelete()}>❌</button>
          </div>
        </div>
        <div className=" bg-yellow-600 w-48 h-12 rounded-b-2xl">
          <p className="text-white pt-2">{convertDateFormat(date)}</p>
        </div>
      </div>

      <div
        className="modal fade"
        id={`staticBackdrop${id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        // tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-yellow-100">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <label htmlFor="input-text">Select Date</label>
              <input
                id="input-text"
                style={{
                  backgroundColor: 'beige',
                  width: '200px',
                  alignSelf: 'center',
                  color: 'gray',
                  borderColor: 'beige',
                  margin: '50px',
                  outline: 'none',
                }}
                type="date"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              ></input>
              <br />
              <label htmlFor="enter-task">Enter Task</label>
              <input
                className="ml-8"
                id="enter-task"
                type="text"
                value={text}
                placeholder="Your Task"
                onChange={(e) => setText(e.target.value)}
                style={{ outline: 'none', backgroundColor: 'beige' }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setText(desc)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => updateTask()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Card;
