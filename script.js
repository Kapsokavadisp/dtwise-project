//Fetch Block
async function fetchData() {
  const url = 'http://localhost:3005/data';
  const response = await fetch(url);

  //Wait until the request has been completed

  const datapoints = await response.json();
  return datapoints;
}

fetchData().then((datapoints) => {
  const timestamps = datapoints.map(function (index) {
    return index.timestamp;
  });
  const metrics_1 = datapoints.map(function (index) {
    return index.metric_1;
  });
  const metrics_2 = datapoints.map(function (index) {
    return index.metric_2;
  });

  //Default diagram 2
  //FIXME

  updateMonth(5);

  // Change the values at graph2

  document.getElementById('stats-btn-3').onclick = function () {
    let valueTest = document.getElementById('stats-btn-3').value;
    updateMonth(valueTest);
  };
  document.getElementById('stats-btn-4').onclick = function () {
    let valueTest = document.getElementById('stats-btn-4').value;
    updateMonth(valueTest);
  };
  document.getElementById('stats-btn-5').onclick = function () {
    let valueTest = document.getElementById('stats-btn-5').value;
    updateMonth(valueTest);
  };
  document.getElementById('stats-btn-6').onclick = function () {
    let valueTest = document.getElementById('stats-btn-6').value;
    updateMonth(valueTest);
  };
  document.getElementById('stats-btn-7').onclick = function () {
    let valueTest = document.getElementById('stats-btn-7').value;
    updateMonth(valueTest);
  };

  function updateMonth(valueTest) {
    //on click update chart_2
    const newTimestamps = timestamps.map(function (d) {
      //return dates without toLocaleString
      return new Date(d);
    });

    const monthlyTimestamps = [];
    const monthlyIndexes = [];

    for (i = 0; i < timestamps.length; i++) {
      if (newTimestamps[i].getMonth() == valueTest) {
        monthlyTimestamps.push(timestamps[i]);
        monthlyIndexes.push(i);
      }
    }

    const monthlyHumanTimestamps = monthlyTimestamps.map(function (d) {
      //
      return new Date(d).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
    });

    const monthlyMetrics = metrics_1.slice(
      monthlyIndexes[0],
      monthlyIndexes[monthlyIndexes.length]
    );

    //Working on CHART 2 - updating values

    costChart_2.config.data.labels = monthlyHumanTimestamps;
    costChart_2.config.data.datasets[0].data = monthlyMetrics;
    costChart_2.update();
  }

  const humanTimestamps = timestamps.map(function (d) {
    return new Date(d).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  });

  //Metrics Calculations

  const max_metric_1 = Math.max(...metrics_1).toFixed(3);
  const min_metric_1 = Math.min(...metrics_1).toFixed(3);
  const avg_metric_1 = average(metrics_1).toFixed(3);
  const max_metric_2 = Math.max(...metrics_2).toFixed(3);
  const min_metric_2 = Math.min(...metrics_2).toFixed(3);
  const avg_metric_2 = average(metrics_2).toFixed(3);

  //Calculate average of an array
  function average(arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
  }

  //Default values
  document.getElementById('min-val').innerHTML = min_metric_1;
  document.getElementById('max-val').innerHTML = max_metric_1;
  document.getElementById('avg-val').innerHTML = avg_metric_1;

  // Changes the text with the min , max ,avg values
  document.getElementById('stats-btn-1').onclick = function () {
    document.getElementById('min-val').innerHTML = min_metric_1;
    document.getElementById('max-val').innerHTML = max_metric_1;
    document.getElementById('avg-val').innerHTML = avg_metric_1;
  };

  document.getElementById('stats-btn-2').onclick = function () {
    document.getElementById('min-val').innerHTML = min_metric_2;
    document.getElementById('max-val').innerHTML = max_metric_2;
    document.getElementById('avg-val').innerHTML = avg_metric_2;
  };

  //Button Utils
  let k = 2;
  for (k = 2; k <= 3; k++) {
    let buttons = document.querySelectorAll(`.btn-${k}`);
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        buttons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  //Working on CHART 1

  //Provide data to x,y axis of the chart 1
  costChart_1.config.data.labels = humanTimestamps;
  costChart_1.config.data.datasets[0].data = metrics_1;
  costChart_1.update();
});

//Setup Charts
Chart.defaults.global.defaultFontFamily = 'Poppins';
let ctx = document.querySelector('#chart1');

let costChart_1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      'Sept 1',
      'Sept 3',
      'Sept 6',
      'Sept 9',
      'Sept 12',
      'Sept 15',
      'Sept 18',
      'Sept 21',
      'Sept 24',
      'Sept 27',
      'Sept 30',
    ],
    datasets: [
      {
        label: 'Metric 1',
        borderColor: '#2e2e4e',
        borderWidth: '3',
        backgroundColor: 'rgba(235, 247 ,245 ,0.2)',
        data: [0, 30, 60, 25, 60, 50, 10, 50, 90, 110, 81],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      intersect: false,
      node: 'index',
    },
  },
});

let ctx2 = document.querySelector('#chart2');
let costChart_2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [
      'Sept 1',
      'Sept 3',
      'Sept 6',
      'Sept 9',
      'Sept 12',
      'Sept 15',
      'Sept 18',
      'Sept 21',
      'Sept 24',
      'Sept 27',
      'Sept 30',
    ],
    datasets: [
      {
        label: 'Metric 1',
        borderColor: '#2e2e4e',
        borderWidth: '3',
        backgroundColor: 'rgba(235, 247 ,245 ,0.2)',
        data: [0, 30, 60, 25, 60, 50, 10, 50, 90, 110, 81],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      intersect: false,
      node: 'index',
    },
  },
});
