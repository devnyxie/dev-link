import {
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Textarea,
  IconButton,
  FormHelperText,
} from "@mui/joy";
import React, { useState } from "react";
import { GrFormViewHide, GrFormView } from "react-icons/gr";
import JoyTooltip from "./JoyTooltip";
import markdownToHtml from "./MarkdownToHTML";

function MarkdownInput({ value, setValue, label, helperText }) {
  const [hideMarkdown, setHideMarkdown] = useState(false);
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Tabs
          variant="outlined"
          sx={{ borderRadius: "sm", overflow: "hidden" }}
        >
          <TabList
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 0,
            }}
          >
            <div style={{ display: "flex" }}>
              <Tab
                disableIndicator
                variant="plain"
                color="neutral"
                disabled={hideMarkdown}
              >
                Markdown
              </Tab>
              <Tab
                disableIndicator
                variant="plain"
                color="neutral"
                disabled={hideMarkdown}
              >
                Preview
              </Tab>
            </div>
          </TabList>

          <TabPanel
            sx={{ p: 0, display: hideMarkdown ? "none" : "block" }}
            value={0}
          >
            <FormControl>
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="<!-- Embrace your creativity! -->"
                sx={{ borderRadius: "0", border: 0, minHeight: "150px" }}
              />
            </FormControl>
          </TabPanel>
          <TabPanel
            value={1}
            sx={{ p: 0, display: hideMarkdown ? "none" : "block" }}
          >
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(value),
              }}
              style={{ minHeight: "150px", padding: "10px" }}
            ></div>
          </TabPanel>
        </Tabs>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
}

export default MarkdownInput;
