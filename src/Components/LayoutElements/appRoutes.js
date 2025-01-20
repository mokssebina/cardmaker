import { PlusCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline'


export const navRoutes = [
    {
        id: '1',
        path: '/cards',
        title: 'Cards',
        icon: <BookOpenIcon />
    },
    {
        id: '2',
        path: '/new-card',
        title: 'New Card',
        icon: <PlusCircleIcon />
    }
]