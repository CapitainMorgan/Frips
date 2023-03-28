import { Box } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import StepTextError from "../Items/formUpload/errorText";
import TextFieldLogin from "./TextFieldLogin";

const SecondStep = ({ control, errors }) => {
  return (
    <React.Fragment>
      <Box>
        Ces informations serviront comment garants à des fins juridiques et ne
        serviront aucunement à des fins de profiling
      </Box>
      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Controller
            name="step2.firstName"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Prénom" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.firstName?.message} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
        <Controller
            name="step2.name"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Nom de famille" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.name?.message} />
          
        </Box>
      </Box>
      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
        <Controller
            name="step2.Jour"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Jour" }} />
              );
            }}
          />

          <Box>
            <StepTextError text={errors?.step2?.Jour?.message} />
          </Box>
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
        <Controller
            name="step2.Mois"
            control={control}
            
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Mois" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Mois?.message} />
        </Box>
        <Box display={"flex"} flexDirection="column" width={"50%"}>
        <Controller
            name="step2.Annee"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Année" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Annee?.message} />
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"75%"}>
        <Controller
            name="step2.Rue"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Rue" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Rue?.message} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"25%"}>
        <Controller
            name="step2.Numero"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Numéro" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Numero?.message} />
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
        <Controller
            name="step2.NPA"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "NPA" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.NPA?.message} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
        <Controller
            name="step2.Localite"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Localité" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Localite?.message} />
        </Box>
      </Box>
      
    </React.Fragment>
  );
};

export default SecondStep;
