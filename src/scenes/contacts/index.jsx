import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Grid,
  Card,
  CardContent,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Search,
  Add,
  Edit,
  Delete,
  Phone,
  Email,
  MoreVert,
  FilterList,
  Download,
  Visibility,
  AdminPanelSettings,
  ManageAccounts,
  PersonOutline,
} from "@mui/icons-material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Contacts = () => {
  const theme = useTheme();
  // Safe access to tokens with fallbacks
  const colors = tokens(theme.palette.mode) || {};
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterAccess, setFilterAccess] = useState("all");

  // Your contacts data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Sai Teja",
      email: "saiteja@gmail.com",
      age: 23,
      phone: "+91 9999999999",
      access: "admin",
    },
    {
      id: 2,
      name: "Sai",
      email: "sai@gmail.com",
      age: 22,
      phone: "+91 8888888888",
      access: "manager",
    },
    {
      id: 3,
      name: "Teja",
      email: "teja@gmail.com",
      age: 18,
      phone: "+91 7777777777",
      access: "user",
    },
    {
      id: 4,
      name: "Vinny",
      email: "vinny@gmail.com",
      age: 23,
      phone: "+91 9999999998",
      access: "admin",
    },
    {
      id: 5,
      name: "VinnySai",
      email: "vinnysai@gmail.com",
      age: 23,
      phone: "+91 9999999997",
      access: "user",
    },
    {
      id: 6,
      name: "Prabhu",
      email: "prabhu@gmail.com",
      age: 21,
      phone: "+91 6666666666",
      access: "manager",
    },
    {
      id: 7,
      name: "Sona",
      email: "Sona@gmail.com",
      age: 23,
      phone: "+91 3333333333",
      access: "user",
    },
    {
      id: 8,
      name: "Sita",
      email: "sita@gmail.com",
      age: 23,
      phone: "+91 2222222222",
      access: "user",
    },
    {
      id: 9,
      name: "Bangaram",
      email: "bangaram@gmail.com",
      age: 23,
      phone: "+91 1111111111",
      access: "admin",
    },
  ]);

  // Helper function to safely get colors with fallbacks
  const getColor = (colorPath) => {
    const path = colorPath.split('.');
    let value = colors;
    
    for (const key of path) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        // Return fallback colors if the path doesn't exist
        switch (colorPath) {
          case 'blueAccent.500': return '#1976d2';
          case 'redAccent.500': return '#d32f2f';
          case 'greenAccent.500': return '#2e7d32';
          case 'yellowAccent.500': return '#ed6c02';
          case 'primary.400': return '#f5f5f5';
          case 'grey.100': return '#f5f5f5';
          default: return '#757575';
        }
      }
    }
    return value || '#757575';
  };

  // Get access chip color with fallbacks
  const getAccessColor = (access) => {
    switch (access) {
      case "admin": return getColor('redAccent.500');
      case "manager": return getColor('blueAccent.500');
      case "user": return getColor('greenAccent.500');
      default: return getColor('grey.500');
    }
  };

  // Filter contacts based on search and access filter
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    const matchesAccess = filterAccess === "all" || contact.access === filterAccess;
    return matchesSearch && matchesAccess;
  });

  // Handle menu actions
  const handleMenuOpen = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  // Handle delete contact
  const handleDelete = () => {
    if (selectedContact) {
      setContacts(contacts.filter(c => c.id !== selectedContact.id));
      handleMenuClose();
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get access icon
  const getAccessIcon = (access) => {
    switch (access) {
      case "admin": return <AdminPanelSettings />;
      case "manager": return <ManageAccounts />;
      case "user": return <PersonOutline />;
      default: return <PersonOutline />;
    }
  };

  // Add new contact function
  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: `New Contact ${contacts.length + 1}`,
      email: `new${contacts.length + 1}@gmail.com`,
      age: 25,
      phone: "+91 0000000000",
      access: "user"
    };
    setContacts([...contacts, newContact]);
  };

  // Pagination
  const paginatedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="Manage your contacts" />
      
      {/* Toolbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter by Access</InputLabel>
            <Select
              value={filterAccess}
              label="Filter by Access"
              onChange={(e) => setFilterAccess(e.target.value)}
            >
              <MenuItem value="all">All Access</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddContact}
            sx={{
              backgroundColor: getColor('blueAccent.500'),
              "&:hover": { backgroundColor: getColor('blueAccent.600') },
            }}
          >
            Add Contact
          </Button>
          
          <IconButton>
            <FilterList />
          </IconButton>
          
          <IconButton>
            <Download />
          </IconButton>
        </Box>
      </Box>

      {/* Contacts Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          backgroundColor: getColor('primary.400'),
          '& .MuiTableCell-head': {
            fontWeight: 'bold',
            color: getColor('grey.100'),
            backgroundColor: getColor('primary.500') || '#1976d2',
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Access Level</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact.id} hover>
                <TableCell>{contact.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: getAccessColor(contact.access) }}>
                      {contact.name.charAt(0)}
                    </Avatar>
                    {contact.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Email fontSize="small" />
                    {contact.email}
                  </Box>
                </TableCell>
                <TableCell>{contact.age}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Phone fontSize="small" />
                    {contact.phone}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getAccessIcon(contact.access)}
                    label={contact.access.toUpperCase()}
                    sx={{
                      backgroundColor: getAccessColor(contact.access),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Tooltip title="View Details">
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="secondary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More Actions">
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, contact)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredContacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />

      {/* Summary Cards */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: getColor('blueAccent.500') }}>
            <CardContent>
              <Typography variant="h5" color="white" gutterBottom>
                Total Contacts
              </Typography>
              <Typography variant="h3" color="white">
                {contacts.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: getColor('redAccent.500') }}>
            <CardContent>
              <Typography variant="h5" color="white" gutterBottom>
                Admin Users
              </Typography>
              <Typography variant="h3" color="white">
                {contacts.filter(c => c.access === "admin").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: getColor('greenAccent.500') }}>
            <CardContent>
              <Typography variant="h5" color="white" gutterBottom>
                Manager Users
              </Typography>
              <Typography variant="h3" color="white">
                {contacts.filter(c => c.access === "manager").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: getColor('yellowAccent.500') }}>
            <CardContent>
              <Typography variant="h5" color="white" gutterBottom>
                Regular Users
              </Typography>
              <Typography variant="h3" color="white">
                {contacts.filter(c => c.access === "user").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit Contact
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: getColor('redAccent.500') }}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete Contact
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Contacts;