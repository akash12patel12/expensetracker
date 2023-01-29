const configP = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};
async function initiatePremium(e) {
  e.preventDefault();
  //    const token= localStorage.getItem('token');
  const response = await axios.get("http://localhost:3000/premium", configP);
  console.log(response);
  var options = {
    "key": response.data.ky_id,
    "order_id": response.data.order.id,
    "handler": async function (response) {
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
