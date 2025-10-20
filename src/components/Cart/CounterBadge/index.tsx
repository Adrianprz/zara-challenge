export const CounterBadge = ({
  counter,
  toggleButton,
  children,
}: {
  counter: number;
  toggleButton: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={toggleButton}
      className="c-counter-badge"
      aria-label="Open cart"
      type="button"
    >
      {children}
      <span className="c-counter-badge__count">{counter}</span>
    </button>
  );
};
