const NationSkeleton = ({ isDark }) => {
  const cities = [
    { en: "seoul", className: "seoul" },
    { en: "busan", className: "busan" },
    { en: "daegu", className: "daegu" },
    { en: "daejeon", className: "daejeon" },
    { en: "gwangju", className: "gwangju" },
    { en: "jeju", className: "jeju" },
    { en: "wonju", className: "wonju" },
  ];

  return (
    <div className={`nation ${isDark ? "dark" : ""}`}>
      <h3>전국 날씨</h3>

      {cities.map((city) => (
        <div key={city.en} className={`nation-item ${city.className}`}>
          <div className="skeleton skeleton-nation-icon"></div>
        </div>
      ))}
    </div>
  );
};

export default NationSkeleton;
