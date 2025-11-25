import "./LoadingOverlay.scss";
import useLoading from "../../hooks/useLoading";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loadingOverlay">
      <div className="loadingOverlay_spinner" />
    </div>
  );
};

export default LoadingOverlay;
