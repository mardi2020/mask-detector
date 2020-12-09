import axios from "axios";

const putMaskHistory = async (todayText, isMaskOn) => {
  let statusCode = 0;

  await axios({
    method: "put",
    url:
      "https://m6lhwe6p4g.execute-api.us-east-1.amazonaws.com/dev/mask-history",
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

const getMaskHistory = async (todayText) => {
  let statusCode = 0;
  let data;

  await axios({
    method: "get",
    url:
      "https://m6lhwe6p4g.execute-api.us-east-1.amazonaws.com/dev/mask-history",
    headers: {
      Accept: "application/json",
    },
    params: {
      date: todayText,
    },
  })
    .then((res) => {
      statusCode = res.status;
      data = res.data;
    })
    .catch((error) => {
      if (error.response === undefined) {
      } else if (error.response.status === 400) {
        statusCode = error.response.status;
      }
    });
  return { statusCode, data };
};

export { getMaskHistory, putMaskHistory };
