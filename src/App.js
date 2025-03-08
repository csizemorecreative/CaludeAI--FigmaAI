import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Divider,
  InputAdornment,
  Alert,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CashHandlingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(1); // Default to "Cash handling" tab
  const [selectedDrawer, setSelectedDrawer] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Bill state
  const [bills, setBills] = useState({
    $1: { quantity: '', total: '$0.00' },
    $5: { quantity: '', total: '$0.00' },
    $10: { quantity: '', total: '$0.00' },
    $20: { quantity: '', total: '$0.00' },
    $50: { quantity: '', total: '$0.00' },
    $100: { quantity: '', total: '$0.00' },
  });
  
  // Coin state
  const [coins, setCoins] = useState({
    'Pennies': { quantity: '', total: '$0.00' },
    'Nickles': { quantity: '', total: '$0.00' },
    'Dimes': { quantity: '', total: '$0.00' },
    'Quarters': { quantity: '', total: '$0.00' },
  });
  
  // Check state
  const [checks, setChecks] = useState({
    count: '',
    total: '',
  });
  
  // Total amount
  const [totalAmount, setTotalAmount] = useState('$0.00');
  
  // Calculate bill totals
  const calculateBillTotal = (denomination, quantity) => {
    const value = parseInt(denomination.replace('$', ''));
    const numericQuantity = quantity === '' ? 0 : parseInt(quantity);
    return '$' + (value * numericQuantity).toFixed(2);
  };
  
  // Calculate coin totals
  const calculateCoinTotal = (type, quantity) => {
    const values = {
      'Pennies': 0.01,
      'Nickles': 0.05,
      'Dimes': 0.10,
      'Quarters': 0.25,
    };
    const numericQuantity = quantity === '' ? 0 : parseInt(quantity);
    return '$' + (values[type] * numericQuantity).toFixed(2);
  };
  
  // Update bill quantity
  const handleBillChange = (denomination, value) => {
    if (value === '' || /^\d+$/.test(value)) {
      const updatedBills = {
        ...bills,
        [denomination]: {
          quantity: value,
          total: value === '' ? '$0.00' : calculateBillTotal(denomination, value)
        }
      };
      setBills(updatedBills);
    }
  };
  
  // Update coin quantity
  const handleCoinChange = (type, value) => {
    if (value === '' || /^\d+$/.test(value)) {
      const updatedCoins = {
        ...coins,
        [type]: {
          quantity: value,
          total: value === '' ? '$0.00' : calculateCoinTotal(type, value)
        }
      };
      setCoins(updatedCoins);
    }
  };
  
  // Handle check count change
  const handleCheckCountChange = (value) => {
    if (value === '' || /^\d+$/.test(value)) {
      setChecks({ ...checks, count: value });
    }
  };
  
  // Handle check total change
  const handleCheckTotalChange = (value) => {
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setChecks({ ...checks, total: value });
    }
  };
  
  // Calculate total amount
  useEffect(() => {
    let total = 0;
    
    // Add bill totals
    Object.keys(bills).forEach(denomination => {
      const value = parseInt(denomination.replace('$', ''));
      const quantity = bills[denomination].quantity === '' ? 0 : parseInt(bills[denomination].quantity);
      total += value * quantity;
    });
    
    // Add coin totals
    Object.keys(coins).forEach(type => {
      const values = {
        'Pennies': 0.01,
        'Nickles': 0.05,
        'Dimes': 0.10,
        'Quarters': 0.25,
      };
      const quantity = coins[type].quantity === '' ? 0 : parseInt(coins[type].quantity);
      total += values[type] * quantity;
    });
    
    // Add check total
    if (checks.total && checks.total !== '') {
      total += parseFloat(checks.total);
    }
    
    setTotalAmount('$' + total.toFixed(2));
  }, [bills, coins, checks]);
  
  // Clear all inputs
  const handleClear = () => {
    // Reset bills
    const clearedBills = {};
    Object.keys(bills).forEach(denomination => {
      clearedBills[denomination] = { quantity: '', total: '$0.00' };
    });
    setBills(clearedBills);
    
    // Reset coins
    const clearedCoins = {};
    Object.keys(coins).forEach(type => {
      clearedCoins[type] = { quantity: '', total: '$0.00' };
    });
    setCoins(clearedCoins);
    
    // Reset checks
    setChecks({ count: '', total: '' });
    
    // Reset error state
    setError(null);
  };
  
  // Submit cash count
  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success
      if (Math.random() > 0.2) {
        handleClear();
        // You'd typically show a success message here
      } else {
        // Simulate error
        setError("Failed to settle cash count. Please try again.");
      }
    }, 1000);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleDrawerChange = (event) => {
    setSelectedDrawer(event.target.value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      {/* Top Navigation */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h6" color="textSecondary">Test Account</Typography>
            </Grid>
            <Grid item sx={{ ml: 'auto' }}>
              <Select
                value="QA Automation"
                size="small"
                IconComponent={ArrowDropDownIcon}
                sx={{ minWidth: 150 }}
                disabled
              >
                <MenuItem value="QA Automation">QA Automation</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      {/* Secondary Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={-1} aria-label="site navigation">
          <Tab label="Catalog" />
          <Tab label="Customers" />
          <Tab label="Circulation" />
          <Tab label="Item request manager" />
          <Tab label="Point of sale" sx={{ color: theme.palette.primary.main, borderBottom: `2px solid ${theme.palette.primary.main}` }} />
          <Tab label="Events" />
          <Tab label="Acquisitions" />
        </Tabs>
      </Box>
      
      {/* Page Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Point of sale
      </Typography>
      
      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="point of sale tabs">
          <Tab label="Sell" value={0} />
          <Tab label="Cash handling" value={1} />
          <Tab label="Reports" value={2} />
        </Tabs>
      </Box>
      
      {tabValue === 1 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          
          {/* Cash Drawers Selection */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Cash drawers
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  displayEmpty
                  value={selectedDrawer}
                  onChange={handleDrawerChange}
                  IconComponent={KeyboardArrowDownIcon}
                  renderValue={(selected) => {
                    if (!selected) {
                      return 'Selection';
                    }
                    return selected;
                  }}
                  inputProps={{ 'aria-label': 'Select cash drawer' }}
                >
                  <MenuItem value="Drawer 1">Drawer 1</MenuItem>
                  <MenuItem value="Drawer 2">Drawer 2</MenuItem>
                  <MenuItem value="Drawer 3">Drawer 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button 
              variant="outlined" 
              color="primary"
              aria-label="Cash drop"
            >
              Cash drop
            </Button>
          </Box>
          
          {/* Bills Section */}
          <Typography variant="h6" gutterBottom>
            Bills
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {Object.keys(bills).map((denomination) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={denomination}>
                <Paper sx={{ p: 2, bgcolor: '#f8fbfd' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    {denomination}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                    <IconButton 
                      size="small"
                      aria-label={`Decrease ${denomination} quantity`}
                      onClick={() => {
                        const currentValue = bills[denomination].quantity;
                        if (currentValue && parseInt(currentValue) > 0) {
                          handleBillChange(denomination, (parseInt(currentValue) - 1).toString());
                        }
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <TextField
                      value={bills[denomination].quantity}
                      onChange={(e) => handleBillChange(denomination, e.target.value)}
                      inputProps={{ 
                        'aria-label': `${denomination} quantity`,
                        style: { textAlign: 'center' } 
                      }}
                      placeholder="#"
                      size="small"
                      sx={{ width: '40%' }}
                    />
                    <IconButton 
                      size="small"
                      aria-label={`Increase ${denomination} quantity`}
                      onClick={() => {
                        const currentValue = bills[denomination].quantity;
                        const newValue = currentValue === '' ? '1' : (parseInt(currentValue) + 1).toString();
                        handleBillChange(denomination, newValue);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2">Total:</Typography>
                    <Typography variant="body2">{bills[denomination].total}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          {/* Coins Section */}
          <Typography variant="h6" gutterBottom>
            Coins
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {Object.keys(coins).map((type) => (
              <Grid item xs={12} sm={6} md={3} key={type}>
                <Paper sx={{ p: 2, bgcolor: '#f8fbfd' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    {type}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                    <IconButton 
                      size="small"
                      aria-label={`Decrease ${type} quantity`}
                      onClick={() => {
                        const currentValue = coins[type].quantity;
                        if (currentValue && parseInt(currentValue) > 0) {
                          handleCoinChange(type, (parseInt(currentValue) - 1).toString());
                        }
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <TextField
                      value={coins[type].quantity}
                      onChange={(e) => handleCoinChange(type, e.target.value)}
                      inputProps={{ 
                        'aria-label': `${type} quantity`,
                        style: { textAlign: 'center' } 
                      }}
                      placeholder="#"
                      size="small"
                      sx={{ width: '40%' }}
                    />
                    <IconButton 
                      size="small"
                      aria-label={`Increase ${type} quantity`}
                      onClick={() => {
                        const currentValue = coins[type].quantity;
                        const newValue = currentValue === '' ? '1' : (parseInt(currentValue) + 1).toString();
                        handleCoinChange(type, newValue);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2">Total:</Typography>
                    <Typography variant="body2">{coins[type].total}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          {/* Checks/Other Section */}
          <Typography variant="h6" gutterBottom>
            Checks/Other
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, bgcolor: '#f8fbfd' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Check count
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                  <IconButton 
                    size="small"
                    aria-label="Decrease check count"
                    onClick={() => {
                      const currentValue = checks.count;
                      if (currentValue && parseInt(currentValue) > 0) {
                        handleCheckCountChange((parseInt(currentValue) - 1).toString());
                      }
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <TextField
                    value={checks.count}
                    onChange={(e) => handleCheckCountChange(e.target.value)}
                    inputProps={{ 
                      'aria-label': 'Check count',
                      style: { textAlign: 'center' } 
                    }}
                    placeholder="#"
                    size="small"
                    sx={{ width: '40%' }}
                  />
                  <IconButton 
                    size="small"
                    aria-label="Increase check count"
                    onClick={() => {
                      const currentValue = checks.count;
                      const newValue = currentValue === '' ? '1' : (parseInt(currentValue) + 1).toString();
                      handleCheckCountChange(newValue);
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, bgcolor: '#f8fbfd' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Check total
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
                  <TextField
                    value={checks.total}
                    onChange={(e) => handleCheckTotalChange(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    inputProps={{ 'aria-label': 'Check total' }}
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Total and Actions */}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Box>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="h5">{totalAmount}</Typography>
            </Box>
            <Box>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleClear}
                sx={{ mr: 2 }}
                aria-label="Clear all inputs"
              >
                Clear
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
                disabled={isLoading}
                aria-label="Submit cash count"
              >
                {isLoading ? 'Processing...' : 'Settle cash count'}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CashHandlingPage;