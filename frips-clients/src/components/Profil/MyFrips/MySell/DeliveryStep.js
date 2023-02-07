import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import DetailsDelivery from "./DetailsDelivery";
import { Box, Divider } from "@material-ui/core";
import RatingComponent from "./RatingComponent";
import { useDispatch } from "react-redux";
import { changeStep } from "../../../../actions";
import { DELIVERY } from "../../../../actions/type";
import moment from "moment";
import "moment/locale/de";
import "moment/locale/fr";
import { set } from "lodash";
const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#82A0C2",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#82A0C2",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(130, 160, 194) 0%,rgb(130, 160, 194) 50%,rgb(130, 160, 194) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(130, 160, 194) 0%,rgb(130, 160, 194) 50%,rgb(130, 160, 194) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(130, 160, 194) 0%, rgb(130, 160, 194) 50%, rgb(130, 160, 194) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(130, 160, 194) 0%, rgb(130, 160, 194) 50%, rgb(130, 160, 194) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <TbTruckDelivery size={"2em"} />,
    2: <AiOutlineStar size={"2em"} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        icons[String(props.icon)]
      )}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Livraison", "Review"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Livraison";
    case 1:
      return "Review";

    default:
      return "Unknown step";
  }
}

const handleNumberStep = ({ Status, DateSend }) => {
  if (!DateSend) {
    return 0;
  }
  if (!Boolean(Status) && DateSend) {
    return 1;
  }
  if (Boolean(Status) && DateSend) {
    return 2;
  } else {
    return 0;
  }
};

const DeliveryStep = ({ item, account, id }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [index, setindex] = useState(0);
  console.log(item)

  const steps = getSteps();
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    setActiveStep(handleNumberStep(item));
    setindex(handleNumberStep(item))
  }, [item]);

  const handleIndex = ({ Status, DateSend }) => {
    if (index === 0) {
      return <DetailsDelivery account={account} />;
    } 
    if(index===1 && Boolean(DateSend)){
        return <RatingComponent Pseudo={account.Pseudo} />;
      
    }
    else return <DetailsDelivery item={item} account={account} />;
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label,index) => (
          <Step key={label} style={{ cursor: "pointer" }} onClick={()=>{
            setindex(index)
          }}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography style={{ fontSize: 14 }}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />

      <Box
        style={{
          backgroundColor: Boolean(item.DateSend) ? "#EFFFE7" : "#dc3545",
          height: 100,
        }}
        display={"flex"}
        alignItems="center"
        padding={5}
        justifyContent="space-between"
      >
        <Button
          disabled={Boolean(item.DateSend)}
          onClick={() => {
            dispatch(changeStep(id, DELIVERY,item.id_transaction,"Delivery"));
            setindex(index+1)
          }}
          style={{ fontSize: 14 }}
          variant="contained"
        >
          Marquer comme envoyé
        </Button>

        {Boolean(item.DateSend) ? (
          <Typography>
            Envoyé{" "}
            {`${moment(item.DateSend).fromNow()},  ${moment(
              item.DateSend
            ).format("LLL")}`}
          </Typography>
        ) : null}
      </Box>

      <Divider />
      {handleIndex(item)}
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryStep;
