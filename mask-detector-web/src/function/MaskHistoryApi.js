import axios from "axios";

const putMaskHistory = async (todayText) => {
  let statusCode = 0;
  let data;

  await axios({
    method: "get",
    url:
      "https://c5cqq8vmdd.execute-api.us-east-1.amazonaws.com/dev/mask-history",
    headers: {
      Accept: "application/json",
    },
    params: {
      date: todayText,
    },
  })
    .then((res) => {
      data = res.data;
      statusCode = res.status;
    })
    .catch((error) => {
      if (error.response === undefined) {
      } else if (error.response.status === 400) {
        statusCode = error.response.status;
      }
    });
  return { statusCode, data };
};

const getMaskHistory = async (todayText, isMaskOn) => {
  let statusCode = 0;

  await axios({
    method: "get",
    url:
      "https://c5cqq8vmdd.execute-api.us-east-1.amazonaws.com/dev/mask-history",
    headers: {
      Accept: "application/json",
    },
    params: {
      date: todayText,
      withMask: isMaskOn,
    },
  })
    .then((res) => {
      statusCode = res.status;
    })
    .catch((error) => {
      if (error.response === undefined) {
      } else if (error.response.status === 400) {
        statusCode = error.response.status;
      }
    });
  return { statusCode };
};

export { getMaskHistory, putMaskHistory };
