import React, {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {styled, alpha} from "@mui/material/styles";
import NavBar from "./NavBar";
import PageHeader from "./PageHeader";
const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const SearchIconWrapper = styled("div")(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Search = styled("div")(({theme}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
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
        <NavBar/>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={4}>
          <Grid item xs="auto">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{"aria-label": "search"}}
              />
            </Search>
          </Grid>
          <Grid item xs={8}>
            <PageHeader/>
            <Grid
              container
              spacing={{xs: 2, md: 3}}
              columns={{xs: 4, sm: 8, md: 12}}
            >
              {productArray.map((product, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item>
                      <p key={index}>{product.id}</p>
                      <p>{product.name}</p>
                      {product.productCategoryRelations.map((p)=>{
                        return <p>Kategori :{p.productCategoryType?.name}</p>
                      })}
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
