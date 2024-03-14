import {
  Badge,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useEffect, memo, useCallback, useMemo } from "react";
import { GoStop } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { debounce } from "lodash";

const ControlledInput = memo(function ControlledInput({
  id,
  valueRef,
  setValue,
  label,
  type = "text",
  placeholder,
  minLength,
  maxLength,
  component: Component = Input,
  helperText,
  error,
  setError,
  successHighlight = false,
}) {
  //props options:
  // 1. value
  // 2. setValue (onChange)
  // 3. !label
  // 4. type  (text, password, email, number)
  // 5. placeholder
  // 6. minLength
  // 7. maxLength
  // 8. component to use: input/textarea
  // 9. error state to show when input is invalid after form check

  const [localValue, setLocalValue] = React.useState(valueRef.current);
  const color = useMemo(() => {
    if (
      successHighlight &&
      localValue.length >= minLength &&
      localValue.length <= maxLength
    ) {
      return "success";
    } else {
      return "neutral";
    }
  }, [localValue, minLength, maxLength, successHighlight]);
  const isError = error && error.id === id;

  useEffect(() => {
    if (error && setError && error.id === id) {
      setError({ id: null, message: null });
    }
  }, [localValue]);

  function setLocalValueFunc(e) {
    setLocalValue(e);
  }

  function setValueFunc() {
    // setValue(localValue);
    valueRef.current = localValue;
  }

  const debouncedSetPropValue = useCallback(setValueFunc, [localValue]);

  useEffect(() => {
    debouncedSetPropValue(localValue);
  }, [localValue, debouncedSetPropValue]);

  const MemoizedFormLabel = React.memo(FormLabel);
  const MemoizedBox = React.memo(Box);
  const MemoizedFormHelperText = React.memo(FormHelperText);
  return (
    <FormControl>
      {label ? <MemoizedFormLabel>{label}</MemoizedFormLabel> : <></>}
      <Sheet
        variant="outlined"
        color={isError ? "danger" : color}
        sx={{ borderRadius: "sm", position: "relative", width: "100%" }}
      >
        <Component
          id={id}
          value={localValue}
          onChange={(e) => setLocalValueFunc(e.target.value)}
          color={isError ? "danger" : color}
          endDecorator={
            isError ? (
              <Typography color="danger">
                <GoStop />
              </Typography>
            ) : null
          }
          required={minLength > 0 ? true : false}
          placeholder={placeholder}
          type={type}
          sx={{
            pt: minLength || maxLength ? 0.5 : "",
            pb: minLength || maxLength ? "25px" : "",
            border: 0,
            backgroundColor: "transparent",
            zIndex: 2,
          }}
        />
        {minLength || maxLength ? (
          <MemoizedBox
            sx={{
              position: "absolute",
              opacity: 0.4,
              width: "100%",
              bottom: "2px",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              px: 1.5,
            }}
          >
            <Typography level="body-sm">Min. {minLength} chars</Typography>
            <Typography level="body-sm">
              {localValue.length + "/" + maxLength} chars
            </Typography>
          </MemoizedBox>
        ) : null}
      </Sheet>
      {helperText && (
        <MemoizedFormHelperText>{helperText}</MemoizedFormHelperText>
      )}
    </FormControl>
  );
});

export default ControlledInput;
