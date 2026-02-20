import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsSkeleton from "./NewsSkeleton";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 뉴스 api호출 */
  const fetchWeatherNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://newsdata.io/api/1/news", {
        params: {
          apikey: "pub_5dc51aaf89864e0782c2d38d912a1ec6",
          country: "kr",
          language: "ko",
        },
      });
      setNews(res.data.results || []);
    } catch (error) {
      console.error("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherNews();
  }, []);

  /* skeleton */
  if (loading) return <NewsSkeleton />;
  return (
    <div className="news">
      {news?.slice(0, 8)?.map((item) => (
        <div className="news-item" key={item.article_id}>
          <a href={item.link}>
            <h3>
              {item.title || "타이틀이 없는 기사입니다."
                .replace(/<[^>]*>/g, "")
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")}
            </h3>
            <p>
              {item.description || "요약 내용이 없는 기사입니다."
                .replace(/<[^>]*>/g, "")
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
