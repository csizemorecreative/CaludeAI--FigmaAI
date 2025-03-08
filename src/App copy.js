import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Switch,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { staffCompact } from "@oclc/design-system-components";
import extendedTheme from 'mylib/themes/extended-theme';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5733',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e04b2a',
  },
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  width: '100%',
  marginTop: theme.spacing(2),
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5733',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e04b2a',
  },
  borderRadius: theme.spacing(1),
}));

const BookCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const BookImage = styled(CardMedia)(({ theme }) => ({
  paddingTop: '150%', // 2:3 aspect ratio for book covers
}));

function LibraConnect() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // State for form fields
  const [promoCode, setPromoCode] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: false,
  });

  // Mock data for recent checkouts
  const recentBooks = [
    { id: 1, title: 'The Great Gatsby', genre: 'Fiction', cover: '/images/gatsby.jpg' },
    { id: 2, title: '1984', genre: 'Dystopian', cover: '/images/1984.jpg' },
    { id: 3, title: 'To Kill a Mockingbird', genre: 'Classic', cover: '/images/mockingbird.jpg' },
    { id: 4, title: 'Moby Dick', genre: 'Adventure', cover: '/images/mobydick.jpg' },
    { id: 5, title: 'Pride and Prejudice', genre: 'Romance', cover: '/images/pride.jpg' },
    { id: 6, title: 'The Odyssey', genre: 'Epic', cover: '/images/odyssey.jpg' },
  ];

  // Handle notification setting changes
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with logo */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: '#ff5733', 
            fontWeight: 'bold' 
          }}
        >
          <Box 
            component="span" 
            sx={{ 
              mr: 1, 
              display: 'inline-block', 
              width: 24, 
              height: 24, 
              borderRadius: '50%', 
              backgroundColor: '#ff5733',
              position: 'relative'
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                border: '2px solid white'
              }}
            />
          </Box>
          LibraConnect
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Cart and Profile */}
        <Grid item xs={12} md={4}>
          {/* Checkout Section */}
          <StyledPaper 
            elevation={1} 
            sx={{ bgcolor: 'rgba(255, 87, 51, 0.05)' }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Fines/Fees
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2" fontWeight="medium">$15.00</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">$0.00</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2">Estimated tax</Typography>
              <Typography variant="body2">$0.00</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" fontWeight="medium">Total</Typography>
              <Typography variant="body1" fontWeight="medium">$15.00</Typography>
            </Box>
            
            <CheckoutButton>Check out</CheckoutButton>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="text" size="small" sx={{ color: 'text.secondary' }}>
                Pay via Library Card
              </Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Promo code</Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField 
                  size="small"
                  placeholder="Enter code"
                  variant="outlined"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                  sx={{ 
                    mr: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                    }
                  }}
                />
                <ApplyButton size="small">Apply</ApplyButton>
              </Box>
            </Box>
          </StyledPaper>

          {/* Profile Section - Only shown on mobile */}
          {isMobile && (
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 200, 
                  backgroundColor: '#f5f5f5', 
                  backgroundImage: 'url(/images/library-background.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  mb: 2,
                  position: 'relative'
                }}
              >
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    border: '4px solid white',
                    position: 'absolute',
                    bottom: -40,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                  src="/images/profile.jpg"
                />
              </Box>
              
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h6" component="h2">Evangeline Quill</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>rare_bibliophile</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Typography variant="body2">0 followers</Typography>
                  <Typography variant="body2">0 following</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>

        {/* Right Column - Account Management */}
        <Grid item xs={12} md={8}>
          {/* Profile Section - Only shown on desktop */}
          {!isMobile && (
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column' }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 250, 
                  backgroundColor: '#f5f5f5', 
                  backgroundImage: 'url(/images/library-background.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  mb: 2,
                  position: 'relative'
                }}
              >
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    border: '4px solid white',
                    position: 'absolute',
                    bottom: -40,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                  src="/images/profile.jpg"
                />
              </Box>
              
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h6" component="h2">
                  Evangeline Quill 
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      ml: 1,
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      backgroundColor: '#ff5733'
                    }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>rare_bibliophile</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Typography variant="body2">0 followers</Typography>
                  <Typography variant="body2">0 following</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Account Management Section */}
          <StyledPaper elevation={1}>
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              Manage Account
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ mr: 2 }} 
                src="/images/profile.jpg"
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Username</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter new username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          sx={{ 
                            backgroundColor: '#ff5733',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#e04b2a',
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </StyledPaper>

          {/* Notification Settings */}
          <StyledPaper elevation={1}>
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              Notification Settings
            </Typography>
            
            <List disablePadding>
              <ListItem 
                disableGutters
                secondaryAction={
                  <Switch
                    edge="end"
                    checked={notificationSettings.email}
                    onChange={() => handleNotificationChange('email')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ff5733',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#ff5733',
                      },
                    }}
                  />
                }
              >
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive updates via email"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              
              <Divider component="li" sx={{ my: 1 }} />
              
              <ListItem 
                disableGutters
                secondaryAction={
                  <Switch
                    edge="end"
                    checked={notificationSettings.sms}
                    onChange={() => handleNotificationChange('sms')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ff5733',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#ff5733',
                      },
                    }}
                  />
                }
              >
                <ListItemText 
                  primary="SMS Notifications" 
                  secondary="Receive updates via SMS"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              
              <Divider component="li" sx={{ my: 1 }} />
              
              <ListItem 
                disableGutters
                secondaryAction={
                  <Switch
                    edge="end"
                    checked={notificationSettings.push}
                    onChange={() => handleNotificationChange('push')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ff5733',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#ff5733',
                      },
                    }}
                  />
                }
              >
                <ListItemText 
                  primary="Push Notifications" 
                  secondary="Receive app notifications"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              
              <Divider component="li" sx={{ my: 1 }} />
              
              <ListItem 
                disableGutters
                secondaryAction={
                  <Switch
                    edge="end"
                    checked={notificationSettings.newsletter}
                    onChange={() => handleNotificationChange('newsletter')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ff5733',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#ff5733',
                      },
                    }}
                  />
                }
              >
                <ListItemText 
                  primary="Newsletter Subscription" 
                  secondary="Subscribe to our newsletter"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
          </StyledPaper>

          {/* Personal Data Section */}
          <StyledPaper elevation={1}>
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              Edit Personal Data
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>First Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter first name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Last Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter last name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter email address"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Phone Number</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter phone number"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#333', 
                  '&:hover': { backgroundColor: '#555' } 
                }}
              >
                Save Changes
              </Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </StyledPaper>

          {/* Recent Checkouts */}
          <StyledPaper elevation={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" component="h2">
                Most Recent Checkouts
              </Typography>
              <Button 
                endIcon={<ArrowForwardIcon />} 
                sx={{ color: '#ff5733' }}
              >
                See all
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {recentBooks.map((book) => (
                <Grid item key={book.id} xs={6} sm={4} md={isMobile ? 6 : 4} lg={2}>
                  <BookCard>
                    <BookImage
                      image={book.cover}
                      title={book.title}
                      alt={`Cover of ${book.title}`}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                      <Typography variant="subtitle2" component="h3" noWrap>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.genre}
                      </Typography>
                      <Typography variant="caption">
                        1
                      </Typography>
                    </CardContent>
                  </BookCard>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LibraConnect;