import parse from "html-react-parser";

import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";

export const htmlParse = (json) => {
  parse(
    generateHTML(json, [Bold, Paragraph, Italic, Text, Document])
  );
};
