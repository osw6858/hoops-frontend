import { S } from './MatchData.style.ts'
import { participantGameUserList } from '../../mock/data'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface MatchDataProps {
    participantId : number
    status : string
    createdDate : string
    gender : string
    nickName : string
    playStyle : string
    ability : string
    point : number
  
}

export default function MatchData () {
// `playStyle` 빈도 계산
const playStyleCounts: Record<string, number> = participantGameUserList.reduce((acc: Record<string, number>, participant: MatchDataProps) => {
  acc[participant.playStyle] = (acc[participant.playStyle] || 0) + 1;
  return acc;
}, {});

// 차트 데이터 설정
const data = {
  labels: Object.keys(playStyleCounts),
  datasets: [{
    data: Object.values(playStyleCounts),
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ],
    borderColor: 'white',
    borderWidth: 1
  }]
};

const options = {
  plugins: {
    datalabels: {
      color: '#000',
      anchor: 'end' as const,
      align: 'start' as const,
      offset: 20,
      font: {
        weight: 'normal',
        size: 20
      },
      formatter: (value: number, context: any) => {
        const total = context.chart.data.datasets[0].data.reduce((acc: number, curr: number) => acc + curr, 0);
        const percentage = (value / total * 100).toFixed(2) + '%';  // 퍼센테이지 계산
        return percentage;
      }
    }
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem: any, data: any) {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const total = dataset.data.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
        const currentValue = dataset.data[tooltipItem.index];
        const percentage = Math.floor(((currentValue/total) * 100) + 0.5); 
        return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
      }
    }
  }
};


  return (
    <S.MatchData>
      <p>메치 데이터</p>
      <span>총인원 : {participantGameUserList.length}</span>
      <div>
      <Pie data={data} options={options}  />
      </div>
    </S.MatchData>
  );
};
