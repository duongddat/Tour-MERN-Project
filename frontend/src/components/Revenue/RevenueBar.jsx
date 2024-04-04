import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function RevenueBar({ label, data, backgroundColor, title }) {
  return (
    <Bar
      data={{
        labels: label,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: backgroundColor,
            borderRadius: 5,
          },
        ],
      }}
      options={{
        plugins: {
          title: {
            text: title,
          },
        },
        aspectRatio: 2,
        responsive: true,
      }}
    />
  );
}

export default RevenueBar;
