import PropTypes from "prop-types";
import "@/styles/spinner.css";

interface ISpinnerProps {
  size?: number;
  color?: string;
  isPending?: boolean;
  children: React.ReactNode;
}

const SpinnerComponent: React.FC<ISpinnerProps> = (props: ISpinnerProps) => {
  const { children, isPending, size, color } = props;

  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid ${color}`,
    borderTop: `4px solid transparent`, // Để tạo hiệu ứng xoay.
  };
  return (
    <>
      {isPending && (
        <div className="spinner-overlay">
          <div className="spinner" style={spinnerStyle}></div>
        </div>
      )}
      {children}
    </>
  );
};

SpinnerComponent.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  isPending: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

SpinnerComponent.defaultProps = {
  size: 40,
  color: "#333",
  isPending: false,
};

export default SpinnerComponent;
