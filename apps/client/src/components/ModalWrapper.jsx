import {
  Box,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function ModalWrapper({ open, setOpen, onClose, children }) {
  const [layout, setLayout] = React.useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1400px)",
  });

  useEffect(() => {
    if (isMobile) setLayout("fullscreen");
    if (isTablet) setLayout(null);
  }, [isMobile, isTablet]);
  return (
    <>
      <Modal
        className="fade-in"
        open={open}
        onClose={() => {
          setOpen(false);
          onClose && onClose();
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          p: 1,
          zIndex: 2,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxHeight: layout ? "100%" : 600,
            minHeight: layout ? "100%" : 400,
            height: isMobile ? "100%" : "100%",
            width: layout ? "100%" : 600,
            position: "relative",
            borderRadius: "md",
            overflow: "hidden",
            outline: "none",
          }}
        >
          {" "}
          <ModalDialog
            layout={layout}
            className="fade-in"
            sx={{
              width: "100%",
              height: "100%",
              border: 0,
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              {isMobile ? (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography level="title-md">Search</Typography>
                  <IconButton sx={{ p: 0 }}>
                    <ModalClose
                      variant="plain"
                      sx={{
                        position: "relative",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    />
                  </IconButton>
                </Box>
              ) : null}
              <div
                style={{
                  flexGrow: 1,
                  height: "100%",
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                {children}
              </div>
            </Box>
          </ModalDialog>
        </Sheet>
      </Modal>
    </>
  );
}

export default ModalWrapper;
