import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editItem, getItemCreationInfo
} from "../../actions";
import ItemForm from "./ItemForm";

const ItemEdit = ({ loading, loaded, editItemPage }) => {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editItem(id));
    dispatch(getItemCreationInfo());
  }, [dispatch]);

  if (loading && !loaded) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  const newArray = Array.from(editItemPage?.image).map((file) =>
    URL.createObjectURL(file)
  );

  let initialValues = {
    Titre: editItemPage?.Name,
    Description: editItemPage?.Description,
    image: newArray,
    Catalogue: editItemPage?.item_category,
    Brand: editItemPage?.item_brand,
    Size: editItemPage?.Price,
    Color: editItemPage?.item_color,
    Price: editItemPage?.Price,
    State: editItemPage?.itemcondition,
  };

  return (
    <Box>
      <ItemForm
        id={id}
        edit={true}
        editItem={editItemPage.image}
        initialValues={initialValues}
      />
    </Box>
  );
};
const mapStateToProps = (state) => ({
  loading: state.items.loading,
  loaded: state.items.loaded,
  editItemPage: state.items.editItemPage,
});

export default connect(mapStateToProps)(ItemEdit);
