'use client';
import superagent from 'superagent';
import { Itaskdata, Itasks } from '@/interfaces/Itask';
import React, { useEffect, useState } from 'react';
import Card from '@/components/cards/Card';
import toast, { Toaster } from 'react-hot-toast';
import '../../app/styles.css';
const InProgress = () => {
  const [taskData, setTaskData] = useState<Itaskdata[]>([]);
  const [text, setText] = useState<string>('');
  const [dates, setDates] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const [start, setStart] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, [start]);

  async function getData() {
    try {
      const data = await superagent.get(
        `http://139.59.47.49:4004/api/tasks?limit=6&start=${start}&status=1`,
      );
      if (data.body.rows.length < 6) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      const res = data.body.rows.sort(
        (a: Itaskdata, b: Itaskdata) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      setTaskData(res);
      console.log(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function postData() {
    const payload = {
      task_name: text,
      date: new Date(dates).toISOString().split('T')[0],
    };
    console.log(new Date(dates).toISOString().split('T')[0]);
    try {
      const apiRes = await superagent
        .post('http://139.59.47.49:4004/api/task')
        .send(payload);
      console.log(apiRes.body);
      toast.success('Task Created');
      getData();
    } catch (e) {
      toast.error('Task Creation Failed');
    }
  }

  function convertDateFormat(dateStr:string) {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }
  return (
    <>
      <section className="in-progress container overflow-y-scroll ">
        <div className="row  h-11 ">
          <div className="col col-12 flex ">
            <button
              // onClick={() => postData()}
              className="bg-blue-500 p-2 rounded-md text-white"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Task
            </button>
            <div className="ms-auto"></div>
          </div>
        </div>
        {/* 
           taskData.reduce((curr,acc)=>{
                if(!acc[curr.date]){
                  <h1>curr.date</h1>
                  acc[curr.date]=true;
                }
                  <div className="col col-md-4 col-lg-3" key={task.id}>
                <Card
                  id={task.id}
                  desc={task.task_name}
                  date={task.date}
                  getData={getData}
                />
              </div>
              return acc;
           },{})
        */}
        <div className="row card-row pt-5 flex flex-wrap">
          {taskData.map((task, index) => {
            if (!index || taskData[index - 1].date !== task.date) {
              return (
                <React.Fragment key={task.id}>
                  <h1>{convertDateFormat(task.date)}</h1>
                  <div className="col col-md-4 col-lg-3">
                    <Card
                      id={task.id}
                      desc={task.task_name}
                      date={task.date}
                      getData={getData}
                    />
                  </div>
                </React.Fragment>
              );
            } else {
              return (
                <div className="col col-md-4 col-lg-3" key={task.id}>
                  <Card
                    id={task.id}
                    desc={task.task_name}
                    date={task.date}
                    getData={getData}
                  />
                </div>
              );
            }
          })}
        </div>

        <div className="row h-12 fixed right-40">
          <div className="flex justify-center mt-4">
            <nav aria-label="..." className="pagination">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link bg-neutral-500 text-white"
                    onClick={(e) => {
                      setStart((prev) => Math.max(prev - 1, 1));
                    }}
                  >{`<<`}</a>
                </li>
                <li className="page-item active">
                  <a
                    className="page-link text-white"
                    href="#"
                    onClick={(e) => getData()}
                  >
                    {start}
                  </a>
                </li>
                <li className="page-item " aria-current="page">
                  <a
                    className="page-link  bg-neutral-500 text-white"
                    href="#"
                    onClick={(e) => getData()}
                  >
                    {start + 1}
                  </a>
                </li>
                <li className="page-item ">
                  <a
                    className="page-link  bg-neutral-500 text-white"
                    href="#"
                    onClick={(e) => getData()}
                  >
                    {start + 2}
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link bg-neutral-500 text-white "
                    href="#"
                    onClick={(e) => {
                      if (!hasMore) {
                        toast.error('No more items');
                        return;
                      }
                      setStart((prev) => prev + 1);
                    }}
                  >{`>>`}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id={`staticBackdrop`}
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
                Add Task
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
                onClick={() => setText('')}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => postData()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default InProgress;
