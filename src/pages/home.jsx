import React, { useContext } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import UserContext from '../hooks/userContext';

// Sample data for charts
const visitorsData = [
  { name: 'Jan', visitors: 4000 },
  { name: 'Feb', visitors: 3000 },
  { name: 'Mar', visitors: 2000 },
  { name: 'Apr', visitors: 2780 },
  { name: 'May', visitors: 1890 },
  { name: 'Jun', visitors: 2390 },
];

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Home = () => {
  const { user } = useContext(UserContext)
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Welcome Section */}
      <Typography variant="h4" gutterBottom>
        Welcome back, {user.name}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Here's what's happening with your website today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Visitors
                  </Typography>
                  <Typography variant="h4">2,573</Typography>
                </Box>
                <IconButton color="primary">
                  <PeopleIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: 'success.main' }}>
                +15% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Page Views
                  </Typography>
                  <Typography variant="h4">10,234</Typography>
                </Box>
                <IconButton color="secondary">
                  <ShowChartIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: 'success.main' }}>
                +25% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4">3.27%</Typography>
                </Box>
                <IconButton color="success">
                  <TrendingUpIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: 'success.main' }}>
                +5% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Visitor Trends
            </Typography>
            <LineChart
              width={700}
              height={300}
              data={visitorsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Device Distribution
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;