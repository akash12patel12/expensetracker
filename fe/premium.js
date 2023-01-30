const configP = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};
checkPremium();
async function initiatePremium(e) {
  e.preventDefault();
  //    const token= localStorage.getItem('token');
  const response = await axios.get("http://localhost:3000/premium", configP);
  console.log(response);
  var options = {
    key: response.data.ky_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      await axios.post(
        "http://localhost:3000/updatePayment",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        configP
      );
      alert("payment Successfull");
    },
  };

  const rzp_fe = new Razorpay(options);
  rzp_fe.open();
  e.preventDefault();
  rzp_fe.on("payment.failed", function (response) {
    alert("Something Went Wrong");
  });
}

///Check if user is premium

function checkPremium() {
  axios.get("http://localhost:3000/checkpremium", configP).then((response) => {
    console.log(response.data.isPremium);
    if (response.data.isPremium) {
      const btn = document.getElementById("premiumButton");
      btn.setAttribute("hidden", "true");
      document.getElementById("premium-text").innerText = "Premium";
    }
  });
}

async function showLeaderBoard(e) {
  e.preventDefault();
  axios
    .get("http://localhost:3000/getLeaderBoard", configP)
    .then((response) => {
      const table = document.getElementById("leaderboard");
      table.innerHTML = `<h1 class="display-4">Leaderboard</h1>
  <th>
    <td>Rank</td>
    
    <td>Name</td>
    <td>Total Expenses</td>
  </th>`;
     
     response.data.forEach(user => {
       table.innerHTML = table.innerHTML + `<tr>

       <td></td>
       <td></td>
       <td>${user.name}</td>
       <td>${user.totalExpenses}</td>
     </tr>`
     });

    
      console.log(response);
    })
    .catch((err) => {
      alert(err.response.data.Message);
    });
}
