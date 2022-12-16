import {
  Avatar, Box, Button, Dialog, Divider, Input, makeStyles, MenuItem, Select, Slider, Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useRef, useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import { useDispatch, useSelector } from "react-redux";
import { changeImageProfile } from "../../actions";

const useStyles = makeStyles((theme) => ({
  FormLittleBox: {
    display: "flex",
    flexWrap: "wrap",
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBox: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      fontSize: 16,
      padding: 5,
    },
  },
  SettingContent: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    display: "block",
    alignItems: "center",
    width: "25%",
  },
  MenuSetting: {
    height: 50,
  },
  Spacer: {
    width: "100%",
    height: 50,
  },
  Header: {
    fontSize: 18,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  Dialog: {
    width: 350,
    height: 600,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      height: "80vh",
      width: "auto",
    },
  },
  formContainer: {
    boxSizing: "border-box",
    width: 1000,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
}));

const Canton = [
  "Argovie",
  "Appenzell Rhodes-Intérieures",
  "Appenzell Rhodes-Extérieures",
  "Berne",
  "Bâle-Compagne",
  "Bâle-Ville",
  "Fribourg",
  "Genève",
  "Glaris",
  "Grisons",
  "Jura",
  "Lucerne",
  "Neuchâtel",
  "Nidwal",
  "Saint-Gall",
  "Schaffhouse",
  "Soleure",
  "Schwytz",
  "Thurgovie",
  "Tessin",
  "Uri",
  "Vaud",
  "Valais",
  "Zoug",
  "Zurich",
];
const Reduction = [
  "-",
  "5%",
  "10%",
  "15%",
  "20%",
  "25%",
  "30%",
  "35%",
  "40%",
  "45%",
  "50%",
];

