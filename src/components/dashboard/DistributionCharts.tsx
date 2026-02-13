import {
      Chart as ChartJS,
      ArcElement,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      BarElement,
      PointElement,
      LineElement,
      Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
      ArcElement,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      BarElement,
      PointElement,
      LineElement,
      Title
);

interface Props {
      stats: any;
}

export const DistributionCharts = ({ stats }: Props) => {
      if (!stats) return null;

      // 1. Discipline Distribution (Donut)
      const donutData = {
            labels: Object.keys(stats.by_sport || {}).map(s => s.split('-')[0].trim()),
            datasets: [
                  {
                        data: Object.values(stats.by_sport || {}),
                        backgroundColor: [
                              '#C60C30', // Red
                              '#003478', // Blue
                              '#FFD700', // Gold
                              '#E61B3F', // Light Red
                              '#004A9F', // Light Blue
                              '#CD7F32', // Bronze
                              '#A8A8A8', // Silver
                        ],
                        borderWidth: 0,
                        hoverOffset: 10,
                  },
            ],
      };

      const donutOptions = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                  legend: {
                        position: 'bottom' as const,
                        labels: {
                              color: '#9CA3AF',
                              font: { family: 'Pretendard Variable', size: 10 },
                              usePointStyle: true,
                              padding: 15,
                        },
                  },
                  tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                  }
            },
      };

      // 2. Team Size (Bar)
      const barData = {
            labels: Object.keys(stats.by_team || {}),
            datasets: [
                  {
                        label: 'Athletes',
                        data: Object.values(stats.by_team || {}),
                        backgroundColor: '#003478',
                        hoverBackgroundColor: '#C60C30',
                        borderRadius: 4,
                        barPercentage: 0.6,
                  },
            ],
      };

      const barOptions = {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y' as const,
            plugins: {
                  legend: { display: false },
                  tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                  }
            },
            scales: {
                  x: {
                        grid: { display: false },
                        ticks: { display: false },
                        border: { display: false },
                  },
                  y: {
                        grid: { display: false },
                        ticks: {
                              color: '#9CA3AF',
                              font: { family: 'Pretendard Variable', size: 10 },
                              autoSkip: false,
                        },
                        border: { display: false },
                  },
            },
      };

      // 3. Age Distribution (Histogram-like Bar)
      const ageData = {
            labels: ['Teens', '20s', '30s'],
            datasets: [
                  {
                        label: 'Athletes',
                        data: [
                              stats.age_distribution?.teens || 0,
                              stats.age_distribution?.twenties || 0,
                              stats.age_distribution?.thirties || 0
                        ],
                        backgroundColor: (ctx: any) => {
                              const val = ctx.raw;
                              // Highlight the largest group
                              const max = Math.max(stats.age_distribution?.teens, stats.age_distribution?.twenties, stats.age_distribution?.thirties);
                              return val === max ? '#C60C30' : '#374151';
                        },
                        borderRadius: 8,
                        borderSkipped: false,
                  }
            ]
      };

      const ageOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                  legend: { display: false },
                  tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  }
            },
            scales: {
                  y: { display: false },
                  x: {
                        grid: { display: false },
                        ticks: { color: '#9CA3AF', font: { family: 'Pretendard Variable' } },
                        border: { display: false },
                  }
            }
      };


      return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 1. Discipline Ratio */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-6 min-h-[300px] flex flex-col"
                  >
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Discipline Ratio</h3>
                        <div className="flex-1 relative">
                              <Doughnut data={donutData} options={donutOptions} />
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                                    <div className="text-center">
                                          <span className="block text-3xl font-display font-black text-white">{stats.total_athletes}</span>
                                          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Athletes</span>
                                    </div>
                              </div>
                        </div>
                  </motion.div>

                  {/* 2. Team Composition */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6 min-h-[300px] flex flex-col"
                  >
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Team Composition</h3>
                        <div className="flex-1">
                              <Bar data={barData} options={barOptions} />
                        </div>
                  </motion.div>

                  {/* 3. Age Demographics */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 min-h-[300px] flex flex-col"
                  >
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Age Demographics</h3>
                        <div className="flex-1 flex items-end">
                              <Bar data={ageData} options={ageOptions} />
                        </div>
                  </motion.div>
            </div>
      );
};
