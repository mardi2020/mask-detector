import React, { useEffect, useState } from 'react';
import {getNews} from '../function/NaverApi';
import '../styles/News.css'

function News() {

    const [newsList, setNewsList] = useState([]);
    //title, link, originallink, description, pubDate

    useEffect(()=>{
        getNews().then(data => {
            setNewsList(data.newslist.items);
        });
    },[])

    return (
    <div className="News__Wrapper">
        <div className="News-box">
            {newsList.map((i,idx) => (
                <div className="News-Content" key={idx.toString()}>
                    <div className="News-title">{i.title.replaceAll('<b>','').replaceAll('</b>','').replaceAll('&quot;','')}</div>
                    <div className="News-description">{i.description.replaceAll('<b>','').replaceAll('</b>','').replaceAll('&quot;','')}...</div>
                    <div className="News-pubDate">{i.pubDate.slice(0,17)}</div>
                </div>
            ))}
            </div>
    </div>)
}

export default News;