'use client';
import superagent from 'superagent';
import { Itaskdata, Itasks } from '@/interfaces/Itask';
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import Card from '@/components/cards/DeleteCard';
import { useRouter } from 'next/navigation';
import '../styles.css';
const InProgress = () => {
  const [taskData, setTaskData] = useState<Itaskdata[]>([]);
  const router = useRouter();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await superagent.get(
      'http://139.59.47.49:4004/api/tasks?limit=12&start=1&status=0',
    );

    setTaskData(data.body.rows);
    console.log(data.body.rows);
  }
  return (
    <>
      <section className="delete-comp container ">
        <div>
          <button
            onClick={() => router.replace('/in-progress')}
            className="bg-blue-500 p-2 rounded-md text-white"
          >
            Back to all tasks
          </button>
        </div>
        <div className="row pt-5">
          {taskData?.map((task: Itaskdata) => {
            return (
              <div className="col " key={task.id}>
                <Card
                  id={task.id}
                  desc={task.task_name}
                  date={task.date}
                  getData={getData}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default InProgress;
