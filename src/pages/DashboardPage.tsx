import { Card, Container, Grid } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import React from "react";
import BadgeCard from "@components/BadgeCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const DashboardPage: React.FC = () => {
  return (
    <Container fluid p="lg">
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <BadgeCard Title="Instructors" Value="20" BgColor="cyan" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <BadgeCard Title="Classrooms" Value="10/20" BgColor="indigo" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <BadgeCard Title="Reservations" Value="10/20" BgColor="seagreen" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <BadgeCard Title="Occupancies" Value="10" BgColor="blueviolet" />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Card shadow="sm" p="sm">
            <Line options={options} data={data} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Card shadow="sm" p="sm">
            <Bar options={options} data={data} />
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
