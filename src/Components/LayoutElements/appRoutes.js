import { PencilSquareIcon, BookOpenIcon, QueueListIcon } from '@heroicons/react/24/outline'


export const navRoutes = [
    {
        id: '1',
        path: '/pages',
        title: 'Pages',
        icon: <BookOpenIcon />
    },
    {
        id: '2',
        path: '/edit-page',
        title: 'Edit Page',
        icon: <PencilSquareIcon />
    },
    {
        id: '3',
        path: '/purchases',
        title: 'Purchases',
        icon: <PencilSquareIcon />
    }
]