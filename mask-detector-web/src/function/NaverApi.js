import axios from 'axios';

const getNews = async() =>{
    let statusCode = 0;
    let newslist;
    const client_id='b0iacNtKEYbJzAnGZPVE';
    const client_secret='7hIMqLnaGF';
    await axios({
        method:'get',
        url: 'v1/search/news.json',
        params:{query: '코로나', display:20},
        headers:{
            'X-Naver-Client-Id':client_id,
            'X-Naver-Client-Secret': client_secret
        }
    }).then((res) => {
        newslist = res.data;
        statusCode = res.status;
    }).catch((error) => {
        if (error.response === undefined) {
        } else if (error.response.status === 400) {
          statusCode = error.response.status;
        }
      });
    return {statusCode, newslist};
}

export {getNews};