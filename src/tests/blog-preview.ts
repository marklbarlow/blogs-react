import { BlogPreview } from 'model';

export const previews: BlogPreview[] = [
  {
    id: 1,
    text: 'This is some preview text',
    timestamp: new Date().toISOString(),
    title: 'Proin ac congue lorem, rhoncus',
    userId: 1,
    username: 'John Smith',
  },
  {
    id: 2,
    text: 'This is some preview text',
    timestamp: new Date().toISOString(),
    title: 'Donec euismod est vitae nisi',
    userId: 1,
    username: 'John Smith',
  },
  {
    id: 3,
    text: 'This is some preview text',
    timestamp: new Date().toISOString(),
    title: 'Maecenas quam urna, auctor eu',
    userId: 1,
    username: 'John Smith',
  },
];
