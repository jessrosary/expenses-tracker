import './App.scss';
import data from './assets/data.json';
import { DateTime } from 'luxon';
import { useState } from 'react';

const weekTotal = data.reduce((x, a) => x + a.amount, 0);

const Bar = (props: any) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const barSize = props.amount / 7;
  const isCurrentDay = () => {
    const currentDay = DateTime.now().weekdayShort.toLowerCase();
    if (currentDay === props.day) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div
        className='price-label'
        style={{ visibility: `${isMouseOver ? 'initial' : 'hidden'}` }}
      >
        ${props.amount}
      </div>
      <div
        className={isCurrentDay() ? 'bar current' : 'bar'}
        style={{ height: `${barSize}em` }}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      ></div>
      <span className='day-label'>{props.day}</span>
    </div>
  );
};

function App() {
  return (
    <div className='main-container'>
      <h2>Spending - Last 7 Days</h2>
      <div className='graph-container'>
        {data.map((x) => (
          <Bar key={x.day} day={x.day} amount={x.amount} />
        ))}
      </div>
    </div>
  );
}

export default App;
