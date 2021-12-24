import { Box, useRadio } from "@chakra-ui/react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="100%"
        boxShadow="md"
        _checked={{
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        onClick={props.onClick}
        value={props.value}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
