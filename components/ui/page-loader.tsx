export function PageLoader() {
  return (
    <div className="page-loader-wrap" role="status" aria-live="polite" aria-label="Loading page">
      <div className="loader" aria-hidden="true">
        <div className="item1" />
        <div className="item2" />
        <div className="item3" />
      </div>
    </div>
  );
}
