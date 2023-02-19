import {
  alpha,
  Box,
  ClickAwayListener,
  MenuItem,
  Popper,
  Typography
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addFilterFromSearch, getInfoSearch } from "../../actions";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    flexGrow: 1,
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    zIndex: 1400,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
}));

/* let regex;
const filterArray = subArray.filter((el, index) => {
  return array2.some((filter) => {
    regex = new RegExp(`\\b${filter}`, "i");

    return regex.test(el.Name);
  });
})

return filterArray*/
const options = {
  includeScore: true,
  keys: ["Name"],
  threshold: 0.1,
};
const matchValueSearch = (array1, searchArray) => {
  const array = array1.map((subArray, index) => {
    const filterArray = new Fuse(subArray, options).search(
      { $or: searchArray },
      { limit: 5 }
    );

    return filterArray;
  });
  return array;
};
const WOMAN_ID = { Name: "Femme", id: 1 };
const MAN_ID = { Name: "Homme", id: 101 };

const makeCombination = (arrays, noFilterArrayCategory, currentText) => {

  const [arrayBrand, arrayCategory] = arrays;
  const suggestionArray = [];

  if (!arrayBrand) {
    return suggestionArray;
  }

  if (arrayBrand.length !== 0) {
    const { item } = arrayBrand[0];
    suggestionArray.push(item.Name);
    if (arrayCategory?.length !== 0) {
      for (let index = 0; index < arrayCategory.length; index++) {
        suggestionArray.push(`${item.Name} ${arrayCategory[index].item.Name}`);
      }
    } else {
      for (let index = 0; index < 5; index++) {
        suggestionArray.push(
          `${item.Name} ${noFilterArrayCategory[1][index].Name}`
        );
      }
    }
  } else if (arrayBrand.length === 0 && arrayCategory.length !== 0) {
    const { item } = arrayCategory[0];
    suggestionArray.push(item.Name);
    for (let index = 0; index < 5; index++) {
      suggestionArray.push(
        `${noFilterArrayCategory[0][index]?.Name}   ${item?.Name}`
      );
    }
  } else {
    suggestionArray.push(WOMAN_ID.Name);
    suggestionArray.push(MAN_ID.Name);
  }


  return suggestionArray;
};

const transformSearchToArrayString = (string) => {
  return string.split(/\b(?:a|the|was|\s)+\b/i).map((strArray) => {
    return { Name: strArray.replace(/\s*$/, "") };
  });
};

const renderSuggestion = (suggestion,dispatch,history,handleMenuClose) => {
  return suggestion.map((item) => {
    return (
      <MenuItem style={{ height: 40 }} key={item} onClick={()=>{
        
        dispatch(addFilterFromSearch(item,true,history))
        handleMenuClose()
      }}>
        <Typography style={{ fontSize: 16 }}>{item}</Typography>
      </MenuItem>
    );
  });
};

const Search = ({ SearchInfo, loading ,loadingFilter}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const location = useLocation();
  const [arrayFilter, setArrayFilter] = useState([]);
  const [filterQuery, setFilterQuery] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useNavigate();


  const menuRef = useRef();

  const handleMenuDesktop = (event) => {
    setAnchorEl(menuRef.current);
  };
  useEffect(() => {
    setTerm("");
  }, [location.pathname]);

  useEffect(() => {
    if (!SearchInfo && loading) {
      dispatch(getInfoSearch());
    } else {
      setArrayFilter(SearchInfo);
    }
  }, [dispatch, loading]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setTerm("");
  };

  useEffect(() => {
    if (term !== "" && !anchorEl) {
      handleMenuDesktop();


    } else if (term !== "" && anchorEl) {
      setTimeout(() => {
        setFilterQuery(
          matchValueSearch(arrayFilter, transformSearchToArrayString(term))
        );
      }, 100);
    } else {
      handleMenuClose();
      setFilterQuery([]);
    }
    
    
  }, [term, anchorEl]);

  const onChange = (e) => {
    setTerm(e.target.value);
  };


  return (
    <ClickAwayListener style={{backgroundColor:"red"}} onClickAway={handleMenuClose} >

    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
        <InputBase
          ref={menuRef}
          spellCheck="false"
          style={{ zIndex: 1400 }}
          value={term}
          fullWidth={true}
          placeholder="Rechercher un article"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={onChange}
          inputProps={{ "aria-label": "Rechercher un article" }}
        />

      <Popper
        disableScrollLock={true}
        open={Boolean(anchorEl)}
        anchorEl={menuRef.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transitionDuration={0}
        disableAutoFocusItem
        disablePortal={true}
        style={{
          width: menuRef?.current?.offsetWidth,
        }}
      >
        <Box
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            transform: "translateY(5px)",
            maxHeight: "50vh",
            overflow: "auto",
          }}
        >
          {term !== ""
            ? renderSuggestion(makeCombination(filterQuery, arrayFilter, term),dispatch,history,handleMenuClose)
            : null}
        </Box>
      </Popper>
    </div>
    </ClickAwayListener>

  );
};

const mapStateToProps = (state) => ({
  SearchInfo: state.itemInfo.Search,
  loading: state.itemInfo.loading,
  loadingFilter:state.filterCatalogue.loading
});

export default connect(mapStateToProps)(Search);
