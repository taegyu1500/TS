const KeyValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid gap-1.5">
      <span className="text-sm font-semibold text-primary">{label}</span>
      <span className="text-sm text-secondary">{value}</span>
    </div>
  );
};

export default KeyValue;
