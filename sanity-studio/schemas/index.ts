import { course }    from './course';
import { webinar }   from './webinar';
import { resource }  from './resource';
import { videoBlock, fileBlock, quizBlock } from './blocks';

export const schemaTypes = [
  // Documents
  course,
  webinar,
  resource,
  // Block objects (used inside course.blocks)
  videoBlock,
  fileBlock,
  quizBlock,
];
