const NewsSkeleton = () => {
  return (
    <div className="news">
      {Array(8)
        .fill()
        .map((_, idx) => (
          <div className="news-item" key={idx}>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
          </div>
        ))}
    </div>
  );
};

export default NewsSkeleton;