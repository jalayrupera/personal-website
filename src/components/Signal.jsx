import useCountUp from '../hooks/useCountUp';

const readouts = [
  { to: 344, suffix: 'K+', label: 'Eligibility checks per week', sub: '1.5M+ / month' },
  { to: 35, suffix: '×', label: 'Throughput scaled', sub: '40K/mo → 344K/wk', hot: true },
  { to: 50, suffix: '+', label: 'Hospitals & clinics', sub: 'United Arab Emirates' },
  { to: 2.5, prefix: '$', suffix: 'M+', label: 'Company ARR contributed', sub: 'Mantys, founding team', decimals: 1 },
];

function Readout({ item }) {
  const [ref, value] = useCountUp(item.to);
  const shown = value.toFixed(item.decimals || 0);

  return (
    <div className="signal-cell">
      <div ref={ref} className={`signal-val${item.hot ? ' hot' : ''}`}>
        {item.prefix}
        {shown}
        {item.suffix}
      </div>
      <div className="signal-label">{item.label}</div>
      <div className="signal-sub">{item.sub}</div>
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
        <div className="signal-foot">
          4.5+ yrs · 4 companies · 2 startups, founding team &amp; founder
        </div>
      </div>
    </div>
  );
}
