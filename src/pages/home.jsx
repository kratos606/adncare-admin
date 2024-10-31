import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import BaseURL from '../config/app.config';

// Function to generate data for the last 6 months, including the current month
function getVisitorsData() {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const visitorsData = [];

  // Get current date
  const currentDate = new Date();

  // Loop through the last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    visitorsData.push({
      name: monthNames[date.getMonth()],
      visitors: 0, // Default value, update with actual data if available
    });
  }

  return visitorsData;
}

// Sample data for charts
const visitorsData = getVisitorsData();

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Home = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState({})

  const fetchVisitors = async() => {
    await axios.get(`${BaseURL}/visitors`).then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }

  useEffect(() => {
    fetchVisitors()
  },[])

  // Transform device counts for pie chart
  const pieData = [
    { name: 'Desktop', value: data?.device_counts?.desktop },
    { name: 'Mobile', value: data?.device_counts?.mobile },
    { name: 'Tablet', value: data?.device_counts?.tablet }

  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Welcome Section */}
      <Typography variant="h4" gutterBottom>
        Bon retour, {user.name} !
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Voici ce qui se passe avec votre site Web aujourd'hui.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Nombre total de visiteurs
                  </Typography>
                  <Typography variant="h4">{data.total_count}</Typography>
                </Box>
                <IconButton color="primary">
                  <PeopleIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Nombre total d'utilisateurs
                  </Typography>
                  <Typography variant="h4">{data.user_count}</Typography>
                </Box>
                <IconButton color="secondary">
                  <ShowChartIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Messages non lus
                  </Typography>
                  <Typography variant="h4">{data.unread_count}</Typography>
                </Box>
                <IconButton color="success">
                  <TrendingUpIcon />
                </IconButton>
              </Box>
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
              data={data?.visitor_trends?.original?.length ? data.visitor_trends.original : visitorsData}
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
              Distribution des appareils
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