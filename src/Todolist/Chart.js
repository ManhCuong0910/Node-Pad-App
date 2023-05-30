import { Animation, PieSeries } from "@devexpress/dx-react-chart";
import { Chart, Title } from "@devexpress/dx-react-chart-material-ui";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function ChartTask() {
  const [completeTask, setCompleteTask] = useState("");
  const [unfinished, setUnfinished] = useState("");
  const getTaskListApi = async () => {
    const { data } = await axios.get("https://backoffice.nodemy.vn/api/tasks");
    const totalTaskCompleted = data.data.filter(
      (task) => task.attributes.complete === true
    );
    setCompleteTask(totalTaskCompleted.length);
    const totalTaskUnfinished = data.data.filter(
      (task) => task.attributes.complete === false
    );
    setUnfinished(totalTaskUnfinished.length);
  };
  const data = [
    { region: "Complete", val: `${completeTask}` },
    { region: "Unfinished", val: `${unfinished}` },
  ];
  useEffect(() => {
    getTaskListApi();
  }, []);

  return (
    <div>
      <Paper>
        <Chart data={data}>
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
          />
          <Title text="Tiến độ hoàn thành công việc" />
          <Animation />
        </Chart>
      </Paper>
      <div
        class="table text-center"
        style={{
          width: "20%",
          margin: "0 auto",
          position: "absolute",
          top: "50px",
          right: 0,
        }}
      >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Complete</th>
              <th scope="col">Unfinished</th>
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <td>{completeTask}</td>
              <td>{unfinished}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
