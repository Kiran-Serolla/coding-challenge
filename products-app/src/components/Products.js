import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import SearchBar from "./SearchBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Products() {
  const [productArray, setProductArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const postApi = async () => {
    try {
      await axios
        .post(
          "https://pfp-public-productdb-api.azurewebsites.net/api/product/search",
          {}
        )
        .then((res) => {
          setProductArray(res?.data?.results);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    postApi();
  }, []);

  if (loading) return <h1>Loading..</h1>;
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <SearchBar />
          </Grid>
          <Grid item xs={8}>
          
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {productArray.map((product, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>
                  <p key={index}>{product.id}</p>
                  <p>{product.name}</p>
                </Item>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
     
      </Grid>
    </Box>
    
    </div>
  );
}
export default Products;
