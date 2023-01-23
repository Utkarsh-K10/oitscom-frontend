import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      data: [0, 10, 20, 30, 40, 50],
      backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"],
    },
  ],
};

export const pietChartData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const useStyles: any = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: "2%",
  },
  innerWrapper: {
    display: "flex",
    flexDirectoin: "row",
    height: "300px",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Box>
        <Typography variant="h5">Dashboard</Typography>
      </Box>
      <div className={classes.innerWrapper}>
        <Bar options={options} data={data} />;
        <Pie data={pietChartData} />;
      </div>
    </div>
  );
}
