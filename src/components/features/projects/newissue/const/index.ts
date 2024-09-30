import images from '~/assets/img';
import { ButtonData } from '../types';

export const TEXT_NAME = {
  Strong: 'Strong',
  Italic: 'Italic',
  Underline: 'Underline',
  Delete: 'Delete',
  Quote: 'Quote',
  InlineCode: 'InlineCode',
  Pre: 'Pre',
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  ListDot: 'ListDot',
  ListNum: 'ListNum',
  RemoveQuote: 'removeQuote',
  Link: 'Link',
  Image: 'Image',
  Help: 'Help',
};

export const CUSTOM_FRONT = [
  TEXT_NAME.H1,
  TEXT_NAME.H2,
  TEXT_NAME.H3,
  TEXT_NAME.ListDot,
  TEXT_NAME.ListNum,
  TEXT_NAME.Quote,
  TEXT_NAME.RemoveQuote,
];
export const CUSTOM_TEXT = [
  TEXT_NAME.Strong,
  TEXT_NAME.Italic,
  TEXT_NAME.Underline,
  TEXT_NAME.Delete,
  TEXT_NAME.Pre,
  TEXT_NAME.InlineCode,
  TEXT_NAME.Image,
  TEXT_NAME.Link,
];

export const TEXT_VALUE = {
  Strong: '**', // **bold**
  Italic: '__', // __italic__
  Underline: '++', // ++underline++
  Delete: '--', // --deleted--
  Quote: '>', // ??quote??
  RemoveQuote: '',
  InlineCode: '@@', // @@inline code@@
  Pre: '<pre></pre>', // <pre>code block</pre>
  H1: 'h1.', // h1. Heading 1
  H2: 'h2.', // h2. Heading 2
  H3: 'h3.', // h3. Heading 3
  ListDot: '*', // * List itemOptions
  ListNum: '#', // # Numbered list
  Link: '[[]]', // [[link]]
  Image: '!!', // !image
};

export const BUTTON_DATA: ButtonData[] = [
  {
    id: 1,
    backgroundImage: images.newissue_strong,
    formatText: TEXT_NAME.Strong,
  },
  {
    id: 2,
    backgroundImage: images.newissue_italic,
    formatText: TEXT_NAME.Italic,
  },
  {
    id: 3,
    backgroundImage: images.newissue_underline,
    formatText: TEXT_NAME.Underline,
  },
  {
    id: 4,
    backgroundImage: images.newissue_delete,
    formatText: TEXT_NAME.Delete,
  },
  {
    id: 5,
    backgroundImage: images.newissue_inlinecode,
    formatText: TEXT_NAME.InlineCode,
  },
  {
    id: 6,
    backgroundImage: images.newissue_heading1,
    formatText: TEXT_NAME.H1,
  },
  {
    id: 7,
    backgroundImage: images.newissue_heading2,
    formatText: TEXT_NAME.H2,
  },
  {
    id: 8,
    backgroundImage: images.newissue_heading3,
    formatText: TEXT_NAME.H3,
  },
  { id: 9, backgroundImage: images.newissue_ul, formatText: TEXT_NAME.ListDot },
  {
    id: 10,
    backgroundImage: images.newissue_ol,
    formatText: TEXT_NAME.ListNum,
  },
  { id: 11, backgroundImage: images.newissue_bq, formatText: TEXT_NAME.Quote },
  {
    id: 12,
    backgroundImage: images.newissue_bq_remove,
    formatText: TEXT_NAME.RemoveQuote,
  },
  { id: 13, backgroundImage: images.newissue_pre, formatText: TEXT_NAME.Pre },
  { id: 14, backgroundImage: images.newissue_link, formatText: TEXT_NAME.Link },
  { id: 15, backgroundImage: images.newissue_img, formatText: TEXT_NAME.Image },
  { id: 16, backgroundImage: images.newissue_help, formatText: '' },
];
