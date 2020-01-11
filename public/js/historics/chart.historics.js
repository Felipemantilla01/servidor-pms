

  var ctx = document.getElementById('myChart').getContext('2d');
  var dataFirst = {
  label: "Battery voltage (V)",
  data: [0, 59, 75, 20, 20, 55, 40],
  lineTension: 0,
  // Set More Options
};
   
var dataSecond = {
  label: "Battery Current (A)",
  data: [20, 15, 60, 60, 65, 30, 70],
  lineTension: 0,
  // Set More Options
};
   
var speedData = {
  labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
  datasets: [dataFirst, dataSecond]
};
 
 
var lineChart = new Chart(ctx, {
  type: 'line',
  data: speedData
});

 
 /* var lineChart = new Chart(ctx, {
	  type: 'line',
	  data: {
		  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		  datasets: [{
			  label: 'Battery Voltage',
			  data: [12, 19, 3, 5, 2, 3],
			  backgroundColor: 'rgba(255, 99, 132, 0.2)',
			  borderColor: 'rgba(255, 99, 132, 1)',
			  borderWidth: 1
		  }]
	  },

  });

*/