const UserProfile = () => {
  const editor = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [canton, setCanton] = useState("");
  const [openChange, setOpenChange] = useState(false);
  const state = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState({
    image: "",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    file: true ? "s" : null,
    scale: 1,
    rotate: 0,
    preview: null,
  });

  const imageHandleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage({
        ...selectedImage,
        image: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (state.image?.image) {
      setSelectedImage({
        ...selectedImage,
        image: `/imageProfile/${state.id}/${state.image?.image}`,
      });
    }
  }, []);

  const handleScale = (e, value) => {
    console.log(value);
    const scale = parseFloat(value);
    setSelectedImage({ ...selectedImage, scale: scale });
  };

  const handlePositionChange = (position) => {
    setSelectedImage({ ...selectedImage, position: position });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenChange = () => {
    setOpenChange(true);
  };

  const handleChangeClose = () => {
    if (state.image?.image) {
      setSelectedImage({
        ...selectedImage,
        image: `/imageProfile/${state.id}/${state.image?.image}`,
      });
    }
    setOpenChange(false);
  };

  return (
    <Box style={{ backgroundColor: "#F5f5f3" }} height={"100%"} width={"100%"}>
      <Box className={classes.Spacer} />
      <Box className={classes.formContainer}>
        <Box width={"100%"} marginRight={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.MenuSetting}
          >
            <Typography className={classes.Header}>
              Détails du profile
            </Typography>
          </Box>
          <Box padding={2} className={classes.FormLittleBox}>
            <Box className={classes.SubFormLittleBox}>
              <Box padding={3}>
                <Typography>Ta photo de profil</Typography>
              </Box>
            </Box>

            <Box className={classes.SubFormLittleBox} justifyContent="flex-end">
              <Avatar
                style={{
                  marginRight: 10,
                  fontSize: 20,
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
                alt={`${state.Pseudo}`}
                src={`/imageProfile/${state.id}/${state.image?.image}`}
              />

              <Button
                onClick={handleOpenChange}
                variant="contained"
                color="primary"
              >
                {state.image?.image ? "changer de photo" : "upload une photo"}
              </Button>
              <Dialog open={openChange}>
                <Box className={classes.Dialog}>
                  <Box
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                    className={classes.MenuSetting}
                  >
                    <Typography className={classes.Header}>
                      Ajouter une photo
                    </Typography>
                  </Box>

                  <Box display={"flex"} justifyContent="center" width={"100%"}>
                    <ReactAvatarEditor
                      scale={parseFloat(selectedImage.scale)}
                      ref={editor}
                      position={selectedImage.position}
                      onPositionChange={handlePositionChange}
                      rotate={parseFloat(selectedImage.rotate)}
                      style={{
                        padding: 20,
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                      }}
                      borderRadius={"100%"}
                      disableDrop={true}
                      image={selectedImage.image}
                      className="editor-canvas"
                    />
                  </Box>
                  <Box padding={3}>
                    <Slider
                      min={1}
                      step={0.01}
                      max={2}
                      onChange={handleScale}
                    />

                    <form style={{ width: "100%", padding: 10 }}>
                      <input
                        style={{ display: "none" }}
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={imageHandleChange}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          startIcon={<AddIcon></AddIcon>}
                          style={{ width: "100%" }}
                          variant="outlined"
                          color="primary"
                          component="span"
                        >
                          <Typography>Ajouter une photo</Typography>
                        </Button>
                      </label>
                    </form>

                    {selectedImage.image ? (
                      <Box
                        display={"flex"}
                        justifyContent="center"
                        paddingTop={2}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          style={{ width: "100%" }}
                          onClick={() => {
                            const canvas = editor.current.getImage();
                            console.log(editor.current);

                            canvas.toBlob(function (blob) {
                              const file = new File(
                                [blob],
                                selectedImage.file.name,
                                { type: selectedImage.file.type }
                              );
                              dispatch(changeImageProfile(file));
                            });
                          }}
                        >
                          <Typography>Sauvegarder</Typography>
                        </Button>
                      </Box>
                    ) : null}

                    <Box
                      display={"flex"}
                      justifyContent="center"
                      paddingTop={2}
                    >
                      <Button
                        color="primary"
                        variant="outlined"
                        style={{ width: "100%" }}
                        onClick={handleChangeClose}
                      >
                        <Typography>Retour</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Dialog>
            </Box>
          </Box>
          <Divider />
          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBox}>
              <Box padding={3}>
                <Typography>Adresse E-mail</Typography>
              </Box>
              <Box padding={3} display="flex">
                <Typography>{state.Email}</Typography>
              </Box>
            </Box>

            <Box className={classes.SubFormLittleBox} justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Changer
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBox}>
              <Box padding={3}>
                <Typography>Mot de passe</Typography>
              </Box>
            </Box>

            <Box className={classes.SubFormLittleBox} justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Changer
              </Button>
            </Box>
          </Box>

          <Divider />

          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBox}>
              <Box padding={3}>
                <Typography>Numéro de téléphone</Typography>
              </Box>
              <Box padding={3} display="flex">
                <Typography>XHXXXXXXXXXXXXXXXXXXXXXXXX</Typography>
              </Box>
            </Box>

            <Box className={classes.SubFormLittleBox} justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Changer
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className={classes.Spacer} />

        <Box display="block" className={classes.boxShadow}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.MenuSetting}
          >
            <Typography className={classes.Header}>Envoi</Typography>
          </Box>

          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBox}>
              <Box padding={3} display="flex">
                <Typography style={{ paddingRight: 5 }}>Adresse</Typography>
              </Box>
              <Box padding={3}>
                <Typography>chemin des couilles 3901,1058</Typography>
              </Box>
            </Box>

            <Box className={classes.SubFormLittleBox} justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(!open)}
              >
                Changer
              </Button>
            </Box>
          </Box>
          <Dialog open={open}>
            <Box className={classes.Dialog}>
              <Box
                justifyContent="center"
                display="flex"
                alignItems="center"
                className={classes.MenuSetting}
              >
                <Typography className={classes.Header}>
                  Ajouter une Adresse
                </Typography>
              </Box>

              <Box padding={5}>
                <Box display="block" width={"100%"}>
                  <Box>
                    <Typography>Canton</Typography>
                  </Box>
                  <Select
                    value={canton}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setCanton(e.target.value || "");
                    }}
                    MenuProps={{
                      anchorOrigin: { vertical: "bottom", horizontal: "left" },
                      transformOrigin: { vertical: "top", horizontal: "left" },
                      MenuListProps: {
                        variant: "menu",
                        style: {
                          maxHeight: 150,
                        },
                      },
                    }}
                  >
                    {Canton.map((item) => {
                      return (
                        <MenuItem
                          key={item}
                          value={item}
                          className={classes.MenuSetting}
                          display="flex"
                          alignItems="center"
                        >
                          <Typography className={classes.Header}>
                            {item}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>

                <Box width={"100%"} height={25} />

                <Box width={"100%"} display="block">
                  <Box>
                    <Typography>Canton</Typography>
                  </Box>
                  <Input placeholder="Saisis ton nom et prénom" fullWidth />
                </Box>

                <Box width={"100%"} height={25} />

                <Box width={"100%"} display="block">
                  <Box>
                    <Typography>Localité</Typography>
                  </Box>
                  <Input placeholder="Saisis une localité" fullWidth />
                </Box>

                <Box width={"100%"} height={25} />

                <Box width={"100%"} display="block">
                  <Box>
                    <Typography>NPA</Typography>
                  </Box>
                  <Input placeholder="Saisis un code postal" fullWidth />
                </Box>

                <Box width={"100%"} height={25} />

                <Box width={"100%"} display="block">
                  <Box>
                    <Typography>Nom de rue/chemin et numéro</Typography>
                  </Box>
                  <Input placeholder="Saisis une rue" fullWidth />
                </Box>

                <Box width={"100%"} height={25} />

                <Box width={"100%"} display="block">
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ width: "100%" }}
                  >
                    <Typography>Enrgistrer</Typography>
                  </Button>
                  <Box width={"100%"} height={5} />

                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onClick={handleClose}
                  >
                    <Typography>Annuler</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Dialog>
        </Box>

        <Box className={classes.Spacer} />
      </Box>
    </Box>
  );
};

export default UserProfile;
