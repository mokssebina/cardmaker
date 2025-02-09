import { PencilSquareIcon, BookOpenIcon, QueueListIcon } from '@heroicons/react/24/outline'


export const navRoutes = [
    {
        id: '1',
        path: '/cards',
        title: 'Cards',
        icon: <BookOpenIcon />
    },
    {
        id: '2',
        path: '/edit-card',
        title: 'Edit Card',
        icon: <PencilSquareIcon />
    },
    {
        id: '3',
        path: '/purchases',
        title: 'Purchases',
        icon: <PencilSquareIcon />
    }
]