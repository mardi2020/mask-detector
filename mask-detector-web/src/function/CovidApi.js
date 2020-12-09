import axios from "axios";

const getCovidNum = async (today, today_minus7) => {
  let statusCode = 0;
  let data;
  const key =
    "42jdeu6I1jMneyadNT5VHzjmEOHAGF9cwToo2UZeFcBGFJszJOPybAoKjBUxYoPyLiNl1OVYn%2FB7oVDDF5UJKw%3D%3D";
  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + key; /*Service Key*/
  //keyeh encodeURIComponent로 감싸니까 변형돼서 인증 키가 아니라고 뜸.
  // queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /**/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("startCreateDt") +
    "=" +
    encodeURIComponent(today_minus7); /**/
  queryParams +=
    "&" +
    encodeURIComponent("endCreateDt") +
    "=" +
    encodeURIComponent(today); /* */

  await axios({
    method: "get",
    url: "openapi/service/rest/Covid19/getCovid19InfStateJson" + queryParams,
    // headers:{'Access-Control-Allow-Origin':'*'}
  })
    .then((res) => {
      data = res.data.response;
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

export { getCovidNum };
