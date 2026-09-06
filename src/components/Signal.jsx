import useCountUp from '../hooks/useCountUp';

const readouts = [
  { to: 344, suffix: 'K+', label: 'Eligibility checks per week' },
  { to: 35, suffix: '×', label: 'Throughput scaled' },
  { to: 50, suffix: '+', label: 'Hospitals & clinics' },
  { to: 2.5, prefix: '$', suffix: 'M+', label: 'Company ARR contributed', decimals: 1 },
];

function Readout({ item }) {
  const [ref, value] = useCountUp(item.to);
  const shown = value.toFixed(item.decimals || 0);

  return (
    <div className="signal-cell">
      <div ref={ref} className="signal-val">
        {item.prefix}
        {shown}
        {item.suffix}
      </div>
      <div className="signal-label">{item.label}</div>
    </div>
  );
}

export default function Signal() {
  return (
    <div className="signal">
      <div className="container">
        <div className="signal-grid">
          {readouts.map((item) => (
            <Readout key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
