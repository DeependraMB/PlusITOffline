import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [assembly, setAssembly] = useState("");
  const [constituency, setConstituency] = useState("");
  const [district, setDistrict] = useState("");
  const [panchayath, setPanchayath] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [corporation, setCorporation] = useState("");
  const [assemblies, setAssemblies] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  //   const [panchayaths, setPanchayaths] = useState([]);
  //   const [municipalities, setMunicipalities] = useState([]);
  //   const [corporations, setCorporations] = useState([]);

  useEffect(() => {
    axios
      .get("https://dcc-backend-qgm5.onrender.com/api/admin/districtV4")
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  }, []);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);

    axios
      .get(
        `https://dcc-backend-qgm5.onrender.com/api/admin/districtV4?district=${selectedDistrict}`
      )
      .then((response) => {
        setConstituencies(response.data);
        setAssembly("");
      })
      .catch((error) => {
        console.error("Error fetching constituencies:", error);
      });
  };

  const handleConstituencyChange = (event) => {
    const selectedConstituency = event.target.value;
    setConstituency(selectedConstituency);

    axios
      .get(
        `https://dcc-backend-qgm5.onrender.com/api/admin/districtV4?district=${district}&constituency=${selectedConstituency}`
      )
      .then((response) => {
        setAssemblies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assemblies:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post(
        "https://dcc-backend-qgm5.onrender.com/api/user/register",
        {
          name,
          email,
          password,
          phoneNumber,
          date_of_birth,
          assembly,
          constituency,
          district,
          panchayath,
          municipality,
          corporation,
        }
      );
      console.log(response.data);
      const { user } = response.data;

      console.log("User registered:", user);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              fullWidth
              type="date"
              value={date_of_birth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>District</InputLabel>
              <Select
                value={district}
                onChange={handleDistrictChange}
                label="District"
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {district && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Constituency</InputLabel>
                <Select
                  value={constituency}
                  onChange={handleConstituencyChange}
                  label="Constituency"
                >
                  {constituencies.map((constituency) => (
                    <MenuItem key={constituency} value={constituency}>
                      {constituency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {assemblies.length > 0 && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Assembly</InputLabel>
                <Select
                  value={assembly}
                  onChange={(e) => setAssembly(e.target.value)}
                  label="Assembly"
                >
                  {assemblies.map((assembly) => (
                    <MenuItem key={assembly} value={assembly}>
                      {assembly}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              label="Panchayth"
              variant="outlined"
              fullWidth
              value={panchayath}
              onChange={(e) => setPanchayath(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Municipality"
              variant="outlined"
              fullWidth
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Corporation"
              variant="outlined"
              fullWidth
              value={corporation}
              onChange={(e) => setCorporation(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
}

export default RegisterForm;
