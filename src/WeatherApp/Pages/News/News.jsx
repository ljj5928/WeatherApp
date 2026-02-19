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
      const response = await axios.get("https://newsapi.org/v2/everything?q=weather&sortBy=publishedAt&apiKey=a490705c3ffe42138c7e0bd88fb55ef7");
      setNews(response.data.articles);
      console.log(response)
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
      {news?.slice(0, 8)?.map((item, idx) => (
        <div className="news-item" key={idx}>
          <a href={item.url}>
            <h3>
              {item.title
                .replace(/<[^>]*>/g, "")
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")}
            </h3>
            <p>
              {item.description
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
